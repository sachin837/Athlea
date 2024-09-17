import { AppDispatch, AppThunk, RootState, UserState, fetchTrainingPlans } from 'store'
import {
  ChatContent,
  ChatState,
  Message,
  ParsedMessage,
  SendChatMessagePayload,
  SystemMessage,
  SystemMessageType,
  Task,
  UpdateTrainingPlanPayload,
  UpdateTrainingPlanResponse,
  JobState,
} from 'types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { ApiPath } from '../../config/apiPath'
import { getWebSocket, parseMessage, setWebSocket, updatedPlanName } from 'utils'

const initialState: ChatState = {
  chatMessages: [],
  chatContent: [],
  isWebSocketReady: false,
  isWebSocketConnected: false,
  pendingResponse: false,
  currentQuestion: null,
  answer: '',
  taskResults: [],
  coachName: '',
  selectedJobId: '',
  tempGoalOptions: [],
  selectedSuggestions: [],
  pendingQuestionQueue: [],
  tasks: [],
  systemMessages: [],
  userInput: '',
  tempCoachName: null,
  currentSuggestionBubbleHeight: 0,
  serviceName: '',
  suggestions: {},
  planSuggestions: {},
  humeAccessToken: null,
  ai_voice_messages: [],
  logArray: [],
  uploading: false,
  coaches: [],
  lastActiveCoach: null,
  lastUserMessage: null,
  hasErrorMessage: false,
  lastPlanNameUpdateTime: 0,
}

export const updateTrainingPlan = createAsyncThunk<
  UpdateTrainingPlanResponse,
  UpdateTrainingPlanPayload,
  { state: RootState }
>(
  'chat/updateTrainingPlan',
  async ({ jobId, data }, { getState, rejectWithValue }) => {
    try {
      const currentState = getState().job // Note: We're using the job state here, not chat
      const updatedData = {
        ...data,
        coaches: data.coaches || currentState.coaches,
        lastActiveCoach: data.lastActiveCoach || currentState.lastActiveCoach,
      }

      console.log('Sending update to backend:', updatedData)
      const response = await axios.put<UpdateTrainingPlanResponse>(
        `/api/trainingPlans/${encodeURIComponent(jobId)}`,
        updatedData,
      )
      console.log('Received response from backend:', response.data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue('An unexpected error occurred')
    }
  },
)

export const initChatWebSocket = createAsyncThunk<
  boolean,
  {
    jobId: string;
    serviceName: string;
    coaches: string[];
    onOpen?: () => void;
    isNewChat?: boolean;
    suggestion: any | null;
      },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
      >(
      'chat/initChatWebSocket',
      async (
        { jobId, coaches, onOpen, isNewChat = false, serviceName, suggestion },
        { dispatch, getState },
      ) => {
        await dispatch(closeWebSocket())

        const state = getState()
        const userId = state.user.userData.user_id

        if (!userId) {
          throw new Error('User ID is not set in the state')
        }

        const encodedJobId = encodeURIComponent(jobId)
        const encodedCoaches = encodeURIComponent(JSON.stringify(coaches))
        const encodedIsNewChat = encodeURIComponent(isNewChat.toString())
        const encodedServiceName = encodeURIComponent(serviceName)
        const encodedUserId = encodeURIComponent(userId)

        const wsUrl = `${ApiPath}${encodedJobId}?coaches=${encodedCoaches}&isNewChat=${encodedIsNewChat}&serviceName=${encodedServiceName}&userId=${encodedUserId}`
        console.log('Connecting to websocket:', wsUrl)

        return new Promise<boolean>((resolve, reject) => {
          const ws = new WebSocket(wsUrl)

          ws.onopen = () => {
            console.log('Websocket connected', jobId)
            setWebSocket(ws)
            dispatch(setJobId(jobId))
            dispatch(setCoaches(coaches))
            dispatch(setLastActiveCoach(coaches[0])) // Set the first coach as the initial active coach
            dispatch(setServiceName(serviceName))
            dispatch(setIsWebSocketConnected(true))
            if (suggestion && Object.keys(suggestion).length > 0) {
              const newSuggestion = {
                ...suggestion,
                senderName: coaches[0], // Use the first coach for the initial suggestion
                serviceName,
              }
              dispatch(addSuggestions({ newSuggestion, jobId }))
            }
            if (onOpen) {onOpen()}
            resolve(true)
          }

          ws.onmessage = (event) => {
            console.log('WebSocket message received:', event.data)
            const data = JSON.parse(event.data)
            console.log('Parsed WebSocket message:', data)

            if (data.action === 'regeneratedTask') {
              dispatch(handleRegeneratedTask(data.task))
            } else {
              let payload = {}
              const currentState = getState().chat
              if (data?.content?.suggestion) {
                const activeCoach = data.senderName || currentState.lastActiveCoach
                dispatch(setLastActiveCoach(activeCoach))
                payload = {
                  coaches: currentState.coaches,
                  lastActiveCoach: activeCoach,
                  serviceName,
                  suggestion: { ...data?.content?.suggestion },
                  lastUpdated: new Date().toISOString(),
                }
              } else {
                payload = {
                  coaches: currentState.coaches,
                  lastActiveCoach: currentState.lastActiveCoach,
                  serviceName,
                  lastUpdated: new Date().toISOString(),
                }
              }

              console.log('Updating training plan with payload:', payload)
              dispatch(updateTrainingPlan({ jobId, data: payload }))

              dispatch(
                addToChatMessage({
                  msg: event.data,
                  msg_from: 'gpt',
                  display: true,
                }),
              )
            }

            setTimeout(() => {
              console.log('save msg to BE');
              (async () => {
                await dispatch(saveMessages())
              })()
            }, 200)

            // Ensure pendingResponse is only set to false for non-log messages
            if (data.type !== 'log') {
              dispatch(setPendingResponse(false))
            }
          }

          ws.onclose = () => {
            console.log('WebSocket closed')
            setWebSocket(null)
            dispatch(setIsWebSocketConnected(false))
            dispatch(setTempCoachName(null))
            dispatch(removeSystemMessage())
            resolve(false)
          }

          ws.onerror = (error) => {
            console.error('WebSocket error:', error)
            setWebSocket(null)
            dispatch(setIsWebSocketConnected(false))
            reject(false)
          }
        })
      },
      )
export const sendChatMessageAsync = createAsyncThunk<
  void,
  SendChatMessagePayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'chat/sendChatMessageAsync',
  async (
    { msg, options = { display: true, sendToBackend: true } },
    { dispatch, getState, rejectWithValue },
  ) => {
    const state = getState() as { chat: ChatState }
    const messageType = options.isServiceChange ? 'admin' : 'user'
    const message = msg ?? ''

    console.log('Sending message:', message)

    dispatch(
      addToChatMessage({
        msg: message,
        msg_from: messageType,
        display: options.display,
      }),
    )

    // Store the last user message
    if (messageType === 'user') {
      setLastUserMessage(message)
    }

    const ws = getWebSocket()
    if (
      options.sendToBackend !== false &&
      ws &&
      ws.readyState === WebSocket.OPEN
    ) {
      console.log('msg send to backend')
      ws.send(message)

      // Ensure pendingResponse is only set to true for user messages
      if (messageType === 'user') {
        dispatch(setPendingResponse(true))
      }
    } else {
      console.log('Message not sent to backend')
      return rejectWithValue('WebSocket is not connected')
    }
  },
)

export const sendFileMessage = createAsyncThunk<
  void,
  { message: string; fileName: string; fileType: string; fileId: string },
  { state: RootState }
>(
  'chat/sendFileMessage',
  async ({ message, fileName, fileType, fileId }, { dispatch, getState }) => {
    const ws = getWebSocket()
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Send file information
      const fileMessage = {
        type: 'file_upload',
        file: {
          name: fileName,
          type: fileType,
          id: fileId,
        },
      }
      ws.send(JSON.stringify(fileMessage))

      // Add file upload message to the chat
      dispatch(
        addToChatMessage({
          msg: `File uploaded: ${fileName}`,
          msg_from: 'user',
          display: true,
          type: 'file',
          file: {
            name: fileName,
            type: fileType,
            id: fileId,
          },
          timestamp: new Date().toISOString(),
        }),
      )

      // If there's an additional message, send it separately
      if (message.trim() && message !== `File uploaded: ${fileName}`) {
        const userMessage = {
          type: 'message',
          content: message,
        }
        ws.send(JSON.stringify(userMessage))

        // Add user message to the chat
        dispatch(
          addToChatMessage({
            msg: message,
            msg_from: 'user',
            display: true,
            type: 'message',
            timestamp: new Date().toISOString(),
          }),
        )
      }

      // Set pending response to true
      dispatch(setPendingResponse(true))
    } else {
      console.error('WebSocket is not connected')
    }
  },
)

export const updatePlanNameThunk = createAsyncThunk(
  'chat/updatePlanName',
  async (
    { messages, jobId }: { messages: string; jobId: string },
    { dispatch, getState },
  ) => {
    try {
      const suggestion = await updatedPlanName(messages)
      console.log('Plan name suggestion', suggestion)
      if (suggestion) {
        const { data } = await axios.put(`/api/trainingPlans/${jobId}`, {
          planTitle: suggestion,
        })
        console.log('Training plan updated', data)
        const userId = (getState() as RootState).user.userData.user_id
        await dispatch(fetchTrainingPlans(userId))
        return suggestion
      } else {
        console.error('No valid suggestion received')
        return null
      }
    } catch (error) {
      console.error('Training plan title update error', error)
      throw error
    }
  },
)
export const saveMessages = createAsyncThunk(
  'chat/saveMessages',
  async (_, { getState }) => {
    const state = getState() as { chat: ChatState }
    const { chatMessages, selectedJobId, systemMessages } = state.chat
    const jobstate = getState() as { job: JobState }
    const { initialMessage } = jobstate.job
    try {
      console.log('posting msg', chatMessages.length, systemMessages.length)
      if (chatMessages.length > 0) {
        const filteredMessages = chatMessages.filter(
          (msg: Message) =>
            msg.type !== 'system' || msg.senderName !== 'System',
        )
        await fetch(`/api/messages/${selectedJobId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messageList: [...filteredMessages, ...systemMessages],
            initialMessage: initialMessage ? initialMessage : undefined,
          }),
        })
      }
    } catch (error) {
      console.error('Error saving messages:', error)
    }
  },
)

// Modify the saveContent thunk
export const saveContent = createAsyncThunk(
  'chat/saveContent',
  async (_, { getState }) => {
    const state = getState() as { chat: ChatState; user: UserState }
    const { chatContent, selectedJobId } = state.chat
    const { userData } = state.user
    try {
      if (chatContent.length > 0) {
        const response = await fetch(`/api/content/${selectedJobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentList: chatContent,
            user_id: userData.user_id,
          }),
        })
        const data = await response.json()
        console.log('save content data', data)
        if (data && data.isNewNotification) {
          Toast.show({type:'success',props: {message:'Suggestion has been successfully saved'}})
        } else {
          Toast.show({type:'error',props: {message:'Suggestion has been updated'}})
        }
      }
    } catch (error) {
      console.error('Error saving content:', error)
    }
  },
)

export const loadMessagesForJob = createAsyncThunk(
  'chat/loadMessagesForJob',
  async (jobId: string, { getState }) => {
    const decodedJobId = decodeURIComponent(jobId)
    console.log('Loading messages for job:', decodedJobId)

    const state = getState() as RootState
    const existingMessages = state.chat.chatMessages

    if (existingMessages.length > 0) {
      console.log('Messages already loaded, skipping fetch')
      return existingMessages
    }

    const response = await fetch(
      `/api/messages/${encodeURIComponent(decodedJobId)}`,
    )
    const data = await response.json()
    console.log('loadMessagesForJob', data.messageList)
    return data.messageList || []
  },
)

export const refreshContent = createAsyncThunk(
  'chat/refreshContent',
  async (contentId: string, { dispatch, getState }) => {
    console.log(`refreshContent called with contentId: ${contentId}`)
    const state = getState() as RootState
    const { chatMessages, chatContent, selectedJobId, coachName, serviceName } =
      state.chat
    console.log('Current state:', {
      selectedJobId,
      coachName,
      serviceName,
    })

    // Find the content object by ID
    const contentObject = chatContent.find(
      (content) => content?.id?.toString() === contentId,
    )
    if (!contentObject) {
      console.error(`Content object not found for contentId: ${contentId}`)
      return
    }
    console.log('Content object found:', contentObject)

    // Get the timestamp of the content object
    if (!contentObject.timestamp) {
      console.error('Content object timestamp is undefined')
      return
    }
    const contentTimestamp = new Date(contentObject.timestamp)
    console.log(`Content timestamp: ${contentTimestamp}`)

    // Find the last user message (of type "answer") before the content timestamp
    const lastUserMessage = chatMessages
      .filter(
        (msg) =>
          msg.type === 'answer' &&
          msg.timestamp &&
          new Date(msg.timestamp) < contentTimestamp,
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime(),
      )[0]
    if (!lastUserMessage) {
      console.error('No user message found before the content')
      return
    }
    console.log('Last user message found:', lastUserMessage)

    // Check if WebSocket is connected
    let ws = getWebSocket()
    console.log('Initial WebSocket state:', ws ? ws.readyState : 'null')
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket is open. Preparing to send refresh message...')
      // Prepare the message to send
      const messageToSend = JSON.stringify({
        action:
          'refresh with new response and make sure its in the same format as the data given please. ',
        data: contentObject.data,
        senderName: contentObject.senderName,
      })
      // Send the message through WebSocket
      ws.send(messageToSend)
      console.log('Sent WebSocket message:', messageToSend)

      // Add the message to the chat
      dispatch(
        addToChatMessage({
          msg: lastUserMessage.text,
          msg_from: 'user',
          display: true,
          timestamp: new Date().toISOString(),
        }),
      )
      console.log('Message added to chat:', {
        text: lastUserMessage.text,
        timestamp: new Date().toISOString(),
      })

      // Set pending response to true to show loading state
      dispatch(setPendingResponse(true))
      console.log('Set pending response to true')
    } else {
      console.error('WebSocket is not connected after initialization attempt')
    }
  },
)
// Modify the loadContentForJob thunk
export const loadContentForJob = createAsyncThunk(
  'chat/loadContentForJob',
  async (jobId: string, { getState }) => {
    const decodedJobId = decodeURIComponent(jobId)
    console.log('Loading content for job:', decodedJobId)

    const state = getState() as RootState
    const existingContent = state.chat.chatContent

    if (existingContent.length > 0) {
      console.log('Content already loaded, skipping fetch')
      return existingContent
    }

    const response = await fetch(
      `/api/content/${encodeURIComponent(decodedJobId)}`,
    )
    const data = await response.json()
    return data.contentList || []
  },
)

export const loadMessagesAndContent = createAsyncThunk(
  'chat/loadMessagesAndContent',
  async (jobId: string, { dispatch }) => {
    const messages = await dispatch(loadMessagesForJob(jobId)).unwrap()
    const content = await dispatch(loadContentForJob(jobId)).unwrap()
    dispatch(
      setMessages(messages.filter((item: Message) => item.type !== 'system')),
    )
    dispatch(
      setSystemMessages(
        messages.filter((item: SystemMessageType) => item.type === 'system'),
      ),
    )
    dispatch(setChatContent(content))
    return { messages, content }
  },
)
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatMessages: (state) => {
      state.chatMessages = []
    },
    setIsWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketConnected = action.payload
    },

    addToChatMessage: (
      state,
      action: PayloadAction<{
        msg: string;
        msg_from: 'user' | 'gpt' | 'admin' | 'system';
        display: boolean;
        timestamp?: string;
        type?: 'file' | 'message' | 'system';
        file?: { name: string; type: string; id: string };
      }>,
    ) => {
      const { msg, msg_from, display, timestamp, type, file } = action.payload
      console.log('addToChatMessage called with:', {
        msg,
        msg_from,
        display,
        timestamp,
        type,
        file,
      })

      let parsedMessage: ParsedMessage

      if (type === 'file' && file) {
        parsedMessage = {
          message: {
            type: 'file',
            text: msg,
            timestamp: timestamp || new Date().toISOString(),
            file: file,
            senderName: msg_from === 'user' ? 'user_admin' : msg_from,
          },
        }
      } else if (msg_from === 'admin') {
        parsedMessage = {
          message: {
            type: 'admin',
            text: msg,
            isServiceChange: true,
            timestamp: timestamp || new Date().toISOString(),
          },
        }
      } else if (msg_from === 'system') {
        // Handle system messages directly
        parsedMessage = {
          message: {
            type: 'system',
            text: msg,
            timestamp: timestamp || new Date().toISOString(),
            senderName: 'System',
          },
        }
      } else {
        parsedMessage = parseMessage(msg, msg_from)
      }
      console.log('Parsed message:', parsedMessage)

      // Handle log messages
      if (parsedMessage.message.type === 'log') {
        // Replace the last log message with the new one
        if (state.logArray.length > 0) {
          state.logArray[state.logArray.length - 1] = parsedMessage.message
        } else {
          // If logArray is empty, add the first log message
          state.logArray.push(parsedMessage.message)
        }
        console.log(
          'Replaced last log message with the latest log message:',
          parsedMessage.message,
        )
      }

      if (parsedMessage.message.type === 'system') {
        const systemMessage: SystemMessageType = {
          id: Date.now(),
          message: parsedMessage.message.text,
          timestamp:
            parsedMessage.message.timestamp || new Date().toISOString(),
          senderName: 'System',
          type: 'system',
        }
        state.systemMessages.push(systemMessage)
        console.log('Added system message:', systemMessage)
      }

      if (display && parsedMessage.message.type !== 'log') {
        const newMessage = { id: Date.now(), ...parsedMessage.message }
        state.chatMessages.unshift(newMessage)
        console.log('Added new message to chatMessages:', newMessage)

        if (parsedMessage.message.type === 'task' && parsedMessage.task) {
          const newTask: ChatContent = {
            type: 'task',
            data: {
              ...parsedMessage.task.data,
              serviceName: parsedMessage.message.serviceName,
              taskId: parsedMessage.message.taskId, // Ensure taskId is included in the data
            },
            id: parsedMessage.message.taskId, // Use taskId as the top-level id
            timestamp: parsedMessage.task.timestamp,
          }
          state.chatContent.push(newTask)
          console.log('Added new task to chatContent:', newTask)
        }

        // Handle suggestions
        if (parsedMessage.suggestion) {
          const newSuggestion: ChatContent = {
            type: 'suggestion',
            data: {
              ...parsedMessage.suggestion,
              taskId: parsedMessage.message.taskId, // Include taskId in the data
            },
            id: parsedMessage.message.taskId, // Use taskId as the id
            timestamp: parsedMessage.message.timestamp,
          }
          state.chatContent.push(newSuggestion)
          console.log(
            'Added suggestion to chatContent:',
            parsedMessage.message.taskId,
            newSuggestion,
          )
        }
      }

      // Update pendingResponse based on message type and sender
      if (msg_from === 'gpt' && parsedMessage.message.type !== 'log') {
        state.pendingResponse = false
      } else if (msg_from === 'user') {
        state.pendingResponse = true
      }
    },

    addSuggestions: (state, action: PayloadAction<any>) => {
      state.planSuggestions[action.payload.jobId] =
        action.payload.newSuggestion
      console.log('planSuggestions', state.planSuggestions)
    },
    setHumeAccessToken: (state, action: PayloadAction<string | null>) => {
      state.humeAccessToken = action.payload
    },
    setAiVoiceMessages: (state, action: PayloadAction<any[]>) => {
      state.ai_voice_messages = action.payload
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload
    },

    addTaskToContent: (state, action: PayloadAction<any>) => {
      state.chatContent.push({ type: 'task', data: action.payload })
    },
    addSuggestionToContent: (state, action: PayloadAction<any>) => {
      state.chatContent.push({ type: 'suggestion', data: action.payload })
    },
    setChatContent: (state, action: PayloadAction<ChatContent[]>) => {
      state.chatContent = action.payload
    },

    addSystemMessage: (
      state,
      action: PayloadAction<Omit<SystemMessage, 'type'>>,
    ) => {
      const message = { ...action.payload, type: 'system' as const }
      const exists = state.systemMessages.some((msg) => msg.id === message.id)
      if (!exists) {
        state.systemMessages.push(message)
      }
    },
    removeSystemMessage: (state) => {
      state.chatMessages = state.chatMessages.filter(
        (msg) => msg.type !== 'system' || msg.senderName !== 'System',
      )
      state.systemMessages = []
    },
    removeLastSystemMessage: (state) => {
      const reversedMessages = [...state.chatMessages].reverse()
      const systemMessageIndex = reversedMessages.findIndex(
        (msg) => msg.type === 'system' && msg.senderName === 'System',
      )
      if (systemMessageIndex !== -1) {
        reversedMessages.splice(systemMessageIndex, 1)
        state.chatMessages = reversedMessages.reverse()
      }
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.chatMessages = state.chatMessages.filter(
        (msg) => msg.id !== action.payload,
      )
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload
    },
    setMessageList: (state, action: PayloadAction<Message[]>) => {
      state.chatMessages = action.payload
    },
    setJobId: (state, action: PayloadAction<string>) => {
      state.selectedJobId = action.payload
    },
    setCurrentQuestion: (state, action: PayloadAction<string>) => {
      state.currentQuestion = action.payload
    },
    setPendingQuestionQueue: (state, action: PayloadAction<any[]>) => {
      state.pendingQuestionQueue = action.payload
    },
    addGoalOption: (state, action: PayloadAction<string>) => {
      if (!state.selectedSuggestions.includes(action.payload)) {
        state.selectedSuggestions.push(action.payload)
      }
    },
    removeGoalOption: (state, action: PayloadAction<string>) => {
      state.selectedSuggestions = state.selectedSuggestions.filter(
        (o) => o !== action.payload,
      )
    },
    setLastUserMessage: (state, action: PayloadAction<string | null>) => {
      state.lastUserMessage = action.payload
    },
    clearChatContent: (state) => {
      state.chatContent = []
    },
    clearSelectedSuggestions: (state) => {
      state.selectedSuggestions = []
    },
    clearTempGoalOptions: (state) => {
      state.tempGoalOptions = []
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload
    },
    setTempCoachName: (state, action: PayloadAction<string | null>) => {
      state.tempCoachName = action.payload
      if (action.payload) {
        localStorage.setItem('tempCoachName', action.payload)
      } else {
        localStorage.removeItem('tempCoachName')
      }
    },
    setCurrentSuggestionBubbleHeight: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.currentSuggestionBubbleHeight = action.payload
    },
    setPendingResponse: (state, action: PayloadAction<boolean>) => {
      state.pendingResponse = action.payload
    },
    setIsWebSocketReady: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketReady = action.payload
    },
    clearLogArray: (state, action: PayloadAction) => {
      state.logArray = []
    },
    setHasErrorMessage: (state, action: PayloadAction<boolean>) => {
      state.hasErrorMessage = action.payload
    },

    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.chatMessages = action.payload
    },
    setSystemMessages: (state, action: PayloadAction<SystemMessageType[]>) => {
      console.log('systemmessage payload', action.payload)
      state.systemMessages = action.payload
    },
    setServiceName: (state, action: PayloadAction<string>) => {
      state.serviceName = action.payload
    },
    setCoaches: (state, action: PayloadAction<string[]>) => {
      state.coaches = Array.from(
        new Set([...state.coaches, ...action.payload]),
      )
    },
    setLastActiveCoach: (state, action: PayloadAction<string | null>) => {
      state.lastActiveCoach = action.payload
      if (action.payload && !state.coaches.includes(action.payload)) {
        state.coaches.push(action.payload)
      }
    },
    removeCoach: (state, action: PayloadAction<string>) => {
      state.coaches = state.coaches.filter((coach) => coach !== action.payload)
      if (state.lastActiveCoach === action.payload) {
        state.lastActiveCoach = state.coaches[0] || null
      }
    },

    setCoachName: (state, action: PayloadAction<string | null>) => {
      state.coachName = action.payload
      if (action.payload) {
        state.lastActiveCoach = action.payload
        if (!state.coaches.includes(action.payload)) {
          state.coaches.push(action.payload)
        }
      }
    },

    handleRegeneratedTask: (state, action: PayloadAction<Task>) => {
      const regeneratedTask = action.payload

      state.chatMessages = state.chatMessages.map((msg) =>
        msg.taskId === regeneratedTask.id
          ? {
            ...msg,
            text: regeneratedTask.text ?? '', // Ensure 'text' is never undefined, fallback to an empty string if necessary
            sessionType: regeneratedTask.session_type ?? 'default', // Use 'session_type' and provide a fallback
          }
          : msg,
      )

      state.tasks = state.tasks.map((task) =>
        task.id === regeneratedTask.id ? regeneratedTask : task,
      )
      console.log('Task regenerated:', regeneratedTask)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initChatWebSocket.fulfilled, (state, action) => {
        // Update this line:
        console.log('Reducer: Updating chatMessages with:', action.payload)
        state.isWebSocketConnected = action.payload
      })
      .addCase(sendChatMessageAsync.fulfilled, (state) => {
        // Handle any state changes after sending a message
      })
      .addCase(saveMessages.fulfilled, (state) => {
        // Handle any state changes after saving messages
      })
      .addCase(updateTrainingPlan.fulfilled, (state, action) => {
        const { message, updatedDocument } = action.payload

        if (updatedDocument && updatedDocument.jobId) {
          const {
            jobId,
            coaches,
            lastActiveCoach,
            serviceName,
            lastUpdated,
            suggestion,
          } = updatedDocument

          // Update coaches
          if (Array.isArray(coaches)) {
            state.coaches = coaches // Replace the entire array instead of merging
          }

          // Update lastActiveCoach
          if (lastActiveCoach !== undefined) {
            state.lastActiveCoach = lastActiveCoach
          }

          // Update other fields...
          if (suggestion) {
            state.planSuggestions[jobId] = suggestion
          }
          if (serviceName) {
            state.serviceName = serviceName
          }
          // if (lastUpdated) {
          //   state.lastUpdated = lastUpdated;
          // }

          console.log(`Training plan updated for jobId: ${jobId}`)
        } else {
          console.log('Training plan update message:', message)
        }
      })

      .addCase(updateTrainingPlan.rejected, (state, action) => {
        console.error('Failed to update training plan:', action.payload)
        // Handle the error state here if needed
      })
      .addCase(loadMessagesForJob.fulfilled, (state, action) => {
        loadMessagesForJob.fulfilled = action.payload
      })
      .addCase(updatePlanNameThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.lastPlanNameUpdateTime = Date.now()
        }
      })
      .addCase(updatePlanNameThunk.rejected, (state, action) => {
        console.error('Failed to update plan name:', action.error)
      })

      .addCase(sendChatMessageAsync.rejected, (state, action) => {
        const errorMessage: Message = {
          id: Date.now(),
          type: 'error',
          text:
            action.error.message ||
            'An error occurred while sending the message.',
          timestamp: new Date().toISOString(),
          lastUserMessage: state.lastUserMessage, // This is now correct
        }
        state.chatMessages.unshift(errorMessage)
        state.hasErrorMessage = true
      })
  },
})

export const {
  clearChatMessages,
  addToChatMessage,
  addSystemMessage,
  removeSystemMessage,
  removeLastSystemMessage,
  removeMessage,
  setAnswer,
  setMessageList,
  setJobId,
  setCurrentQuestion,
  setPendingQuestionQueue,
  addGoalOption,
  removeGoalOption,
  clearSelectedSuggestions,
  clearTempGoalOptions,
  setUploading,
  setUserInput,
  setTempCoachName,
  setCurrentSuggestionBubbleHeight,
  setPendingResponse,
  // setCoachName,
  handleRegeneratedTask,
  // setIsWebSocketReady,
  setIsWebSocketConnected,
  setMessages,
  // setServiceName,
  addSuggestions,
  addTaskToContent,
  addSuggestionToContent,
  setChatContent,
  setHumeAccessToken,
  setAiVoiceMessages,
  clearChatContent,
  clearLogArray,
  // setCoaches,
  // setLastActiveCoach,
  setLastUserMessage,
  setHasErrorMessage,
  setSystemMessages,
} = chatSlice.actions

// Thunks
export const submitAnswer =
  (answer: string): AppThunk =>
    async (dispatch, getState) => {
      const state = getState().chat
      const newMessageList: Message[] = [
        { type: 'answer', text: answer },
        ...state.chatMessages,
      ]
      dispatch(setMessageList(newMessageList))
      dispatch(setAnswer(''))
      dispatch(clearSelectedSuggestions())
      dispatch(clearTempGoalOptions())
      await dispatch(saveMessages())
    }
export const handleSendMessage = (): AppThunk => async (dispatch, getState) => {
  const { userInput } = getState().chat
  if (userInput.trim()) {
    await dispatch(sendChatMessageAsync({ msg: userInput }) as any)
    dispatch(setUserInput(''))
  }
}

export const closeWebSocket = (): AppThunk => (dispatch) => {
  const ws = getWebSocket()
  if (ws) {
    ws.close()
  }
  setWebSocket(null)
  dispatch(setIsWebSocketConnected(false))
}

export const sendRegenerationRequest =
  (taskId: string, chatId: string, isIndividualCoach: boolean): AppThunk =>
    (dispatch) => {
      console.log(
        `Sending regeneration request. taskId: ${taskId}, chatId: ${chatId}, isIndividualCoach: ${isIndividualCoach}`,
      )
      const ws = getWebSocket()
      if (ws && ws.readyState === WebSocket.OPEN) {
        const regenerateMessage = JSON.stringify({
          action: 'regenerate',
          taskId,
          chatId,
          isIndividualCoach,
        })
        console.log(`Sending WebSocket message: ${regenerateMessage}`)
        ws.send(regenerateMessage)
        dispatch(setPendingResponse(true))
      } else {
        console.error('WebSocket is not connected')
      }
    }

// Selector functions
export const selectLastMessage = (state: RootState): Message | undefined => {
  const { chatMessages } = state.chat
  return chatMessages.length > 0 ? chatMessages[0] : undefined
}
export const selectChatMessages = (state: { chat: ChatState }): Message[] =>
  state.chat.chatMessages
export const selectCurrentQuestion = (state: {
  chat: ChatState;
}): string | null => state.chat.currentQuestion
export const selectAnswer = (state: { chat: ChatState }): string =>
  state.chat.answer
export const selectCoachName = (state: { chat: ChatState }): string | null =>
  state.chat.coachName
export const selectSelectedJobId = (state: { chat: ChatState }): string =>
  state.chat.selectedJobId
export const selectUserInput = (state: { chat: ChatState }): string =>
  state.chat.userInput

// Default export
export default chatSlice.reducer
