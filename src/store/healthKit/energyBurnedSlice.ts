import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ActiveEnergyBurnedService} from '../../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {produce} from 'immer'

export interface ActiveEnergyBurnedTrendData {
  average: number;
  min: number;
  max: number;
  sum: number;
}

export interface ActiveEnergyBurnedState {
  lastRecorded?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  dailyAverage?: number | null;
  weeklyAverage?: number | null;
  twoWeekTrend?: number[] | null;
  twoMonthTrend?: number[] | null;
  today?: number | null;
  yesterday?: number | null;
  weeklyVariance?: number | null;
  weeklyMax?: number | null;
  loading?: boolean;
  error?: string | null;
}

// Define a type for the service response
export interface ActiveEnergyBurnedResponse {
  lastRecorded?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  dailyAverage?: number | null;
  weeklyAverage?: number | null;
  twoWeekTrend?: number[] | null;
  twoMonthTrend?: number[] | null;
  today?: number | null;
  yesterday?: number | null;
  weeklyVariance?: number | null;
  weeklyMax?: number | null;
  loading?: boolean;
  error?: string | null;
}

// Define the initial state using that type
const initialState: ActiveEnergyBurnedState = {
  lastRecorded: null,
  weeklyTrend: [],
  monthlyTrend: [],
  dailyAverage: null,
  weeklyAverage: null,
  today: null,
  yesterday: null,
  twoWeekTrend: [],
  twoMonthTrend: [],
  weeklyVariance: null,
  weeklyMax: null,
  loading: false,
  error: null,
}

export const fetchActiveEnergyBurnedData = createAsyncThunk<
  ActiveEnergyBurnedResponse,
  {type: string; timeframe: string}
>(
  'activeEnergyBurned/fetchActiveEnergyBurned',
  async ({type, timeframe}, {rejectWithValue}) => {
    try {
      const response = await ActiveEnergyBurnedService.fetchActiveEnergyBurned(
        type,
        timeframe,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const loadActiveEnergyBurnedData = createAsyncThunk(
  'activeEnergyBurned/loadActiveEnergyBurned',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('activeEnergyBurnedData')
      if (savedData) {
        dispatch(setActiveEnergyBurned(JSON.parse(savedData)))
      }
    } catch (error) {
      console.error('Failed to load heart rate data from AsyncStorage:', error)
    }
  },
)

export const fetchAllEnergyBurnedData = createAsyncThunk(
  'activeEnergyBurned/fetchAllEnergyBurned',
  async (_, {rejectWithValue}) => {
    try {
      const allData =
        await ActiveEnergyBurnedService.fetchAllEnergyBurnedData()
      await AsyncStorage.setItem(
        'allEnergyBurnedData',
        JSON.stringify(allData),
      )
      return allData
    } catch (error) {
      console.error('Failed to fetch all energy burned data:', error)
      return rejectWithValue(error.toString())
    }
  },
)

export const sendActiveEnergyBurnedData = createAsyncThunk(
  'activeEnergyBurned/sendActiveEnergyBurned',
  async (
    activeEnergyBurnedData: ActiveEnergyBurnedState,
    {rejectWithValue},
  ) => {
    try {
      const response =
        await ActiveEnergyBurnedService.sendActiveEnergyBurnedData(
          activeEnergyBurnedData,
        )
      return response
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

const activeEnergyBurnedSlice = createSlice({
  name: 'activeEnergyBurned',
  initialState,
  reducers: {
    setActiveEnergyBurned: (
      state,
      action: PayloadAction<ActiveEnergyBurnedState>,
    ) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchActiveEnergyBurnedData.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchActiveEnergyBurnedData.fulfilled,
        (state, action: PayloadAction<ActiveEnergyBurnedResponse>) => {
          state.lastRecorded = action.payload.lastRecorded
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend
          state.dailyAverage =
            action.payload.dailyAverage ?? state.dailyAverage
          state.weeklyAverage =
            action.payload.weeklyAverage ?? state.weeklyAverage
          state.today = action.payload.today ?? state.today
          state.yesterday = action.payload.yesterday ?? state.yesterday
          state.twoMonthTrend =
            action.payload.twoMonthTrend ?? state.twoMonthTrend
          state.twoWeekTrend =
            action.payload.twoWeekTrend ?? state.twoWeekTrend
          state.weeklyVariance =
            action.payload.weeklyVariance ?? state.weeklyVariance
          state.weeklyMax = action.payload.weeklyMax ?? state.weeklyMax
        },
      )
      .addCase(fetchActiveEnergyBurnedData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(fetchAllEnergyBurnedData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllEnergyBurnedData.fulfilled, (state, action) => {
        const {
          lastRecorded,
          weeklyTrend,
          monthlyTrend,
          dailyAverage,
          weeklyAverage,
          today,
          yesterday,
          twoWeekTrend,
          twoMonthTrend,
          weeklyVariance,
          weeklyMax,
        } = action.payload
        state.lastRecorded = lastRecorded ?? state.lastRecorded
        state.weeklyTrend = weeklyTrend ?? state.weeklyTrend
        state.monthlyTrend = monthlyTrend ?? state.monthlyTrend
        state.dailyAverage = dailyAverage ?? state.dailyAverage
        state.weeklyAverage = weeklyAverage ?? state.weeklyAverage
        state.today = today ?? state.today
        state.yesterday = yesterday ?? state.yesterday
        state.twoWeekTrend = twoWeekTrend ?? state.twoWeekTrend
        state.twoMonthTrend = twoMonthTrend ?? state.twoMonthTrend
        state.weeklyVariance = weeklyVariance ?? state.weeklyVariance
        state.weeklyMax = weeklyMax ?? state.weeklyMax
        state.loading = false
      })
      .addCase(fetchAllEnergyBurnedData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(sendActiveEnergyBurnedData.pending, state => {
        state.loading = true
      })
      .addCase(sendActiveEnergyBurnedData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendActiveEnergyBurnedData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export const {setActiveEnergyBurned} = activeEnergyBurnedSlice.actions

export default activeEnergyBurnedSlice.reducer
