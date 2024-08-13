import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Vo2MaxService} from '../../api/services'
import {produce} from 'immer'
import {updateFavoriteData} from '../favorites'

interface Vo2MaxTrendData {
  average: number;
  min: number;
  max: number;
  standardDeviation: number;
}

export interface Vo2MaxState {
  lastRecorded?: number | null;
  weeklyTrend?: number[];
  weeklyMax?: number | null;
  weekly?: Vo2MaxTrendData;
  monthlyTrend?: number[];
  monthly?: Vo2MaxTrendData;
  today?: Vo2MaxTrendData;
  yesterday?: Vo2MaxTrendData;
  loading?: boolean;
  error?: string | null;
}

export interface Vo2MaxResponse {
  lastRecorded?: number | null;
  weeklyTrend?: number[];
  weeklyMax?: number | null;
  weekly?: Vo2MaxTrendData;
  monthlyTrend?: number[];
  monthly?: Vo2MaxTrendData;
  today?: Vo2MaxTrendData;
  yesterday?: Vo2MaxTrendData;
  loading?: boolean;
  error?: string | null;
}

// Define the initial state
const initialState: Vo2MaxState = {
  lastRecorded: null,
  weeklyTrend: [],
  weeklyMax: null,
  weekly: {average: 0, min: 0, max: 0, standardDeviation: 0},
  monthlyTrend: [],
  monthly: {average: 0, min: 0, max: 0, standardDeviation: 0},
  today: {average: 0, min: 0, max: 0, standardDeviation: 0},
  yesterday: {average: 0, min: 0, max: 0, standardDeviation: 0},
  loading: false,
  error: null,
}

export const fetchVo2MaxData = createAsyncThunk<
  Vo2MaxResponse,
  {type: string; timeframe: string}
>('vo2Max/fetchVo2Max', async ({type, timeframe}, {rejectWithValue}) => {
  try {
    const response = await Vo2MaxService.fetchVo2Max(type, timeframe)
    await AsyncStorage.setItem('vo2MaxData', JSON.stringify(response))
    return response
  } catch (error) {
    return rejectWithValue(error.toString())
  }
})

export const loadVo2MaxData = createAsyncThunk(
  'vo2Max/loadVo2Max',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('heartRateData')
      if (savedData) {
        dispatch(setVo2MaxData(JSON.parse(savedData)))
      }
    } catch (error) {
      console.error('Failed to load heart rate data from AsyncStorage:', error)
    }
  },
)

export const fetchAllVo2MaxData = createAsyncThunk(
  'vo2Max/fetchAllVo2Max',
  async (_, thunkAPI) => {
    try {
      const allData = await Vo2MaxService.fetchAllVo2MaxData()
      await AsyncStorage.setItem('allVo2MaxData', JSON.stringify(allData))
      thunkAPI.dispatch(
        updateFavoriteData({
          key: 'VO2 Max', // This should match the key in your favorites state
          newData: allData, // You would adjust this based on how you want to structure the newData
        }),
      )
      return allData
    } catch (error) {
      console.error('Failed to load vo2Max data from AsyncStorage:', error)
      return thunkAPI.rejectWithValue(error.toString())
    }
  },
)

export const sendVo2MaxData = createAsyncThunk(
  'vo2Max/sendVo2Max',
  async (vo2MaxData: Vo2MaxState, {rejectWithValue}) => {
    try {
      const response = await Vo2MaxService.sendVo2MaxData(vo2MaxData)
      return response
    } catch (error) {
      console.error('Failed to load heart rate data from AsyncStorage:', error)
    }
  },
)

// Define reducers and actions
const vo2MaxSlice = createSlice({
  name: 'vo2Max',
  initialState,
  reducers: {
    setVo2MaxData: (state, action: PayloadAction<Vo2MaxState>) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVo2MaxData.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchVo2MaxData.fulfilled,
        (state, action: PayloadAction<Vo2MaxResponse>) => {
          state.lastRecorded =
            action.payload.lastRecorded ?? state.lastRecorded
          state.weeklyMax = action.payload.weeklyMax ?? state.weeklyMax
          state.weekly = action.payload.weekly ?? state.weekly
          state.today = action.payload.today ?? state.today
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend
          state.monthly = action.payload.monthly ?? state.monthly
          state.yesterday = action.payload.yesterday ?? state.yesterday
          state.loading = false
        },
      )
      .addCase(fetchVo2MaxData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(fetchAllVo2MaxData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllVo2MaxData.fulfilled, (state, action) => {
        const {
          lastRecorded,
          weeklyTrend,
          weeklyMax,
          weekly,
          monthlyTrend,
          monthly,
          today,
          yesterday,
        } = action.payload
        state.lastRecorded = lastRecorded ?? state.lastRecorded
        state.weeklyTrend = weeklyTrend ?? state.weeklyTrend
        state.weeklyMax = weeklyMax ?? state.weeklyMax
        state.weekly = weekly ?? state.weekly
        state.monthlyTrend = monthlyTrend ?? state.monthlyTrend
        state.monthly = monthly ?? state.monthly
        state.today = today ?? state.today
        state.yesterday = yesterday ?? state.yesterday
        state.loading = false
      })
      .addCase(fetchAllVo2MaxData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(sendVo2MaxData.pending, state => {
        state.loading = true
      })
      .addCase(sendVo2MaxData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendVo2MaxData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(loadVo2MaxData.pending, state => {
        state.loading = true
      })
      .addCase(loadVo2MaxData.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.loading = false
      })
      .addCase(loadVo2MaxData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })

    // Add cases for other actions if needed
  },
})

// Export actions and reducer
export const {setVo2MaxData} = vo2MaxSlice.actions
export default vo2MaxSlice.reducer
