// stepCountSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StepCountService} from '../../api/services';
import {produce} from 'immer';

export interface StepCountState {
  today: number | null;
  yesterday: number | null;
  weeklyVariance: number | null;
  weekly: number | null;
  weeklyTrend: number[];
  monthly: number | null;
  monthlyTrend: number[];
  twoWeekTrend: number[];
  twoMonthTrend: number[];
  loading?: boolean | null;
  error?: string | null;
}

export interface StepCountResponse {
  today?: number | null;
  yesterday?: number | null;
  weeklyVariance?: number | null;
  weekly?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  monthly?: number | null;
  twoWeekTrend?: number[];
  twoMonthTrend?: number[];
  loading?: boolean | null;
  error?: string | null;
}

const initialState: StepCountState = {
  today: null,
  yesterday: null,
  weeklyVariance: null,
  weekly: null,
  weeklyTrend: [],
  monthly: null,
  monthlyTrend: [],
  twoWeekTrend: [],
  twoMonthTrend: [],
  loading: false,
  error: null,
};

export const fetchStepCountData = createAsyncThunk<
  StepCountResponse,
  {type: string; timeframe: string}
>('stepCount/fetchStepCount', async ({type, timeframe}, {rejectWithValue}) => {
  try {
    const response = await StepCountService.fetchStepCount(type, timeframe);
    return response;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const loadStepCountData = createAsyncThunk(
  'stepCount/loadData',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('stepCountData');
      if (savedData) {
        dispatch(setStepCountData(JSON.parse(savedData)));
      }
    } catch (error) {
      console.error('Failed to load step count data from AsyncStorage:', error);
    }
  },
);

export const fetchAllStepCountData = createAsyncThunk(
  'stepCount/fetchAllStepCount',
  async (_, {rejectWithValue}) => {
    try {
      const allData = await StepCountService.fetchAllStepData();
      await AsyncStorage.setItem('allStepCountData', JSON.stringify(allData));
      return allData;
    } catch (error) {
      console.error('Failed to fetch all step count data:', error);
      return rejectWithValue(error.toString());
    }
  },
);

export const sendStepCountData = createAsyncThunk(
  'stepCount/sendStepCountData',
  async (stepCountData: StepCountResponse, {rejectWithValue}) => {
    try {
      const response = await StepCountService.sendStepData(stepCountData);
      console.log('Step count data sent successfully', response);
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const stepCountSlice = createSlice({
  name: 'stepCount',
  initialState,
  reducers: {
    setStepCountData: (state, action: PayloadAction<StepCountState>) => {
      return {...state, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStepCountData.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchStepCountData.fulfilled,
        (state, action: PayloadAction<StepCountResponse>) => {
          state.today = action.payload.today ?? state.today;
          state.yesterday = action.payload.yesterday ?? state.yesterday;
          state.weekly = action.payload.weekly ?? state.weekly;
          state.weeklyVariance =
            action.payload.weeklyVariance ?? state.weeklyVariance;
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend;
          state.monthly = action.payload.monthly ?? state.monthly;
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend;
          state.twoWeekTrend =
            action.payload.twoWeekTrend ?? state.twoWeekTrend;
          state.twoMonthTrend =
            action.payload.twoMonthTrend ?? state.twoMonthTrend;
          state.loading = false;
        },
      )
      .addCase(fetchStepCountData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchAllStepCountData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllStepCountData.fulfilled, (state, action) => {
        console.log('All step count data fetched:', action.payload);
        const {
          today,
          yesterday,
          weeklyVariance,
          weekly,
          weeklyTrend,
          monthly,
          monthlyTrend,
          twoWeekTrend,
          twoMonthTrend,
        } = action.payload;

        state.today = today ?? state.today;
        state.weekly = weekly ?? state.weekly;
        state.weeklyVariance = weeklyVariance ?? state.weeklyVariance;
        state.weeklyTrend = weeklyTrend ?? state.weeklyTrend;
        state.yesterday = yesterday ?? state.yesterday;
        state.monthly = monthly ?? state.monthly;
        state.monthlyTrend = monthlyTrend ?? state.monthlyTrend;
        state.twoWeekTrend = twoWeekTrend ?? state.twoWeekTrend;
        state.twoMonthTrend = twoMonthTrend ?? state.twoMonthTrend;
        state.loading = false;
      })
      .addCase(fetchAllStepCountData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(sendStepCountData.pending, state => {
        state.loading = true;
      })
      .addCase(sendStepCountData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendStepCountData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const {setStepCountData} = stepCountSlice.actions;
export default stepCountSlice.reducer;
