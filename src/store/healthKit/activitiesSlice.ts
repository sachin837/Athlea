import AsyncStorage from '@react-native-async-storage/async-storage'
import {ActivitiesService} from '../../api/services'
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export interface ExerciseTimeState {
  today: number;
  yesterday: number;
  weekly: number;
  monthly: number;
  weeklyTrend: number[];
  monthlyTrend: number[];
  lastRecorded?: number | null;
  loading: boolean;
  error: string | null;
}

export interface ExerciseTimeResponse {
  today: number;
  yesterday: number;
  weekly: number;
  monthly: number;
  weeklyTrend: number[];
  monthlyTrend: number[];
  lastRecorded: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExerciseTimeState = {
  today: 0,
  yesterday: 0,
  weekly: 0,
  monthly: 0,
  lastRecorded: 0,
  weeklyTrend: [],
  monthlyTrend: [],
  loading: false,
  error: null,
}

export const fetchExerciseTime = createAsyncThunk<
  ExerciseTimeResponse,
  {type: string; timeframe: string}
>('exerciseTime/fetchExerciseTime', async ({type}, {rejectWithValue}) => {
  try {
    const response = await ActivitiesService.fetchExerciseTimeData(type)
    return response
  } catch (error) {
    return rejectWithValue(error.toString())
  }
})

export const sendExerciseData = createAsyncThunk(
  'exerciseTime/sendExerciseData',
  async (excerciseTimeData: ExerciseTimeState, {rejectWithValue}) => {
    try {
      const response = await ActivitiesService.sendExerciseTimeData(
        excerciseTimeData,
      )
      console.log('Heart rate data sent successfully:', response)
      // Additional logic if necessary
    } catch (error) {
      return rejectWithValue(error.toString())
    }
  },
)

export const fetchAllExerciseData = createAsyncThunk(
  'exerciseData/fetchAllExerciseData',
  async (_, {rejectWithValue}) => {
    try {
      const allData = await ActivitiesService.fetchAllExerciseData()
      // Optionally save the fetched data to AsyncStorage or handle it as needed
      await AsyncStorage.setItem('allExerciseData', JSON.stringify(allData))
      return allData
    } catch (error) {
      console.error('Error fetching all heart rate data:', error)
      return rejectWithValue(error.toString())
    }
  },
)

export const exerciseTimeSlice = createSlice({
  name: 'exerciseTime',
  initialState,
  reducers: {
    // Reducers for synchronous actions if needed
    setExerciseTimeData: (state, action: PayloadAction<ExerciseTimeState>) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExerciseTime.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchExerciseTime.fulfilled,
        (state, action: PayloadAction<ExerciseTimeResponse>) => {
          state.today = action.payload.today ?? state.today
          state.yesterday = action.payload.yesterday ?? state.yesterday
          state.weekly = action.payload.weekly ?? state.weekly
          state.monthly = action.payload.monthly ?? state.monthly
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend
          state.lastRecorded =
            action.payload.lastRecorded ?? state.lastRecorded
          state.loading = false
        },
      )
      .addCase(fetchExerciseTime.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchAllExerciseData.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllExerciseData.fulfilled, (state, action) => {
        const {
          today,
          yesterday,
          weekly,
          monthly,
          weeklyTrend,
          monthlyTrend,
          lastRecorded,
        } = action.payload
        // Update the state with fetched data
        state.today = today ?? state.today
        state.yesterday = yesterday ?? state.yesterday
        state.weekly = weekly ?? state.weekly
        state.monthly = monthly ?? state.monthly
        state.weeklyTrend = weeklyTrend ?? state.weeklyTrend
        state.monthlyTrend = monthlyTrend ?? state.monthlyTrend
        state.lastRecorded = lastRecorded ?? state.lastRecorded
        state.loading = false
      })
      .addCase(fetchAllExerciseData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(sendExerciseData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(sendExerciseData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendExerciseData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {setExerciseTimeData} = exerciseTimeSlice.actions
export default exerciseTimeSlice.reducer
