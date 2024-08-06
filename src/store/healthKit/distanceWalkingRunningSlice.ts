import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {WalkingAndRunningDistanceService} from '../../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {produce} from 'immer'
import {updateFavoriteData} from '../favorites'

interface DistanceTrendData {
  average: number;
  min: number;
  max: number;
}

export interface DistanceMaxState {
  lastRecorded?: number | null;
  weeklyTrend?: number[] | null;
  weeklyMax?: number | null;
  weeklyAverage?: number | null;
  dailyAverage?: number | null;
  monthlyTrend?: number[] | null;
  today?: DistanceTrendData;
  yesterday?: DistanceTrendData;
  twoMonthTrend?: number[] | null;
  twoWeekTrend?: number[] | null;
  weeklyVariance?: number | null;
  loading?: boolean;
  error?: string | null;
}

export interface DistanceMaxResponse {
  lastRecorded?: number | null;
  weeklyTrend?: number[] | null;
  weeklyMax?: number | null;
  weeklyAverage?: number | null;
  dailyAverage?: number | null;
  monthlyTrend?: number[] | null;
  today?: DistanceTrendData;
  yesterday?: DistanceTrendData;
  twoMonthTrend?: number[] | null;
  twoWeekTrend?: number[] | null;
  weeklyVariance?: number | null;
  loading?: boolean;
  error?: string | null;
}

// Define the initial state
const initialState: DistanceMaxState = {
  lastRecorded: null,
  weeklyTrend: [],
  weeklyMax: null,
  weeklyAverage: null,
  dailyAverage: null,
  monthlyTrend: [],
  today: {average: 0, min: 0, max: 0},
  yesterday: {average: 0, min: 0, max: 0},
  twoMonthTrend: [],
  twoWeekTrend: [],
  weeklyVariance: null,
  loading: false,
  error: null,
}

export const fetchDistanceData = createAsyncThunk<
  DistanceMaxResponse,
  {type: string; timeframe: string}
>('distanceMax/fetchData', async ({type, timeframe}, {rejectWithValue}) => {
  try {
    const response =
      await WalkingAndRunningDistanceService.fetchWalkingAndRunningDistance(
        type,
        timeframe,
      )
    return response
  } catch (error) {
    return rejectWithValue(error.toString())
  }
})

export const loadDistanceData = createAsyncThunk(
  'distanceMax/loadData',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('distanceMaxData')
      if (savedData) {
        const data = JSON.parse(savedData)
        dispatch(setDistanceMaxData(data))
      }
    } catch (error) {
      console.error(
        'Failed to load distance walking/running data from AsyncStorage:',
        error,
      )
    }
  },
)

export const fetchAllDistanceData = createAsyncThunk(
  'distanceMax/fetchAllData',
  async (_, thunkAPI) => {
    try {
      const allData =
        await WalkingAndRunningDistanceService.fetchAllDistanceData()
      await AsyncStorage.setItem('distanceMaxData', JSON.stringify(allData))
      thunkAPI.dispatch(
        updateFavoriteData({
          key: 'Distance',
          newData: allData,
        }),
      )
      return allData
    } catch (error) {
      console.error('Failed to fetch all distance data:', error)
      return thunkAPI.rejectWithValue(error.toString())
    }
  },
)

export const sendDistanceData = createAsyncThunk(
  'distanceMax/sendDistanceData',
  async (distanceData: DistanceMaxResponse, {rejectWithValue}) => {
    try {
      const response = await WalkingAndRunningDistanceService.sendDistanceData(
        distanceData,
      )
      console.log('Distance data sent successfully', response)
    } catch (error: any) {
      return rejectWithValue(error.toString())
    }
  },
)

// The slice definition
const distanceMaxSlice = createSlice({
  name: 'distanceMax',
  initialState,
  reducers: {
    // Reducers for synchronous actions if needed
    setDistanceMaxData: (state, action) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDistanceData.pending, state => {
        state.loading = true
      })
      .addCase(fetchDistanceData.fulfilled, (state, action) => {
        // Update the state with fetched data
        state.lastRecorded = action.payload.lastRecorded ?? state.lastRecorded
        state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
        state.weeklyMax = action.payload.weeklyMax ?? state.weeklyMax
        state.monthlyTrend = action.payload.monthlyTrend ?? state.monthlyTrend
        state.weeklyAverage =
          action.payload.weeklyAverage ?? state.weeklyAverage
        state.dailyAverage = action.payload.dailyAverage ?? state.dailyAverage
        state.today = action.payload.today ?? state.today
        state.yesterday = action.payload.yesterday ?? state.yesterday
        state.twoMonthTrend =
          action.payload.twoMonthTrend ?? state.twoMonthTrend
        state.twoWeekTrend = action.payload.twoWeekTrend ?? state.twoWeekTrend
        state.weeklyVariance =
          action.payload.weeklyVariance ?? state.weeklyVariance
        state.loading = false
      })

      .addCase(fetchDistanceData.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(fetchAllDistanceData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllDistanceData.fulfilled, (state, action) => {
        const {
          lastRecorded,
          weeklyTrend,
          weeklyMax,
          monthlyTrend,
          today,
          yesterday,
          twoMonthTrend,
          twoWeekTrend,
          weeklyVariance,
          weeklyAverage,
          dailyAverage,
        } = action.payload

        state.lastRecorded = lastRecorded ?? state.lastRecorded
        state.weeklyTrend = weeklyTrend ?? state.weeklyTrend
        state.weeklyMax = weeklyMax ?? state.weeklyMax
        state.monthlyTrend = monthlyTrend ?? state.monthlyTrend
        state.weeklyAverage = weeklyAverage ?? state.weeklyAverage
        state.dailyAverage = dailyAverage ?? state.dailyAverage
        state.today = today ?? state.today
        state.yesterday = yesterday ?? state.yesterday
        state.twoMonthTrend = twoMonthTrend ?? state.twoMonthTrend
        state.twoWeekTrend = twoWeekTrend ?? state.twoWeekTrend
        state.weeklyVariance = weeklyVariance ?? state.weeklyVariance
      })
      .addCase(fetchAllDistanceData.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(sendDistanceData.pending, state => {
        state.loading = true
      })
      .addCase(sendDistanceData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendDistanceData.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(loadDistanceData.pending, state => {
        state.loading = true
      })
      .addCase(loadDistanceData.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.loading = false
      })
  },
})

export const {setDistanceMaxData} = distanceMaxSlice.actions

export default distanceMaxSlice.reducer
