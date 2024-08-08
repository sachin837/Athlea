import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {v4 as uuidv4} from 'uuid';
import {
  clearChatMessages,
  closeWebSocket,
  initChatWebSocket,
  loadMessagesForJob,
  sendChatMessageAsync,
  setTempCoachName,
  setChatType, // renamed import
  setChatCoachName, // renamed import
  setWebSocketReady, // renamed import
  setChatServiceName, // renamed import
} from 'store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TrainingPlan} from 'model/plan';
import {AppDispatch, RootState} from 'store';
import {ChatType, JobSelectPayload, JobState} from 'model/job';

axiosRetry(axios, {
  retries: 5,
  retryDelay: retryCount => 2000,
});

const generateUniqueJobId = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
};

export const handleJobIdChange = createAsyncThunk<
  void,
  {jobId: string | null},
  {state: RootState; dispatch: AppDispatch}
>('job/handleJobIdChange', async ({jobId}, {dispatch}) => {
  if (!jobId) {
    const newJobId = uuidv4();
    await AsyncStorage.setItem('jobId', newJobId);
    dispatch(setSelectedJobId(newJobId));
  } else {
    dispatch(setSelectedJobId(jobId));
  }
});

export const handleCoachNameChange = createAsyncThunk<
  void,
  {coachName: string | null},
  {state: RootState; dispatch: AppDispatch}
>('job/handleCoachNameChange', async ({coachName}, {dispatch}) => {
  if (coachName) {
    await AsyncStorage.setItem('coachName', coachName);
    dispatch(setChatCoachName(coachName));
  } else {
    await AsyncStorage.removeItem('coachName');
    dispatch(setChatCoachName(null));
  }
});

// Async thunks
export const fetchTrainingPlans = createAsyncThunk<
  TrainingPlan[],
  string,
  {rejectValue: any}
>('job/fetchTrainingPlans', async (userId, {rejectWithValue}) => {
  try {
    const response = await axios.get(`/api/trainingPlans?user_id=${userId}`);
    const validPlans = response.data.filter(
      (plan: TrainingPlan) => plan.jobId && plan.jobId !== 'null',
    );
    return validPlans;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const handleJobSelect = createAsyncThunk<
  JobSelectPayload,
  {
    jobId: string;
    coachName?: string;
    isNewChat?: boolean;
    newChatType?: ChatType;
    serviceName?: string;
    navigate: (path: string) => void;
  },
  {state: RootState; dispatch: AppDispatch}
>(
  'job/handleJobSelect',
  async (
    {jobId, coachName, isNewChat = false, newChatType, navigate, serviceName},
    {dispatch, getState},
  ) => {
    try {
      // Clear existing messages
      dispatch(clearChatMessages());

      const response = await axios.get(`/api/trainingPlans/${jobId}`);
      const selectedPlan = response.data;
      const updatedCoachName = coachName || selectedPlan?.coachName;
      const updatedChatType =
        newChatType || selectedPlan?.chatType || 'general';
      const updatedServiceName =
        updatedChatType === 'general'
          ? ''
          : serviceName || selectedPlan?.serviceName || '';

      await dispatch(
        initChatWebSocket({
          jobId,
          chatType: updatedChatType,
          chatCoachName: updatedCoachName,
          isNewChat,
          chatServiceName: updatedServiceName,
        }),
      );

      // Load new messages
      await dispatch(loadMessagesForJob(jobId));

      // Update the URL
      navigate(`/trainingPlans/${jobId}`);

      return {jobId, coachName: updatedCoachName, chatType: updatedChatType};
    } catch (error) {
      console.error('Error fetching training plan:', error);
      throw error;
    }
  },
);

export const handleCreateTrainingPlanClick = createAsyncThunk<
  void,
  {user_id: string; navigate: (path: string) => void},
  {state: RootState; dispatch: AppDispatch}
>(
  'job/handleCreateTrainingPlanClick',
  async ({user_id, navigate}, {dispatch, getState}) => {
    const newJobId = generateUniqueJobId();

    try {
      const newTrainingPlan = {
        jobId: newJobId,
        user_id: user_id,
        dateAdded: new Date().toISOString(),
        coachName: '',
        chatType: 'sequential',
      };

      const response = await axios.post('/api/trainingPlans', newTrainingPlan);

      if (response.status === 201) {
        dispatch(setSelectedJobId(newJobId));
        dispatch(setChatCoachName(''));
        dispatch(setChatType('sequential'));
        dispatch(setChatServiceName('weekly_plan_generation'));

        await dispatch(fetchTrainingPlans(user_id));

        dispatch(clearChatMessages());

        await dispatch(
          initChatWebSocket({
            jobId: newJobId,
            chatType: 'sequential',
            chatCoachName: '',
            isNewChat: true,
            chatServiceName: 'weekly_plan_generation',
          }),
        );

        dispatch(setNeedInitialMessages(true));
        dispatch(setInitialMessage('Start')); // Store the initial message

        navigate(`/trainingPlans/${newJobId}`);
      }
    } catch (error) {
      console.error('Error creating new training plan:', error);
      throw error;
    }
  },
);

export const handleCoachClick = createAsyncThunk<
  void,
  {coachName: string; user_id: string; navigate: (path: string) => void},
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(
  'job/handleCoachClick',
  async (
    {coachName, user_id, navigate},
    {dispatch, getState, rejectWithValue},
  ) => {
    const newJobId = generateUniqueJobId();

    try {
      const newTrainingPlan = {
        jobId: newJobId,
        user_id: user_id,
        dateAdded: new Date().toISOString(),
        coachName,
        chatType: 'general' as const,
      };

      const response = await axios.post('/api/trainingPlans', newTrainingPlan);

      if (response.status === 201) {
        dispatch(setSelectedJobId(newJobId));
        dispatch(setChatCoachName(coachName));
        dispatch(setChatType('general'));

        await dispatch(fetchTrainingPlans(user_id));

        dispatch(clearChatMessages());

        await dispatch(
          initChatWebSocket({
            jobId: newJobId,
            chatType: 'general',
            chatCoachName: coachName,
            isNewChat: true,
            chatServiceName: '',
          }),
        );

        dispatch(setNeedInitialMessages(true));
        dispatch(setInitialMessage('Hi')); // Store the initial message

        navigate(`/trainingPlans/${newJobId}`);
      }
    } catch (error) {
      console.error('Error creating new training plan:', error);
      return rejectWithValue('Failed to create new training plan');
    }
  },
);

export const handleIndividualCoachClick = createAsyncThunk<
  void,
  {
    coachName: string;
    user_id: string;
    navigate: (path: string) => void;
    serviceName: string;
  },
  {state: RootState; dispatch: AppDispatch}
>(
  'job/handleIndividualCoachClick',
  async ({coachName, user_id, navigate, serviceName}, {dispatch, getState}) => {
    const newJobId = generateUniqueJobId();

    try {
      const newTrainingPlan = {
        jobId: newJobId,
        user_id: user_id,
        dateAdded: new Date().toISOString(),
        coachName,
        chatType: 'individual',
        serviceName,
      };

      const response = await axios.post('/api/trainingPlans', newTrainingPlan);

      if (response.status === 201) {
        dispatch(setSelectedJobId(newJobId));
        dispatch(setChatCoachName(coachName));
        dispatch(setChatType('individual'));
        dispatch(setChatServiceName(serviceName));

        await dispatch(fetchTrainingPlans(user_id));

        dispatch(clearChatMessages());

        await dispatch(
          initChatWebSocket({
            jobId: newJobId,
            chatType: 'individual',
            chatCoachName: coachName,
            isNewChat: true,
            chatServiceName: serviceName,
          }),
        );

        dispatch(setNeedInitialMessages(true));
        dispatch(setInitialMessage('Hi'));

        navigate(`/trainingPlans/${newJobId}`);
      }
    } catch (error) {
      console.error(
        'Error creating new training plan for individual coach chat:',
        error,
      );
      throw error;
    }
  },
);

export const createTrainingPlanAndSendMessage = createAsyncThunk<
  string,
  {message: string; user_id: string; navigate: (path: string) => void},
  {state: RootState; dispatch: AppDispatch}
>(
  'job/createTrainingPlanAndSendMessage',
  async ({message, user_id, navigate}, {dispatch, getState}) => {
    const newJobId = generateUniqueJobId();
    const newTrainingPlan = {
      jobId: newJobId,
      user_id: user_id,
      dateAdded: new Date().toISOString(),
      coachName: '',
      chatType: 'sequential',
    };

    try {
      const response = await axios.post('/api/trainingPlans', newTrainingPlan);
      if (response.status === 201) {
        await dispatch(fetchTrainingPlans(user_id));
        await dispatch(
          handleJobSelect({
            jobId: newJobId,
            coachName: '',
            isNewChat: true,
            newChatType: 'sequential',
            navigate,
          }),
        );

        dispatch(setWebSocketReady(true));
        dispatch(setNeedInitialMessages(true));
        dispatch(setInitialMessage(message)); // Store the initial message

        navigate(`/trainingPlans/${newJobId}`);

        return newJobId;
      } else {
        throw new Error('Failed to create training plan');
      }
    } catch (error) {
      console.error('Error in createTrainingPlanAndSendMessage:', error);
      throw error;
    }
  },
);

export const changeChatType = createAsyncThunk<
  void,
  {
    newType: ChatType;
    newCoachName: string;
    selectedJobId: string;
    serviceName: string;
  },
  {state: RootState; dispatch: AppDispatch}
>(
  'job/changeChatType',
  async (
    {newType, newCoachName, selectedJobId, serviceName},
    {getState, dispatch},
  ) => {
    try {
      const changedServiceName = serviceName.replace(/_/g, ' ').toLowerCase();
      const newServiceName =
        newType === 'general' ? 'general' : changedServiceName;

      await axios.put(`/api/trainingPlans/${selectedJobId}`, {
        chatType: newType,
        coachName: newCoachName,
        serviceName: newServiceName,
      });

      dispatch(setPreviousChatType(getState().job.chatType));
      dispatch(setPreviousCoachName(getState().job.coachName));
      dispatch(setChatType(newType));
      dispatch(setChatCoachName(newCoachName));
      dispatch(setChatServiceName(newServiceName));

      dispatch(closeWebSocket());

      await dispatch(
        initChatWebSocket({
          jobId: selectedJobId,
          chatType: newType,
          chatCoachName: newCoachName,
          isNewChat: true,
          chatServiceName: newServiceName,
        }),
      );

      await dispatch(
        sendChatMessageAsync({
          msg: `Service changed to ${newServiceName}`,
          options: {
            display: true,
            isServiceChange: true,
            type: 'admin',
            sendToBackend: false,
          },
        }),
      );

      console.log(`Chat type changed to ${newType}`);
    } catch (error) {
      console.error('Error changing chat type:', error);
    }
  },
);

export const handleNextClick = createAsyncThunk<
  void,
  void,
  {state: RootState; dispatch: AppDispatch}
>('job/handleNextClick', async (_, {getState, dispatch}) => {
  const state = getState().job;

  if (state.chatType === 'sequential') {
    await dispatch(
      sendChatMessageAsync({
        msg: 'Next',
        options: {display: false},
      }),
    );
  } else if (state.previousChatType && state.previousCoachName) {
    await dispatch(
      changeChatType({
        newType: state.previousChatType,
        newCoachName: state.previousCoachName,
        selectedJobId: state.selectedJobId!,
        serviceName: state.serviceName,
      }),
    );
  } else if (state.coachName) {
    await dispatch(
      changeChatType({
        newType: 'general',
        newCoachName: state.coachName,
        selectedJobId: state.selectedJobId!,
        serviceName: '',
      }),
    );
  } else {
    console.error('No coach name available to switch chat type');
  }
});

export const handlePencilClick = createAsyncThunk<
  void,
  {navigate: (path: string) => void},
  {state: RootState; dispatch: AppDispatch}
>('job/handlePencilClick', async ({navigate}, {dispatch, getState}) => {
  const currentJobId = getState().job.selectedJobId;

  if (currentJobId) {
    await AsyncStorage.removeItem('jobId');
    await AsyncStorage.removeItem('coachName');

    await dispatch(closeWebSocket());

    dispatch(setSelectedJobId(null));
    dispatch(setChatCoachName(null));
    dispatch(clearChatMessages());
  }

  navigate('/');
});

export const updateCoachName = createAsyncThunk<
  void,
  {newCoachName: string | null; jobId: string | null; chatType: ChatType},
  {state: RootState; dispatch: AppDispatch}
>(
  'job/updateCoachName',
  async ({newCoachName, jobId, chatType}, {dispatch}) => {
    if (
      newCoachName &&
      newCoachName !== 'System' &&
      newCoachName.trim() !== ''
    ) {
      dispatch(setTempCoachName(newCoachName));

      try {
        const response = await axios.put(`/api/trainingPlans/${jobId}`, {
          coachName: newCoachName,
          chatType,
        });
        if (response.status === 200) {
          dispatch(setChatCoachName(newCoachName));
          await AsyncStorage.setItem('coachName', newCoachName);
          dispatch(setTempCoachName(null));
        }
      } catch (error) {
        console.error(`Error updating coach name for job ${jobId}:`, error);
      }
    }
  },
);

const initialState: JobState = {
  selectedJobId: null,
  coachName: null,
  trainingPlans: [],
  loading: true,
  initialMessage: null,
  isWebSocketReady: false,
  chatType: 'general',
  previousChatType: 'general',
  previousCoachName: null,
  needInitialMessages: false,
  serviceName: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSelectedJobId: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload;
      if (action.payload) {
        AsyncStorage.setItem('jobId', action.payload);
      } else {
        AsyncStorage.removeItem('jobId');
      }
    },
    setCoachName: (state, action: PayloadAction<string | null>) => {
      state.coachName = action.payload;
      if (action.payload) {
        AsyncStorage.setItem('coachName', action.payload);
      } else {
        AsyncStorage.removeItem('coachName');
      }
    },
    setChatType: (state, action: PayloadAction<ChatType>) => {
      state.chatType = action.payload;
    },
    setPreviousChatType: (state, action: PayloadAction<ChatType>) => {
      state.previousChatType = action.payload;
    },
    setPreviousCoachName: (state, action: PayloadAction<string | null>) => {
      state.previousCoachName = action.payload;
    },
    setInitialMessage: (state, action: PayloadAction<string | null>) => {
      state.initialMessage = action.payload;
    },
    setIsWebSocketReady: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketReady = action.payload;
    },
    setNeedInitialMessages: (state, action: PayloadAction<boolean>) => {
      state.needInitialMessages = action.payload;
    },
    setServiceName: (state, action: PayloadAction<string>) => {
      state.serviceName = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrainingPlans.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchTrainingPlans.fulfilled,
        (state, action: PayloadAction<TrainingPlan[]>) => {
          state.trainingPlans = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchTrainingPlans.rejected, state => {
        state.loading = false;
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
          const {jobId, coachName, chatType} = action.payload;
          state.selectedJobId = jobId;
          state.coachName = coachName;
          state.chatType = chatType;
          state.serviceName = chatType === 'general' ? '' : state.serviceName;
        },
      )
      .addCase(handlePencilClick.fulfilled, state => {
        // Any additional state changes if needed
      })
      .addCase(handleCreateTrainingPlanClick.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(handleCoachClick.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(handleIndividualCoachClick.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(createTrainingPlanAndSendMessage.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(changeChatType.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(handleNextClick.fulfilled, state => {
        // Add any necessary state updates here
      })
      .addCase(updateCoachName.fulfilled, state => {
        // Add any necessary state updates here
      });
  },
});

export const {
  setSelectedJobId,
  setCoachName: setJobCoachName,
  setChatType: setJobChatType,
  setPreviousChatType,
  setPreviousCoachName,
  setInitialMessage,
  setIsWebSocketReady: setJobIsWebSocketReady,
  setNeedInitialMessages,
  setServiceName: setJobServiceName,
} = jobSlice.actions;

export default jobSlice.reducer;
