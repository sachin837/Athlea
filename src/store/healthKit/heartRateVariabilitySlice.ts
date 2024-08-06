import AsyncStorage from '@react-native-async-storage/async-storage'
import {HeartRateVariabilityService} from '../../api/services'
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {updateFavoriteData} from '../favorites'

export interface HeartRateVariabilityState {
  lastRecorded?: number | null;
  weekly?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  monthly?: number | null;
  today?: number | null;
  yesterday?: number | null;
  dailyTrend?: number[];
  loading?: boolean;
  error?: string | null;
}

export interface HeartRateVariabilityResponse {
  lastRecorded?: number | null;
  weekly?: number | null;
  weeklyTrend?: number[];
  monthlyTrend?: number[];
  monthly?: number | null;
  today?: number | null;
  yesterday?: number | null;
  dailyTrend?: number[];
  loading?: boolean;
  error?: string | null;
}

const initialState: HeartRateVariabilityState = {
  lastRecorded: null,
  weekly: null,
  weeklyTrend: [],
  monthlyTrend: [],
  monthly: null,
  today: null,
  yesterday: null,
  dailyTrend: [],
  loading: false,
  error: null,
}

// 1. Starts defining an asynchronous Redux Thunk using createAsyncThunk utility from Redux Toolkit.
// 2. The Thunk is typed to expect a HeartRateVariabilityResponse upon successful completion,
//    and it requires parameters of type and timeframe when being dispatched.
export const fetchHeartRateVariabilityData = createAsyncThunk<
  HeartRateVariabilityResponse, // 3. The expected return type of the async operation.
  {type: string; timeframe: string} // 4. The types of parameters this Thunk expects.
>(
  // 5. Defines the action type string for this specific Thunk.
  //    Used by Redux Toolkit to handle and track the lifecycle of this async action.
  'heartRateVariability/fetchHeartRateVariability',

  // 6. The payload creator function where the async operation is performed.
  //    Destructures its first argument to directly get the type and timeframe values.
  async (
    {type, timeframe},

    // 7. ThunkAPI argument providing several utilities, with rejectWithValue used for error handling.
    {rejectWithValue},
  ) => {
    try {
      // 8. Begins a try block to attempt the async operation and catch any errors.

      // 9. Calls the async service function to fetch heart rate variability data,
      //    passing in the type and timeframe, and awaits its resolution.
      const response =
        await HeartRateVariabilityService.fetchHeartRateVariability(
          type,
          timeframe,
        )

      // 10. Once the data is fetched, it's saved to AsyncStorage under the key
      //     'heartRateVariabilityData', allowing the data to persist locally in the device storage.
      //     The data is stringified before storing because AsyncStorage can only store strings.
      await AsyncStorage.setItem(
        'heartRateVariabilityData',
        JSON.stringify(response),
      )

      // 11. Returns the fetched response. In the context of createAsyncThunk,
      //     this data will be used as the payload of the fulfilled action.
      return response
    } catch (error) {
      // 12. Catches any errors that occur during the try block execution.

      // 13. If an error occurs, this line executes to return a rejected action with the error message.
      //     The rejectWithValue function allows for a custom payload (here, the error message) to be returned.
      return rejectWithValue(error.toString())
    }
  },
)

// 1. Define an asynchronous Redux Thunk using createAsyncThunk utility from Redux Toolkit.
export const loadHeartRateVariabilityData = createAsyncThunk(
  // 2. Specifies the action type string for this Thunk. It's used by Redux to handle
  //    and track the lifecycle of this async action throughout the app.
  'heartRateVariability/loadData',

  // 3. The payload creator function, where the async operation is defined.
  //    The first argument is traditionally the payload this Thunk would receive when dispatched,
  //    but it's not used here (hence the underscore).
  async (
    _,

    // 4. ThunkAPI object destructured to use the dispatch function,
    //    allowing this Thunk to dispatch other actions.
    {dispatch},
  ) => {
    try {
      // 5. Begins a try block to attempt the async operation within a safe context.

      // 6. Tries to retrieve the 'heartRateVariabilityData' item from AsyncStorage,
      //    which is an asynchronous operation.
      const savedData = await AsyncStorage.getItem('heartRateVariabilityData')

      // 7. Logs the retrieved stringified data for debugging purposes.
      console.log('Saved heart rate variability data:', savedData)

      // 8. Checks if the savedData is not null or undefined.
      if (savedData) {
        // 9. If there is saved data, dispatches an action (setHeartRateVariabilityData)
        //    to update the Redux state with the loaded data.
        //    The stringified saved data is parsed into a JavaScript object before dispatching.
        dispatch(setHeartRateVariabilityData(JSON.parse(savedData)))
      }
    } catch (error) {
      // 10. Catches any errors that occur while attempting to load or parse the saved data.

      // 11. Logs the error to the console if the try block fails, indicating an issue
      //     with loading the data from AsyncStorage.
      console.error(
        'Failed to load heart rate variability data from AsyncStorage:',
        error,
      )
    }
  },
)

// 1. Defines an asynchronous Redux thunk action creator using Redux Toolkit's createAsyncThunk utility.
//    This function is designed to send heart rate variability data to some backend service or database.
export const sendHeartRateVariabilityData = createAsyncThunk(
  // 2. Specifies the action type string for this thunk. Redux Toolkit uses this to handle
  //    the lifecycle of the thunk (pending, fulfilled, rejected states).
  'heartRateVariability/sendHeartRateVariabilityData',

  // 3. The payload creator function where the async operation is defined.
  //    This function is marked as async, indicating it contains asynchronous operations.
  async (
    // 4. The first argument is the heart rate variability data that this thunk will send.
    //    The type HeartRateVariabilityState suggests it includes all necessary HRV data.
    heartRateVariabilityData: HeartRateVariabilityState,

    // 5. The second argument destructures the thunkAPI object to extract the rejectWithValue function.
    //    This function is used to manually reject the promise with a customized error payload.
    {rejectWithValue},
  ) => {
    try {
      // 6. Begins a try block to catch any errors from the asynchronous operations within.

      // 7. Calls a service function to send the heart rate variability data to a backend or service.
      //    The function is awaited to pause execution until the promise settles.
      const response =
        await HeartRateVariabilityService.sendHeartRateVariabilityData(
          heartRateVariabilityData,
        )

      // 8. Logs a success message to the console along with the response from the service call.
      //    This is useful for debugging and confirming successful data transmission.
      console.log(
        'Heart rate variability data was sent successfully:',
        response,
      )

      // Note: There's no explicit return statement for a successful operation,
      // which means the thunk would resolve with an undefined payload in the successful case.
    } catch (error) {
      // 9. Catches any errors thrown during the try block execution.

      // 10. If an error occurs, this line uses rejectWithValue to return a rejected action
      //     with the error message as the payload, allowing customized error handling in reducers.
      return rejectWithValue(error.toString())
    }
  },
)

export const fetchAllHeartRateVariabilityData = createAsyncThunk(
  'heartRateVariability/fetchAllData',
  async (_, thunkAPI) => {
    try {
      const allData =
        await HeartRateVariabilityService.fetchAllHeartRateVariabilityData()
      await AsyncStorage.setItem(
        'allHeartRateVariabilityData',
        JSON.stringify(allData),
      )
      thunkAPI.dispatch(
        updateFavoriteData({
          key: 'Heart Rate Variability',
          newData: allData,
        }),
      )
      return allData
    } catch (error) {
      console.error('Error fetching all heart rate variability data:', error)
      return thunkAPI.rejectWithValue(error.toString())
    }
  },
)

const heartRateVariabilitySlice = createSlice({
  name: 'heartRateVariability',
  initialState,
  reducers: {
    setHeartRateVariabilityData: (
      state,
      action: PayloadAction<HeartRateVariabilityState>,
    ) => {
      return {...state, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeartRateVariabilityData.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchHeartRateVariabilityData.fulfilled,
        (state, action: PayloadAction<HeartRateVariabilityResponse>) => {
          state.loading = false
          state.today = action.payload.today ?? state.today
          state.yesterday = action.payload.yesterday ?? state.yesterday
          state.weekly = action.payload.weekly ?? state.weekly
          state.weeklyTrend = action.payload.weeklyTrend ?? state.weeklyTrend
          state.monthly = action.payload.monthly ?? state.monthly
          state.monthlyTrend =
            action.payload.monthlyTrend ?? state.monthlyTrend
          state.dailyTrend = action.payload.dailyTrend ?? state.dailyTrend
          state.lastRecorded =
            action.payload.lastRecorded ?? state.lastRecorded
        },
      )
      // Handle rejected state for fetching HRV data
      .addCase(fetchHeartRateVariabilityData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(fetchAllHeartRateVariabilityData.fulfilled, (state, action) => {
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
          dailyTrend,
        } = action.payload

        state.today = today
        state.yesterday = yesterday
        state.weekly = weekly
        state.weeklyTrend = weeklyTrend
        state.monthly = monthly
        state.monthlyTrend = monthlyTrend
        state.lastRecorded = lastRecorded
        state.dailyTrend = dailyTrend

        state.loading = false
      })
      .addCase(fetchAllHeartRateVariabilityData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(sendHeartRateVariabilityData.pending, state => {
        state.loading = true
      })
      .addCase(sendHeartRateVariabilityData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendHeartRateVariabilityData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export const {setHeartRateVariabilityData} = heartRateVariabilitySlice.actions
export default heartRateVariabilitySlice.reducer
