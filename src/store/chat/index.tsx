import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Middleware,
} from '@reduxjs/toolkit';
import {debounce} from 'lodash';
import axios from 'axios';
import {AppDispatch, AppThunk, RootState} from 'store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseMessage, setWebSocket, getWebSocket} from 'utils';
import {ApiPath} from '../../config/apiPath';

// Type definitions
interface Message {
  type:
    | 'question'
    | 'answer'
    | 'event'
    | 'task'
    | 'action'
    | 'admin'
    | 'system';
  text: string;
  id?: number;
  goalOptions?: string[];
  weekNumber?: number;
  sessionType?: string;
  senderName?: string;
  taskId?: string;
  suggestion?: any;
  workout?: any;
  isServiceChange?: boolean;
}

interface SystemMessage {
  id: string;
  message: string;
  timestamp: string;
  senderName: string;
}

interface Task {
  id: string;
  chatId: string;
  text: string;
  sessionType?: string;
  taskId?: string;
}

interface TaskResult {}

interface ChatState {
  chatMessages: Message[];
  isWebSocketReady: boolean;
  isWebSocketConnected: boolean;
  pendingResponse: boolean;
  currentQuestion: string | null;
  answer: string;
  taskResults: TaskResult[];
  chatCoachName: string; // renamed
  selectedJobId: string;
  tempGoalOptions: string[];
  selectedSuggestions: string[];
  pendingQuestionQueue: any[];
  tasks: Task[];
  systemMessages: SystemMessage[];
  userInput: string;
  tempCoachName: string | null;
  currentSuggestionBubbleHeight: number;
  chatType: 'general' | 'individual' | 'sequential';
  chatServiceName: string; // renamed
  suggestions: Record<string, any>;
}

const initialState: ChatState = {
  chatMessages: [],
  isWebSocketReady: false,
  isWebSocketConnected: false,
  pendingResponse: false,
  currentQuestion: null,
  answer: '',
  taskResults: [],
  chatCoachName: '', // renamed
  selectedJobId: '',
  tempGoalOptions: [],
  selectedSuggestions: [],
  pendingQuestionQueue: [],
  tasks: [],
  systemMessages: [],
  userInput: '',
  tempCoachName: null,
  currentSuggestionBubbleHeight: 0,
  chatType: 'general',
  chatServiceName: '', // renamed
  suggestions: {},
};

interface SendChatMessageOptions {
  display: boolean;
  isServiceChange?: boolean;
  type?: string;
  sendToBackend?: boolean;
}

interface SendChatMessagePayload {
  msg: string;
  options?: SendChatMessageOptions;
}

export const initChatWebSocket = createAsyncThunk<
  boolean,
  {
    jobId: string;
    chatType: 'general' | 'individual' | 'sequential';
    chatServiceName: string;
    chatCoachName?: string | null;
    onOpen?: () => void;
    isNewChat?: boolean;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'chat/initChatWebSocket',
  async (
    {
      jobId,
      chatType,
      chatCoachName,
      onOpen,
      isNewChat = false,
      chatServiceName,
    },
    {dispatch, getState},
  ) => {
    await dispatch(closeWebSocket());

    const tempCoachName = await AsyncStorage.getItem('tempCoachName');
    const effectiveCoachName = tempCoachName || chatCoachName || '';

    const encodedJobId = encodeURIComponent(jobId);
    const encodedCoachName = encodeURIComponent(effectiveCoachName);
    const encodedChatType = encodeURIComponent(chatType);
    const encodedIsNewChat = encodeURIComponent(isNewChat.toString());
    const encodedServiceName = encodeURIComponent(chatServiceName);
    console.log('Service name:', chatServiceName);
    const wsUrl = `${ApiPath}${encodedJobId}?coachName=${encodedCoachName}&chatType=${encodedChatType}&isNewChat=${encodedIsNewChat}&serviceName=${encodedServiceName}`;
    console.log('Connecting to websocket:', wsUrl);

    return new Promise<boolean>((resolve, reject) => {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Websocket connected', jobId);
        setWebSocket(ws);
        dispatch(setChatType(chatType));
        dispatch(setJobId(jobId));
        dispatch(setChatCoachName(effectiveCoachName));
        dispatch(setChatServiceName(chatServiceName));
        dispatch(setIsWebSocketConnected(true));
        if (onOpen) onOpen();
        resolve(true);
      };

      ws.onmessage = event => {
        console.log('WebSocket message received:', event.data);
        const data = JSON.parse(event.data);
        console.log('Parsed WebSocket message:', data);
        if (data.action === 'regeneratedTask') {
          dispatch(handleRegeneratedTask(data.task));
        } else {
          dispatch(
            addToChatMessage({
              msg: event.data,
              msg_from: 'gpt',
              display: true,
            }),
          );
        }
        dispatch(setPendingResponse(false));
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        setWebSocket(null);
        dispatch(setIsWebSocketConnected(false));
        dispatch(setTempCoachName(null));
        dispatch(removeSystemMessage());
        resolve(false);
      };

      ws.onerror = error => {
        console.error('WebSocket error:', error);
        setWebSocket(null);
        dispatch(setIsWebSocketConnected(false));
        reject(false);
      };
    });
  },
);

export const sendChatMessageAsync = createAsyncThunk<
  void,
  SendChatMessagePayload,
  {dispatch: AppDispatch; state: RootState}
>(
  'chat/sendChatMessageAsync',
  async (
    {msg, options = {display: true, sendToBackend: true}},
    {dispatch, getState},
  ) => {
    const messageType = options.isServiceChange ? 'admin' : 'user';
    dispatch(
      addToChatMessage({
        msg,
        msg_from: messageType,
        display: options.display,
      }),
    );

    const ws = getWebSocket();
    if (
      options.sendToBackend !== false &&
      ws &&
      ws.readyState === WebSocket.OPEN
    ) {
      ws.send(msg);
      dispatch(setPendingResponse(true));
    } else {
      console.log('Message not sent to backend');
    }
  },
);

export const saveMessages = createAsyncThunk(
  'chat/saveMessages',
  async (_, {getState}) => {
    const state = getState() as {chat: ChatState};
    const {chatMessages, selectedJobId} = state.chat;
    try {
      if (chatMessages.length > 0) {
        const filteredMessages = chatMessages.filter(
          (msg: Message) =>
            msg.type !== 'system' || msg.senderName !== 'System',
        );
        await fetch(`/api/messages/${selectedJobId}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({messageList: filteredMessages}),
        });
      }
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },
);

export const loadMessagesForJob = createAsyncThunk(
  'chat/loadMessagesForJob',
  async (jobId: string) => {
    console.log('Loading messages for job:', jobId);
    const response = await fetch(`/api/messages/${jobId}`);
    console.log('Response:', response);
    const data = await response.json();
    let messageList = data.messageList || [];

    const storedInitialMessage = await AsyncStorage.getItem('initialMessage');
    console.log('Stored initial message:', storedInitialMessage);

    if (storedInitialMessage) {
      messageList = [
        {type: 'answer', text: storedInitialMessage},
        ...messageList,
      ];
      await AsyncStorage.removeItem('initialMessage');

      await fetch(`/api/messages/${jobId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messageList}),
      });
    }

    return messageList;
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatMessages: state => {
      state.chatMessages = [];
    },
    setIsWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketConnected = action.payload;
    },

    addToChatMessage: (
      state,
      action: PayloadAction<{
        msg: string;
        msg_from: 'user' | 'gpt' | 'admin' | 'system';
        display: boolean;
      }>,
    ) => {
      const {msg, msg_from, display} = action.payload;
      let parsedMessage: {message: Message; suggestion?: any};

      if (msg_from === 'admin') {
        parsedMessage = {
          message: {type: 'admin', text: msg, isServiceChange: true},
        };
      } else {
        parsedMessage = parseMessage(msg, msg_from);
      }

      if (parsedMessage.message.type === 'system') {
        const systemMessage: SystemMessage = {
          id: parsedMessage.message.taskId || String(Date.now()),
          message: parsedMessage.message.text,
          timestamp: new Date().toISOString(),
          senderName: 'System',
        };
        state.systemMessages.push(systemMessage);
      } else if (display) {
        const newMessage = {id: Date.now(), ...parsedMessage.message};
        state.chatMessages.unshift(newMessage);

        if (parsedMessage.suggestion) {
          state.suggestions[newMessage.id] = parsedMessage.suggestion;
        }
      }
    },
    addSystemMessage: (state, action: PayloadAction<SystemMessage>) => {
      const message = action.payload;
      const exists = state.systemMessages.some(msg => msg.id === message.id);
      if (!exists) {
        state.systemMessages.push(message);
      }
    },
    removeSystemMessage: state => {
      state.chatMessages = state.chatMessages.filter(
        msg => msg.type !== 'system' || msg.senderName !== 'System',
      );
      state.systemMessages = [];
    },
    removeLastSystemMessage: state => {
      const reversedMessages = [...state.chatMessages].reverse();
      const systemMessageIndex = reversedMessages.findIndex(
        msg => msg.type === 'system' && msg.senderName === 'System',
      );
      if (systemMessageIndex !== -1) {
        reversedMessages.splice(systemMessageIndex, 1);
        state.chatMessages = reversedMessages.reverse();
      }
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.chatMessages = state.chatMessages.filter(
        msg => msg.id !== action.payload,
      );
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload;
    },
    setMessageList: (state, action: PayloadAction<Message[]>) => {
      state.chatMessages = action.payload;
    },
    setJobId: (state, action: PayloadAction<string>) => {
      state.selectedJobId = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<string>) => {
      state.currentQuestion = action.payload;
    },
    setPendingQuestionQueue: (state, action: PayloadAction<any[]>) => {
      state.pendingQuestionQueue = action.payload;
    },
    addGoalOption: (state, action: PayloadAction<string>) => {
      if (!state.selectedSuggestions.includes(action.payload)) {
        state.selectedSuggestions.push(action.payload);
      }
    },
    removeGoalOption: (state, action: PayloadAction<string>) => {
      state.selectedSuggestions = state.selectedSuggestions.filter(
        o => o !== action.payload,
      );
    },
    clearSelectedSuggestions: state => {
      state.selectedSuggestions = [];
    },
    clearTempGoalOptions: state => {
      state.tempGoalOptions = [];
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    setTempCoachName: (state, action: PayloadAction<string | null>) => {
      state.tempCoachName = action.payload;
      if (action.payload) {
        AsyncStorage.setItem('tempCoachName', action.payload);
      } else {
        AsyncStorage.removeItem('tempCoachName');
      }
    },
    setCurrentSuggestionBubbleHeight: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.currentSuggestionBubbleHeight = action.payload;
    },
    setPendingResponse: (state, action: PayloadAction<boolean>) => {
      state.pendingResponse = action.payload;
    },
    setWebSocketReady: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketReady = action.payload;
    },
    setChatMessages: (state, action: PayloadAction<Message[]>) => {
      state.chatMessages = action.payload;
    },
    setChatServiceName: (state, action: PayloadAction<string>) => {
      state.chatServiceName = action.payload;
    },
    setChatType: (
      state,
      action: PayloadAction<'general' | 'individual' | 'sequential'>,
    ) => {
      state.chatType = action.payload;
    },
    setChatCoachName: (state, action: PayloadAction<string>) => {
      state.chatCoachName = action.payload;
    },
    handleRegeneratedTask: (state, action: PayloadAction<Task>) => {
      const regeneratedTask = action.payload;
      state.chatMessages = state.chatMessages.map(msg =>
        msg.taskId === regeneratedTask.id
          ? {
              ...msg,
              text: regeneratedTask.text,
              sessionType: regeneratedTask.sessionType,
            }
          : msg,
      );
      state.tasks = state.tasks.map(task =>
        task.id === regeneratedTask.id ? regeneratedTask : task,
      );
      console.log('Task regenerated:', regeneratedTask);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initChatWebSocket.fulfilled, (state, action) => {
        // Update this line:
        console.log('Reducer: Updating chatMessages with:', action.payload);
        state.isWebSocketConnected = action.payload;
      })
      .addCase(sendChatMessageAsync.fulfilled, state => {
        // Handle any state changes after sending a message
      })
      .addCase(saveMessages.fulfilled, state => {
        // Handle any state changes after saving messages
      })
      .addCase(loadMessagesForJob.fulfilled, (state, action) => {
        state.chatMessages = action.payload;
      });
  },
});

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
  setUserInput,
  setTempCoachName,
  setCurrentSuggestionBubbleHeight,
  setPendingResponse,
  setChatType,
  setChatCoachName,
  handleRegeneratedTask,
  setWebSocketReady,
  setIsWebSocketConnected,
  setChatMessages,
  setChatServiceName,
} = chatSlice.actions;

// Thunks
export const submitAnswer =
  (answer: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState().chat;
    const newMessageList: Message[] = [
      {type: 'answer', text: answer},
      ...state.chatMessages,
    ];
    dispatch(setMessageList(newMessageList));
    dispatch(setAnswer(''));
    dispatch(clearSelectedSuggestions());
    dispatch(clearTempGoalOptions());
    await dispatch(saveMessages());
  };
export const handleSendMessage = (): AppThunk => async (dispatch, getState) => {
  const {userInput} = getState().chat;
  if (userInput.trim()) {
    await dispatch(sendChatMessageAsync({msg: userInput}) as any);
    dispatch(setUserInput(''));
  }
};

export const closeWebSocket = (): AppThunk => dispatch => {
  const ws = getWebSocket();
  if (ws) {
    ws.close();
  }
  setWebSocket(null);
  dispatch(setIsWebSocketConnected(false));
};

export const sendRegenerationRequest =
  (taskId: string, chatId: string, isIndividualCoach: boolean): AppThunk =>
  dispatch => {
    console.log(
      `Sending regeneration request. taskId: ${taskId}, chatId: ${chatId}, isIndividualCoach: ${isIndividualCoach}`,
    );
    const ws = getWebSocket();
    if (ws && ws.readyState === WebSocket.OPEN) {
      const regenerateMessage = JSON.stringify({
        action: 'regenerate',
        taskId,
        chatId,
        isIndividualCoach,
      });
      console.log(`Sending WebSocket message: ${regenerateMessage}`);
      ws.send(regenerateMessage);
      dispatch(setPendingResponse(true));
    } else {
      console.error('WebSocket is not connected');
    }
  };

// Selector functions
export const selectLastMessage = (state: RootState): Message | undefined => {
  const {chatMessages} = state.chat;
  return chatMessages.length > 0 ? chatMessages[0] : undefined;
};
export const selectChatMessages = (state: {chat: ChatState}): Message[] =>
  state.chat.chatMessages;
export const selectCurrentQuestion = (state: {
  chat: ChatState;
}): string | null => state.chat.currentQuestion;
export const selectAnswer = (state: {chat: ChatState}): string =>
  state.chat.answer;
export const selectCoachName = (state: {chat: ChatState}): string =>
  state.chat.chatCoachName;
export const selectSelectedJobId = (state: {chat: ChatState}): string =>
  state.chat.selectedJobId;
export const selectUserInput = (state: {chat: ChatState}): string =>
  state.chat.userInput;
export const selectChatType = (state: {
  chat: ChatState;
}): 'general' | 'individual' | 'sequential' => state.chat.chatType;

// Default export
export default chatSlice.reducer;
