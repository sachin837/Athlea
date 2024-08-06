import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {RestingHeartRateService} from '../../api/services/health-kit-services/restingHeartRateService.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {string} from 'yup'
import {isEqual} from 'lodash'
import {produce} from 'immer'
import {updateFavoriteData} from '../favorites'

interface RestingHeartRateTrendData {
  average: number | null;
  min: number | null;
  max: number | null;
}

// Define the initial state type
export interface RestingHeartRateState {
  lastRecorded?: number | null;
  weekly?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  monthly?: RestingHeartRateTrendData;
  today?: RestingHeartRateTrendData;
  yesterday?: RestingHeartRateTrendData;
  loading?: boolean;
  error?: string | null;
}
export interface RestingHeartRateResponse {
  lastRecorded?: number | null;
  weekly?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  monthly?: RestingHeartRateTrendData;
  today?: RestingHeartRateTrendData;
  yesterday?: RestingHeartRateTrendData;
  loading?: boolean;
  error?: string | null;
}

// Define the initial state
const initialState: RestingHeartRateState = {
  lastRecorded: null,
  weekly: null,
  weeklyTrend: [],
  monthlyTrend: [],
  monthly: {average: null, min: null, max: null},
  today: {average: null, min: null, max: null},
  yesterday: {average: null, min: null, max: null},
  loading: false,
  error: null,
}

// Define thunks for asynchronous actions
export const fetchRestingHeartRateData = createAsyncThunk<
  RestingHeartRateResponse,
  {type: string; timeframe: string}
>(
  'restingHeartRate/fetchRestingHeartRate',
  async ({type, timeframe}, {rejectWithValue}) => {
    try {
      const response = await RestingHeartRateService.fetchRestingHeartRate(
        type,
        timeframe,
      )
      await AsyncStorage.setItem(
        'restingHeartRateData',
        JSON.stringify(response),
      )
      return response
      // You may need to handle the dispatching of actions within the service function itself
      // since the actual fetching logic is encapsulated there.
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const loadRestingHeartRateData = createAsyncThunk(
  'restingHeartRate/loadData',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('heartRateData')
      if (savedData) {
        dispatch(setRestingHeartRateData(JSON.parse(savedData)))
      }
    } catch (error) {
      console.error('Failed to load heart rate data from AsyncStorage:', error)
    }
  },
)

export const sendRestingHeartRateData = createAsyncThunk(
  'restingHeartRate/sendRestingHeartRateData',
  async (restingHeartRateData: RestingHeartRateState, {rejectWithValue}) => {
    try {
      const response = await RestingHeartRateService.sendRestingHeartRateData(
        restingHeartRateData,
      )
      console.log('Resting heart rate data was sent successfully:', response)
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const fetchAllRestingHeartRateData = createAsyncThunk(
  'restingHeartRate/fetchAllData',
  async (_, thunkAPI) => {
    try {
      const allData =
        await RestingHeartRateService.fetchAllRestingHeartRateData()
      // Optionally save the fetched data to AsyncStorage or handle it as needed
      await AsyncStorage.setItem(
        'allRestingHeartRateData',
        JSON.stringify(allData),
      )
      thunkAPI.dispatch(
        updateFavoriteData({
          key: 'Resting Heart Rate',
          newData: allData,
        }),
      )
      return allData
    } catch (error) {
      console.error('Error fetching all heart rate data:', error)
      return thunkAPI.rejectWithValue(error.toString())
    }
  },
)

// Create the slice
const restingHeartRateSlice = createSlice({
  name: 'restingHeartRate',
  initialState,
  reducers: {
    setRestingHeartRateData: (
      state,
      action: PayloadAction<RestingHeartRateState>,
    ) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRestingHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchRestingHeartRateData.fulfilled,
        (state, action: PayloadAction<RestingHeartRateResponse>) => {
          state.today = action.payload.today ?? state.today
          state.weekly = action.payload.weekly ?? state.weekly
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend
          state.monthly = action.payload.monthly ?? state.monthly
          state.yesterday = action.payload.yesterday ?? state.yesterday
          state.loading = false
        },
      )
      .addCase(fetchRestingHeartRateData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(fetchAllRestingHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllRestingHeartRateData.fulfilled, (state, action) => {
        // Here you would update your state with the new comprehensive data structure
        // Assuming action.payload contains all the data structured accordingly
        const {
          today,
          yesterday,
          weekly,
          weeklyTrend,
          monthly,
          monthlyTrend,
          lastRecorded,
        } = action.payload

        state.today = today
        state.yesterday = yesterday
        state.weekly = weekly
        state.weeklyTrend = weeklyTrend
        state.monthly = monthly
        state.monthlyTrend = monthlyTrend
        state.lastRecorded = lastRecorded

        state.loading = false
      })
      .addCase(fetchAllRestingHeartRateData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(sendRestingHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(sendRestingHeartRateData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendRestingHeartRateData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(loadRestingHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(loadRestingHeartRateData.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.loading = false
      })
      .addCase(loadRestingHeartRateData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })

    // Add cases for other actions if needed
  },
})

// Export actions and reducer
export const {setRestingHeartRateData} = restingHeartRateSlice.actions
export default restingHeartRateSlice.reducer
