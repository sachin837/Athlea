import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {HeartRateService} from '../../api/services'
import {isEqual} from 'lodash'
import {produce} from 'immer'
import {updateFavoriteData} from '../favorites'
import {firebase} from '@react-native-firebase/auth'
import {RootState} from '../index'

interface HeartRateTrendData {
  average: number | null;
  min: number | null;
  max: number | null;
}

interface HeartRateDateData {
  date: string;
  value: number;
}

export interface HeartRateState {
  lastRecorded?: number | null;
  today?: HeartRateTrendData;
  weekly?: number | null;
  weeklyMaxHeartRate?: number[];
  monthly?: HeartRateTrendData;
  monthlyTrend?: number[];
  fullDay?: HeartRateDateData[];
  yesterday?: {
    average: number | null;
    min: number | null;
    max: number | null;
  };
  lastUpdated?: string; // Field to store the date of the last record
  loading?: boolean;
  error?: string | null;
}

export interface HeartRateResponse {
  lastRecorded?: number | null;
  today: HeartRateTrendData;
  weekly: number | null;
  weeklyMaxHeartRate: number[];
  monthly: HeartRateTrendData;
  monthlyTrend: number[];
  yesterday: HeartRateTrendData;
  fullDay: HeartRateDateData[];
  loading: boolean;
}

// Define the initial state based on your HealthKitContext
const initialState: HeartRateState = {
  lastRecorded: null,
  today: {average: null, min: null, max: null},
  weekly: null,
  weeklyMaxHeartRate: [],
  monthly: {average: null, min: null, max: null},
  monthlyTrend: [],
  fullDay: [],
  yesterday: {average: null, min: null, max: null},
  loading: false,
  error: null,
}

// Async thunk for fetching heart rate data
// Async thunk for fetching today's heart rate data
export const fetchHeartRate = createAsyncThunk<
  HeartRateResponse,
  void,
  {rejectValue: Error}
>('heartRate/fetchHeartRate', async (_, {rejectWithValue}) => {
  try {
    const userId = firebase.auth().currentUser?.uid
    if (!userId) {throw new Error('User not authenticated')}

    const response = await HeartRateService.fetchHeartRate(userId)
    return response // Ensure this is of type HeartRateResponse
  } catch (error) {
    return rejectWithValue(new Error(error.toString()))
  }
})

export const loadHeartRateData = createAsyncThunk(
  'heartRate/loadData',
  async (_, {dispatch}) => {
    try {
      const savedData = await AsyncStorage.getItem('heartRateData')
      console.log('Saved heart rate data:', savedData)
      if (savedData) {
        dispatch(setHeartRateData(JSON.parse(savedData)))
      }
    } catch (error) {
      console.error('Failed to load heart rate data from AsyncStorage:', error)
    }
  },
)

export const sendHeartRateData = createAsyncThunk(
  'heartRate/sendHeartRateData',
  async (heartRateData: HeartRateState, {rejectWithValue}) => {
    try {
      const response = await HeartRateService.sendHeartRateData(heartRateData)
      console.log('Heart rate data sent successfully:', response)
      // Additional logic if necessary
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const fetchTodaysData = createAsyncThunk(
  'heartRate/fetchTodaysData',
  async (_, {dispatch, rejectWithValue}) => {
    const userId = firebase.auth().currentUser?.uid
    if (!userId) {
      console.error('User not authenticated')
      return rejectWithValue('User not authenticated')
    }

    try {
      const result = await HeartRateService.fetchTodaysData(userId)

      if (
        !result ||
        typeof result.lastRecorded !== 'number' ||
        !Array.isArray(result.fullDayData)
      ) {
        console.error('No data received or data is incorrect', result)
        return rejectWithValue('No data received or data is incorrect')
      }

      // Process and store the fetched data
      const newHeartRateData = {
        lastRecorded: result.lastRecorded,
        fullDay: result.fullDayData.map(item => ({
          date: item.time,
          value: item.value,
        })),
      }

      await AsyncStorage.setItem(
        'todaysHeartRateData',
        JSON.stringify(newHeartRateData),
      )

      dispatch(setHeartRateData(newHeartRateData))
      dispatch(
        updateFavoriteData({
          key: 'Heart Rate',
          newData: newHeartRateData,
        }),
      )

      return newHeartRateData
    } catch (error) {
      console.error('Error fetching today\'s heart rate data:', error)
      return rejectWithValue(error.toString())
    }
  },
)

export const fetchInitialHeartRateRecord = createAsyncThunk(
  'heartRate/fetchInitialRecord',
  async (_, {getState, rejectWithValue}) => {
    try {
      const user = firebase.auth().currentUser?.uid
      console.log('User:', user)
      if (!user) {
        console.error('No user authenticated')
        return rejectWithValue('No user authenticated')
      }
      const userId = user
      console.log('User ID:', userId)

      // Directly expecting the response body here
      const initialRecord = await HeartRateService.fetchInitialRecord(userId)
      console.log('Initial record:', initialRecord) // Log the initial record to inspect its structure

      if (!initialRecord || typeof initialRecord !== 'object') {
        console.error(
          'Invalid structure of the initial record:',
          initialRecord,
        )
        return rejectWithValue('Invalid structure of the initial record')
      }

      // Now initialRecord directly contains the JSON body, which should have date and lastRecorded
      const {date, lastRecorded} = initialRecord

      if (typeof date !== 'string' || typeof lastRecorded !== 'number') {
        console.error(
          'Invalid data types in the initial record:',
          date,
          lastRecorded,
        )
        return rejectWithValue('Invalid data types in the initial record')
      }

      return {date, lastRecorded}
    } catch (error) {
      console.error('Error fetching initial heart rate record:', error)
      const errorMessage =
        error?.errors?.map(e => e.message).join(', ') || error.toString()
      return rejectWithValue(errorMessage)
    }
  },
)

const heartRateSlice = createSlice({
  name: 'heartRate',
  initialState,
  reducers: {
    // Reducers for synchronous actions if needed
    setHeartRateData: (state, action: PayloadAction<HeartRateState>) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeartRate.pending, state => {
        state.loading = true
      })
      .addCase(fetchHeartRate.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(fetchHeartRate.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(sendHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(sendHeartRateData.fulfilled, (state, action) => {
        state.loading = false
        // You can update the state to reflect that the data was sent successfully
      })
      .addCase(sendHeartRateData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(loadHeartRateData.pending, state => {
        state.loading = true
      })
      .addCase(loadHeartRateData.fulfilled, (state, action) => {
        // Assuming action.payload is the heart rate data you loaded
        // and you want to update the entire state with this data
        Object.assign(state, action.payload)
      })
      .addCase(loadHeartRateData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(fetchTodaysData.pending, state => {
        state.loading = true
      })
      .addCase(fetchTodaysData.fulfilled, (state, action) => {
        state.lastRecorded = action.payload.lastRecorded ?? state.lastRecorded
        state.fullDay = action.payload.fullDay ?? state.fullDay
        console.log('Updated state with today\'s data')
      })
      .addCase(fetchTodaysData.rejected, (state, action) => {
        console.error('Failed to fetch today\'s data', action.payload)
        state.error = action.payload
      })
      .addCase(fetchInitialHeartRateRecord.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchInitialHeartRateRecord.fulfilled,
        (
          state,
          action: PayloadAction<{date: string; lastRecorded: number}>,
        ) => {
          state.lastRecorded = action.payload.lastRecorded
          state.lastUpdated = action.payload.date // Assuming you have a field like this to store the last updated date
          state.loading = false
        },
      )
      .addCase(fetchInitialHeartRateRecord.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })

    // Add more cases for other async actions if needed
  },
})

export const {setHeartRateData} = heartRateSlice.actions

export default heartRateSlice.reducer
