import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SleepAnalysisService} from '../../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {produce} from 'immer'
import {updateFavoriteData} from '../favorites'

interface CategorizedSleepData {
  INBED: number;
  ASLEEP: number;
  DEEP: number;
  // ... other states
}

export interface SleepAnalysisState {
  categorizedSleepAnalysis?: CategorizedSleepData;
  monthlyTrendSleepScore?: number[];
  weeklyTrendSleepScore?: number[];
  dailyScore?: number;
  deepSleepPercentage?: number;
  yesterday?: number;
  averageInBedDuration?: number | null;
  weeklyScore?: number | null;
  weeklySleepEfficiency?: number | null;
  twoWeekSleepScore?: number[];
  yesterdaySleepScore?: number;
  lastRecorded?: number | null;
  loading?: boolean;
  error?: string | null;
}

export interface SleepAnalysisResponse {
  categorizedSleepAnalysis?: CategorizedSleepData;
  monthlyTrendSleepScore?: number[];
  weeklyTrendSleepScore?: number[];
  dailyScore?: number;
  deepSleepPercentage?: number;
  yesterday?: number;
  averageInBedDuration?: number;
  weeklyScore?: number;
  weeklySleepEfficiency?: number;
  twoWeekSleepScore?: number[];
  yesterdaySleepScore?: number;
  lastRecorded?: number;
  loading?: boolean;
  error?: string | null;
}

// Define the initial state using that type
const initialState: SleepAnalysisState = {
  categorizedSleepAnalysis: {
    INBED: 0,
    ASLEEP: 0,
    DEEP: 0,
  },
  monthlyTrendSleepScore: [],
  dailyScore: 0,
  deepSleepPercentage: 0,
  averageInBedDuration: 0,
  weeklyTrendSleepScore: [],
  yesterday: 0,
  weeklyScore: 0,
  yesterdaySleepScore: 0,
  weeklySleepEfficiency: 0,
  twoWeekSleepScore: [],
  lastRecorded: 0,
  loading: false,
  error: null,
}

export const fetchSleepAnalysisData = createAsyncThunk<
  SleepAnalysisResponse,
  {type: string; timeframe: string}
>(
  'sleepAnalysis/fetchSleepAnalysis',
  async ({type, timeframe}, {rejectWithValue}) => {
    try {
      const response = await SleepAnalysisService.fetchSleepAnalysis(
        type,
        timeframe,
      )
      await AsyncStorage.setItem('sleepAnalysisData', JSON.stringify(response))
      return response
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const loadSleepAnalysisData = createAsyncThunk(
  'sleepAnalysis/loadSleepAnalysis',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('sleepAnalysisData')
      if (savedData) {
        dispatch(setSleepAnalysisData(JSON.parse(savedData)))
      }
    } catch (error) {
      console.error('Failed to load step count data from AsyncStorage:', error)
    }
  },
)

export const fetchAllSleepAnalysisData = createAsyncThunk(
  'sleepAnalysis/fetchAllSleepAnalysis',
  async (_, thunkAPI) => {
    try {
      const allData = await SleepAnalysisService.fetchAllSleepData()
      await AsyncStorage.setItem(
        'allSleepAnalysisData',
        JSON.stringify(allData),
      )

      thunkAPI.dispatch(
        updateFavoriteData({
          key: 'Sleep Analysis',
          newData: allData,
        }),
      )
      return allData
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString())
    }
  },
)

export const sendSleepAnalysisData = createAsyncThunk(
  'sleepAnalysis/sendSleepAnalysis',
  async (sleepAnalysisData: SleepAnalysisState, {rejectWithValue}) => {
    try {
      const response = await SleepAnalysisService.sendSleepAnalysisData(
        sleepAnalysisData,
      )
      console.log('Sent sleep analysis data:', response)
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

const sleepAnalysisSlice = createSlice({
  name: 'sleepAnalysis',
  initialState,
  reducers: {
    setSleepAnalysisData: (
      state,
      action: PayloadAction<SleepAnalysisState>,
    ) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSleepAnalysisData.pending, state => {
        state.loading = true
      })
      .addCase(fetchSleepAnalysisData.fulfilled, (state, action) => {
        state.loading = false
        state.categorizedSleepAnalysis =
          action.payload.categorizedSleepAnalysis ??
          state.categorizedSleepAnalysis
        state.monthlyTrendSleepScore =
          action.payload.monthlyTrendSleepScore ?? state.monthlyTrendSleepScore
        state.dailyScore = action.payload.dailyScore ?? state.dailyScore
        state.deepSleepPercentage =
          action.payload.deepSleepPercentage ?? state.deepSleepPercentage
        state.yesterdaySleepScore =
          action.payload.yesterdaySleepScore ?? state.yesterdaySleepScore
        state.yesterday = action.payload.yesterday ?? state.yesterday
        state.averageInBedDuration =
          action.payload.averageInBedDuration ?? state.averageInBedDuration
        state.weeklyTrendSleepScore =
          action.payload.weeklyTrendSleepScore ?? state.weeklyTrendSleepScore
        state.weeklyScore = action.payload.weeklyScore ?? state.weeklyScore
        state.weeklySleepEfficiency =
          action.payload.weeklySleepEfficiency ?? state.weeklySleepEfficiency
        state.twoWeekSleepScore =
          action.payload.twoWeekSleepScore ?? state.twoWeekSleepScore
        state.lastRecorded = action.payload.lastRecorded ?? state.lastRecorded
      })

      .addCase(fetchSleepAnalysisData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchAllSleepAnalysisData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllSleepAnalysisData.fulfilled, (state, action) => {
        const {
          categorizedSleepAnalysis,
          monthlyTrendSleepScore,
          dailyScore,
          deepSleepPercentage,
          yesterday,
          yesterdaySleepScore,
          averageInBedDuration,
          weeklyTrendSleepScore,
          weeklyScore,
          weeklySleepEfficiency,
          twoWeekSleepScore,
          lastRecorded,
        } = action.payload

        state.categorizedSleepAnalysis =
          categorizedSleepAnalysis ?? state.categorizedSleepAnalysis
        state.monthlyTrendSleepScore =
          monthlyTrendSleepScore ?? state.monthlyTrendSleepScore
        state.dailyScore = dailyScore ?? state.dailyScore
        state.deepSleepPercentage =
          deepSleepPercentage ?? state.deepSleepPercentage
        state.yesterday = yesterday ?? state.yesterday
        state.yesterdaySleepScore =
          yesterdaySleepScore ?? state.yesterdaySleepScore
        state.averageInBedDuration =
          averageInBedDuration ?? state.averageInBedDuration
        state.weeklyTrendSleepScore =
          weeklyTrendSleepScore ?? state.weeklyTrendSleepScore
        state.weeklyScore = weeklyScore ?? state.weeklyScore
        state.weeklySleepEfficiency =
          weeklySleepEfficiency ?? state.weeklySleepEfficiency
        state.twoWeekSleepScore = twoWeekSleepScore ?? state.twoWeekSleepScore
        state.lastRecorded = lastRecorded ?? state.lastRecorded
      })
      .addCase(fetchAllSleepAnalysisData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(sendSleepAnalysisData.pending, state => {
        state.loading = true
      })
      .addCase(sendSleepAnalysisData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendSleepAnalysisData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {setSleepAnalysisData} = sleepAnalysisSlice.actions

export default sleepAnalysisSlice.reducer
