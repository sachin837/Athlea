import { AppDispatch, RootState } from '../store'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { v4 as uuidv4 } from 'uuid'
import {
  addToChatMessage,
  clearChatContent,
  clearChatMessages,
  clearLogArray,
  closeWebSocket,
  initChatWebSocket,
  loadContentForJob,
  loadMessagesForJob,
  sendChatMessageAsync,
  setPendingResponse,
  setTempCoachName,
  setUserInput,
  updateTrainingPlan,
  setCoachName as setChatCoachName,
  setCoaches as setChatCoaches,
  setLastActiveCoach as setChatLastActiveCoach,
} from 'store'
import { useAnimationMessage } from '../../hooks/useAnimationToggle'
import { JobSelectPayload, JobState, TrainingPlan } from 'types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWebSocket } from 'utils'

// Define types

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => 2000,
})

const generateUniqueJobId = () => {
  const now = new Date()
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })
}

export const handleJobIdChange = createAsyncThunk<
  void,
  { jobId: string | null },
  { state: RootState; dispatch: AppDispatch }
>('job/handleJobIdChange', async ({ jobId }, { dispatch }) => {
  if (!jobId) {
    const newJobId = uuidv4()
    AsyncStorage.setItem('jobId', newJobId)
    dispatch(setSelectedJobId(newJobId))
  } else {
    dispatch(setSelectedJobId(jobId))
  }
})

export const handleCoachNameChange = createAsyncThunk<
  void,
  { coachName: string | null },
  { state: RootState; dispatch: AppDispatch }
>('job/handleCoachNameChange', async ({ coachName }, { dispatch }) => {
  if (coachName) {
    AsyncStorage.setItem('coachName', coachName)
    dispatch(setCoachName(coachName))
  } else {
    AsyncStorage.removeItem('coachName')
    dispatch(setCoachName(null))
  }
})

// Async thunks
export const fetchTrainingPlans = createAsyncThunk<
  TrainingPlan[],
  string,
  { rejectValue: any }
>('job/fetchTrainingPlans', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/trainingPlans?user_id=${userId}`)
    const validPlans = response.data.filter(
      (plan: TrainingPlan) => plan.jobId && plan.jobId !== 'null',
    )
    return validPlans
  } catch (error: any) {
    return rejectWithValue(error.response.data)
  }
})

export const handleJobSelect = createAsyncThunk<
  JobSelectPayload,
  {
    jobId: string;
    coachName?: string;
    coaches?: string[];
    isNewChat?: boolean;
    serviceName?: string;
    navigate: (path: string) => void;
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/handleJobSelect',
      async (
        { jobId, coachName, coaches, isNewChat = false, navigate, serviceName },
        { dispatch, getState },
      ) => {
        try {
          // Clear existing messages
          // Clear existing messages and coaches
          dispatch(clearChatMessages())
          dispatch(clearChatContent())
          dispatch(clearLogArray())
          dispatch(setCoaches([])) // Clear the coaches array

          const response = await axios.get(`/api/trainingPlans/${jobId}`)
          const selectedPlan = response.data

          if (!selectedPlan) {
            throw new Error(`No training plan found for jobId: ${jobId}`)
          }

          console.log('Selected plan:', selectedPlan)

          // Determine the updated coaches list
          let updatedCoaches: string[] = []
          if (coaches && coaches.length > 0) {
            // If coaches are provided, use them
            updatedCoaches = coaches
          } else if (selectedPlan.coaches && selectedPlan.coaches.length > 0) {
            // If no coaches provided, use the ones from the selected plan
            updatedCoaches = selectedPlan.coaches
          } else if (coachName) {
            // If no coaches in plan, but coachName is provided, use it
            updatedCoaches = [coachName]
          } else if (selectedPlan.coachName) {
            // If all else fails, use the coachName from the selected plan
            updatedCoaches = [selectedPlan.coachName]
          }

          // Determine the updated coachName (last active coach)
          const updatedCoachName =
        coachName ||
        selectedPlan.lastActiveCoach ||
        (updatedCoaches.length > 0 ? updatedCoaches[0] : null)

          // Determine the updated serviceName
          const updatedServiceName = serviceName || selectedPlan.serviceName || ''

          console.log('Updated coaches:', updatedCoaches)
          console.log('Updated coachName:', updatedCoachName)
          console.log('Updated serviceName:', updatedServiceName)

          await dispatch(
            initChatWebSocket({
              jobId,
              coaches: updatedCoaches,
              isNewChat,
              serviceName: updatedServiceName,
              suggestion: selectedPlan.suggestion,
            }),
          )

          // Load new messages
          await dispatch(loadMessagesForJob(jobId))
          await dispatch(loadContentForJob(jobId))

          // Update the URL
          navigate(`/trainingPlans/${jobId}`)

          // Update local state
          dispatch(setSelectedJobId(jobId))
          dispatch(setCoachName(updatedCoachName))
          dispatch(setCoaches(updatedCoaches))
          dispatch(setLastActiveCoach(updatedCoachName))
          dispatch(setServiceName(updatedServiceName))

          return {
            jobId,
            coachName: updatedCoachName,
            coaches: updatedCoaches,
            serviceName: updatedServiceName,
          }
        } catch (error) {
          console.error('Error in handleJobSelect:', error)
          throw error
        }
      },
      )

export const handleCreateTrainingPlanClick = createAsyncThunk<
  void,
  {
    coachName: string;
    user_id: string;
    navigate: (path: string) => void;
    serviceName: string;
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/handleCreateTrainingPlanClick',
      async (
        { coachName, user_id, navigate, serviceName },
        { dispatch, getState },
      ) => {
        const newJobId = generateUniqueJobId()

        try {
          const newTrainingPlan = {
            jobId: newJobId,
            user_id: user_id,
            dateAdded: new Date().toISOString(),
            coachName: coachName,
            coaches: [coachName], // Add this line
            serviceName,
            lastUpdated: new Date().toISOString(),
            planTitle: 'New Chat',
          }

          const response = await axios.post('/api/trainingPlans', newTrainingPlan)

          if (response.status === 201) {
            dispatch(setSelectedJobId(newJobId))
            dispatch(setCoachName(coachName))
            dispatch(setCoaches([coachName])) // Add this line
            dispatch(setLastActiveCoach(coachName)) // Add this line
            dispatch(setServiceName(serviceName))

            await dispatch(fetchTrainingPlans(user_id))

            dispatch(clearChatMessages())
            dispatch(clearChatContent())
            dispatch(clearLogArray())

            await dispatch(
              initChatWebSocket({
                jobId: newJobId,
                coaches: [coachName], // Modified this line
                isNewChat: true,
                serviceName,
                suggestion: null,
              }),
            )

            dispatch(setNeedInitialMessages(false))

            navigate(`/trainingPlans/${newJobId}`)
          }
        } catch (error) {
          console.error('Error creating new training plan:', error)
          throw error
        }
      },
      )

export const handleCoachClick = createAsyncThunk<
  void,
  { coachName: string; user_id: string; navigate: (path: string) => void },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
    >(
    'job/handleCoachClick',
    async (
      { coachName, user_id, navigate },
      { dispatch, getState, rejectWithValue },
    ) => {
      dispatch(clearTemporaryCoaches())
      const newJobId = generateUniqueJobId()

      try {
        const newTrainingPlan = {
          jobId: newJobId,
          user_id: user_id,
          dateAdded: new Date().toISOString(),
          coachName,
          coaches: [coachName], // Add this line
          lastUpdated: new Date().toISOString(),
          planTitle: 'New Chat',
        }

        const response = await axios.post('/api/trainingPlans', newTrainingPlan)

        if (response.status === 201) {
          dispatch(setSelectedJobId(newJobId))
          dispatch(setCoachName(coachName))
          dispatch(setCoaches([coachName])) // Add this line
          dispatch(setLastActiveCoach(coachName)) // Add this line

          await dispatch(fetchTrainingPlans(user_id))

          dispatch(clearChatMessages())
          dispatch(clearChatContent())
          dispatch(clearLogArray())

          await dispatch(
            initChatWebSocket({
              jobId: newJobId,
              coaches: [coachName], // Modified this line
              isNewChat: true,
              serviceName: '',
              suggestion: null,
            }),
          )

          dispatch(setNeedInitialMessages(true))
          dispatch(setInitialMessage('Hi'))
          dispatch(setServiceOptions(false))

          navigate(`/trainingPlans/${newJobId}`)
        }
      } catch (error) {
        console.error('Error creating new training plan:', error)
        return rejectWithValue('Failed to create new training plan')
      }
    },
    )

export const handleIndividualCoachClick = createAsyncThunk<
  void,
  {
    coachName: string;
    user_id: string;
    navigate: (path: string) => void;
    serviceName: string;
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/handleIndividualCoachClick',
      async (
        { coachName, user_id, navigate, serviceName },
        { dispatch, getState },
      ) => {
        const newJobId = generateUniqueJobId()

        try {
          const newTrainingPlan = {
            jobId: newJobId,
            user_id: user_id,
            dateAdded: new Date().toISOString(),
            coachName,
            coaches: [coachName], // Add this line
            serviceName,
            lastUpdated: new Date().toISOString(),
            planTitle: 'New Chat',
          }

          const response = await axios.post('/api/trainingPlans', newTrainingPlan)

          if (response.status === 201) {
            dispatch(setSelectedJobId(newJobId))
            dispatch(setCoachName(coachName))
            dispatch(setCoaches([coachName])) // Add this line
            dispatch(setLastActiveCoach(coachName)) // Add this line
            dispatch(setServiceName(serviceName))

            await dispatch(fetchTrainingPlans(user_id))

            dispatch(clearChatMessages())
            dispatch(clearChatContent())
            dispatch(clearLogArray())

            await dispatch(
              initChatWebSocket({
                jobId: newJobId,
                coaches: [coachName], // Modified this line
                isNewChat: true,
                serviceName,
                suggestion: null,
              }),
            )

            navigate(`/trainingPlans/${newJobId}`)
          }
        } catch (error) {
          console.error(
            'Error creating new training plan for individual coach chat:',
            error,
          )
          throw error
        }
      },
      )

export const createTrainingPlanAndSendMessage = createAsyncThunk<
  string,
  {
    message: string;
    user_id: string;
    navigate: (path: string) => void;
    coaches: string[];
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/createTrainingPlanAndSendMessage',
      async ({ message, user_id, navigate, coaches }, { dispatch, getState }) => {
        const newJobId = generateUniqueJobId()
        const newTrainingPlan = {
          jobId: newJobId,
          user_id: user_id,
          dateAdded: new Date().toISOString(),
          coachName: coaches[0] || '', // Set the first coach as the main coach
          coaches: coaches,
          lastUpdated: new Date().toISOString(),
          planTitle: 'New Chat',
        }

        try {
          const response = await axios.post('/api/trainingPlans', newTrainingPlan)
          if (response.status === 201) {
            await dispatch(fetchTrainingPlans(user_id))
            await dispatch(
              handleJobSelect({
                jobId: newJobId,
                coaches: coaches,
                isNewChat: true,
                navigate,
              }),
            )

            dispatch(setIsWebSocketReady(true))
            dispatch(setNeedInitialMessages(true))
            dispatch(setInitialMessage(message))
            dispatch(setServiceOptions(true))
            dispatch(setCoaches(coaches))
            dispatch(setLastActiveCoach(coaches[0] || null))

            navigate(`/trainingPlans/${newJobId}`)

            return newJobId
          } else {
            throw new Error('Failed to create training plan')
          }
        } catch (error) {
          console.error('Error in createTrainingPlanAndSendMessage:', error)
          throw error
        }
      },
      )

export const createTrainingPlanAndSendFileMessage = createAsyncThunk<
  string,
  {
    message: string;
    user_id: string;
    navigate: (path: string) => void;
    coaches: string[];
    file: {
      fileName: string;
      fileType: string;
      fileId: string;
    };
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/createTrainingPlanAndSendFileMessage',
      async (
        { message, user_id, navigate, coaches, file },
        { dispatch, getState },
      ) => {
        const newJobId = generateUniqueJobId()
        try {
          // Create the training plan
          const newTrainingPlan = {
            jobId: newJobId,
            user_id: user_id,
            dateAdded: new Date().toISOString(),
            coachName: coaches[0] || '',
            coaches: coaches,
            lastUpdated: new Date().toISOString(),
            planTitle: 'New Chat',
          }

          const response = await axios.post('/api/trainingPlans', newTrainingPlan)
          if (response.status !== 201) {
            throw new Error('Failed to create training plan')
          }

          // Update local state with the new training plan
          dispatch(addTrainingPlan(newTrainingPlan))

          // Fetch training plans and initialize WebSocket
          await Promise.all([
            dispatch(fetchTrainingPlans(user_id)),
            dispatch(
              initChatWebSocket({
                jobId: newJobId,
                coaches: coaches,
                isNewChat: true,
                serviceName: '',
                suggestion: null,
              }),
            ),
          ])

          // Set initial states
          dispatch(setSelectedJobId(newJobId))
          dispatch(setIsWebSocketReady(true))
          dispatch(setNeedInitialMessages(true))
          dispatch(setServiceOptions(true))
          dispatch(setCoaches(coaches))
          dispatch(setLastActiveCoach(coaches[0] || null))

          // Wait for WebSocket to be ready with a timeout
          await Promise.race([
            new Promise<void>((resolve) => {
              const checkWebSocket = () => {
                const ws = getWebSocket()
                if (ws && ws.readyState === WebSocket.OPEN) {
                  resolve()
                } else {
                  setTimeout(checkWebSocket, 100)
                }
              }
              checkWebSocket()
            }),
            new Promise<void>((_, reject) =>
              setTimeout(
                () => reject(new Error('WebSocket connection timeout')),
                10000,
              ),
            ),
          ])

          // Set the flag to skip initial message send
          setSkipInitialMessageSend(true)

          // Send file message
          const ws = getWebSocket()
          if (ws && ws.readyState === WebSocket.OPEN) {
            // Send file information
            const fileMessage = {
              type: 'file_upload',
              file: {
                name: file.fileName,
                type: file.fileType,
                id: file.fileId,
              },
            }
            ws.send(JSON.stringify(fileMessage))

            dispatch(
              addToChatMessage({
                msg: `File uploaded: ${file.fileName}`,
                msg_from: 'user',
                display: true,
                type: 'file',
                file: {
                  name: file.fileName,
                  type: file.fileType,
                  id: file.fileId,
                },
                timestamp: new Date().toISOString(),
              }),
            )

            // If there's an additional message, send it separately
            if (message.trim() && message !== `File uploaded: ${file.fileName}`) {
              const userMessage = {
                type: 'message',
                content: message,
              }
              ws.send(JSON.stringify(userMessage))

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

            dispatch(setPendingResponse(true))
          } else {
            throw new Error('WebSocket is not connected')
          }

          // Navigate after all operations are complete
          navigate(`/trainingPlans/${newJobId}`)

          return newJobId
        } catch (error) {
          console.error('Error in createTrainingPlanAndSendFileMessage:', error)
          throw error
        }
      },
      )

export const createTrainingPlanAndSendMessageToCoach = createAsyncThunk<
  string,
  {
    message: string;
    user_id: string;
    navigate: (path: string) => void;
    coachName: string;
      },
  { state: RootState; dispatch: AppDispatch }
      >(
      'job/createTrainingPlanAndSendMessageToCoach',
      async ({ message, user_id, navigate, coachName }, { dispatch, getState }) => {
        const newJobId = generateUniqueJobId()
        const newTrainingPlan = {
          jobId: newJobId,
          user_id: user_id,
          dateAdded: new Date().toISOString(),
          coachName: coachName,
          coaches: [coachName], // Add this line
          lastUpdated: new Date().toISOString(),
          planTitle: 'New Chat',
        }

        try {
          const response = await axios.post('/api/trainingPlans', newTrainingPlan)
          if (response.status === 201) {
            await dispatch(fetchTrainingPlans(user_id))
            await dispatch(
              handleJobSelect({
                jobId: newJobId,
                coaches: [coachName], // Modified this line
                isNewChat: true,
                navigate,
              }),
            )

            dispatch(setIsWebSocketReady(true))
            dispatch(setNeedInitialMessages(true))
            dispatch(setInitialMessage(message))
            dispatch(setServiceOptions(true))
            dispatch(setCoaches([coachName])) // Add this line
            dispatch(setLastActiveCoach(coachName)) // Add this line

            navigate(`/trainingPlans/${newJobId}`)

            return newJobId
          } else {
            throw new Error('Failed to create training plan')
          }
        } catch (error) {
          console.error('Error in createTrainingPlanAndSendMessageToCoach:', error)
          throw error
        }
      },
      )

export const handlePencilClick = createAsyncThunk<
  void,
  { navigate: (path: string) => void },
  { state: RootState; dispatch: AppDispatch }
    >('job/handlePencilClick', async ({ navigate }, { dispatch, getState }) => {
      const currentJobId = getState().job.selectedJobId

      if (currentJobId) {
        AsyncStorage.removeItem('jobId')
        AsyncStorage.removeItem('coachName')

        await dispatch(closeWebSocket())

        dispatch(setSelectedJobId(null))
        dispatch(setCoachName(null))
        dispatch(setCoaches([])) // Add this line to clear the coaches array
        dispatch(setLastActiveCoach(null)) // Add this line to clear the last active coach
        dispatch(clearChatMessages())
        dispatch(clearChatContent())
        dispatch(clearLogArray())
        dispatch(clearTemporaryCoaches())
        dispatch(setUserInput(''))

        // Reset the animation state using the Zustand store
        useAnimationMessage.getState().setIsAnimationMessageExpanded(false)
      }

      navigate('/')
    })

export const updateCoachName = createAsyncThunk<
  void,
  {
    newCoachName: string | null;
    jobId: string | null;
    suggestion: any;
  },
  { state: RootState; dispatch: AppDispatch }
>(
  'job/updateCoachName',
  async ({ newCoachName, jobId }, { dispatch, getState }) => {
    console.log('Updating coach name:', newCoachName)
    if (
      newCoachName &&
      newCoachName !== 'System' &&
      newCoachName.trim() !== ''
    ) {
      dispatch(setTempCoachName(newCoachName))

      try {
        const currentState = getState().job
        const updatedCoaches = Array.from(
          new Set([...currentState.coaches, newCoachName]),
        )

        const response = await axios.put(`/api/trainingPlans/${jobId}`, {
          coachName: newCoachName,
          coaches: updatedCoaches,
        })
        if (response.status === 200) {
          dispatch(setCoachName(newCoachName))
          dispatch(setCoaches(updatedCoaches))
          dispatch(setLastActiveCoach(newCoachName))
          AsyncStorage.setItem('coachName', newCoachName)
          dispatch(setTempCoachName(null))

          // Update chat slice state
          dispatch(setChatCoachName(newCoachName))
          dispatch(setChatCoaches(updatedCoaches))
          dispatch(setChatLastActiveCoach(newCoachName))
        }
      } catch (error) {
        console.error(`Error updating coach name for job ${jobId}:`, error)
        throw error
      }
    } else {
      console.error('Invalid newCoachName')
      throw new Error('Invalid newCoachName')
    }
  },
)

// New method to remove a coach
export const removeCoach = createAsyncThunk<
  void,
  {
    coachToRemove: string;
    jobId: string | null;
  },
  { state: RootState; dispatch: AppDispatch }
>(
  'job/removeCoach',
  async ({ coachToRemove, jobId }, { dispatch, getState }) => {
    if (coachToRemove && coachToRemove.trim() !== '' && jobId) {
      try {
        const currentState = getState().job
        const updatedCoaches = currentState.coaches.filter(
          (coach) => coach !== coachToRemove,
        )

        // Update local state first
        dispatch(setCoaches(updatedCoaches))

        if (currentState.lastActiveCoach === coachToRemove) {
          const newLastActiveCoach = updatedCoaches[0] || null
          dispatch(setLastActiveCoach(newLastActiveCoach))
        }

        // Then update the training plan
        await dispatch(
          updateTrainingPlan({
            jobId,
            data: {
              coaches: updatedCoaches,
              lastActiveCoach: getState().job.lastActiveCoach,
            },
          }),
        )

        console.log(`Coach ${coachToRemove} removed successfully`)
      } catch (error) {
        console.error(
          `Error removing coach ${coachToRemove} for job ${jobId}:`,
          error,
        )
        throw error
      }
    } else {
      console.error('Invalid coachToRemove or jobId')
      throw new Error('Invalid coachToRemove or jobId')
    }
  },
)
const initialState: JobState = {
  selectedJobId:
    typeof window !== 'undefined'
      ? AsyncStorage.getItem('jobId') || null
      : null,
  coachName: null,
  trainingPlans: [],
  loading: true,
  initialMessage: null,
  isWebSocketReady: false,
  previousCoachName: null,
  needInitialMessages: false,
  serviceName: '',
  serviceOptions: false,
  coaches: [],
  lastActiveCoach: null,
  temporaryCoaches: [],
  skipInitialMessageSend: false,
  planTitle: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSelectedJobId: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload
      if (action.payload) {
        AsyncStorage.setItem('jobId', action.payload)
      } else {
        AsyncStorage.removeItem('jobId')
      }
    },
    setPlanTitle: (state, action: PayloadAction<string | null | undefined>) => {
      state.planTitle = action.payload
    },
    setCoachName: (state, action: PayloadAction<string | null>) => {
      state.coachName = action.payload
      if (action.payload) {
        AsyncStorage.setItem('coachName', action.payload)
      } else {
        AsyncStorage.removeItem('coachName')
      }
    },
    setServiceOptions: (state, action: PayloadAction<boolean>) => {
      state.serviceOptions = action.payload
    },
    setPreviousCoachName: (state, action: PayloadAction<string | null>) => {
      state.previousCoachName = action.payload
    },
    setInitialMessage: (state, action: PayloadAction<string | null>) => {
      state.initialMessage = action.payload
    },
    setIsWebSocketReady: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketReady = action.payload
    },
    setSkipInitialMessageSend: (state, action: PayloadAction<boolean>) => {
      state.skipInitialMessageSend = action.payload
    },
    addTrainingPlan: (state, action: PayloadAction<TrainingPlan>) => {
      state.trainingPlans.push(action.payload)
    },
    setNeedInitialMessages: (state, action: PayloadAction<boolean>) => {
      state.needInitialMessages = action.payload
    },
    setServiceName: (state, action: PayloadAction<string>) => {
      state.serviceName = action.payload
    },
    setLastActiveCoach: (state, action: PayloadAction<string | null>) => {
      state.lastActiveCoach = action.payload
    },
    setTemporaryCoaches: (state, action: PayloadAction<string[]>) => {
      state.temporaryCoaches = action.payload
    },
    clearTemporaryCoaches: (state) => {
      state.temporaryCoaches = []
    },

    setCoaches: (state, action: PayloadAction<string[]>) => {
      state.coaches = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingPlans.pending, (state) => {
        state.loading = true
      })
      .addCase(
        fetchTrainingPlans.fulfilled,
        (state, action: PayloadAction<TrainingPlan[]>) => {
          state.trainingPlans = action.payload
          state.loading = false
        },
      )
      .addCase(fetchTrainingPlans.rejected, (state) => {
        state.loading = false
      })
      .addCase(
        handleJobIdChange.fulfilled,
        (state, action: PayloadAction<void>) => {
          // Any additional state changes if needed
        },
      )
      .addCase(
        handleCoachNameChange.fulfilled,
        (state, action: PayloadAction<void>) => {
          // Any additional state changes if needed
        },
      )
      .addCase(
        handleJobSelect.fulfilled,
        (state, action: PayloadAction<JobSelectPayload>) => {
          const { jobId, coachName } = action.payload
          state.selectedJobId = jobId
          state.coachName = coachName
          state.serviceName = state.serviceName
        },
      )
      .addCase(handlePencilClick.fulfilled, (state) => {
        // Any additional state changes if needed
      })
      .addCase(handleCreateTrainingPlanClick.fulfilled, (state) => {
        // Add any necessary state updates here
      })
      .addCase(handleCoachClick.fulfilled, (state) => {
        // Add any necessary state updates here
      })
      .addCase(handleIndividualCoachClick.fulfilled, (state) => {
        // Add any necessary state updates here
      })
      .addCase(createTrainingPlanAndSendMessage.fulfilled, (state) => {
        // Add any necessary state updates here
      })
      .addCase(updateCoachName.fulfilled, (state) => {
        // Add any necessary state updates here
      })
  },
})

export const {
  setSelectedJobId,
  setCoachName,
  setPreviousCoachName,
  setInitialMessage,
  setIsWebSocketReady,
  setNeedInitialMessages,
  setServiceName,
  setServiceOptions,
  setLastActiveCoach,
  setCoaches,
  setTemporaryCoaches,
  clearTemporaryCoaches,
  addTrainingPlan,
  setSkipInitialMessageSend,
  setPlanTitle,
} = jobSlice.actions

export default jobSlice.reducer
