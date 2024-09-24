import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {UserService} from '../../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DomainProfile {
  [key: string]: string | number | undefined;
}

export interface TrainingProfile {
  [key: string]: DomainProfile | undefined;
  cycling?: DomainProfile;
  running?: DomainProfile;
  nutrition?: DomainProfile;
  strength?: DomainProfile;
  general?: DomainProfile;
}

export interface User {
  user_id: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
  training_profile: TrainingProfile;
  dateAdded?: string;
}

interface UserState {
  userData: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: {
    user_id: '',
    email: '',
    family_name: '',
    given_name: '',
    picture: '',
    training_profile: {},
    dateAdded: '',
  },
  loading: false,
  error: null,
}

export const onDeleteUserData = createAsyncThunk(
  'user/deleteUserData',
  async (user, {rejectWithValue}) => {
    const response = await UserService.deleteUserData(user.uid)
    return response?.errors[0]?.message
      ? rejectWithValue(response?.errors[0]?.message)
      : response?.data
  },
)

export const onRefreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (user, {rejectWithValue}) => {
    try {
      const token = await user.getIdToken(true)
      await AsyncStorage.setItem('accessToken', token)
      const storedToken = await AsyncStorage.getItem('accessToken')
      console.log('Stored token:', storedToken)
      await AsyncStorage.setItem('uid', user.uid)
      return {success: true}
    } catch (err) {
      console.error('Error creating new accessToken:', err)
      // Use `rejectWithValue` to return a custom error payload
      return rejectWithValue({success: false, error: err})
    }
  },
)


export const onFetchUserData = createAsyncThunk(
  'user/setAccountData',
  async (user, {rejectWithValue}) => {
    try {
      const data = await UserService.getUserData(user.uid)

      console.log('Data in onFetchUserData:', data)

      // If data is null or undefined, it implies something went wrong
      if (!data) {
        throw new Error('Invalid data')
      }

      // No need to use response.data since the HttpClient is set to return response.data directly
      return data // Use the data directly
    } catch (error) {
      console.error('Error in onFetchUserData:', error)
      return rejectWithValue(error.message)
    }
  },
)

export const onUpdateUserData = createAsyncThunk(
  'user/updateAccountData',
  async (userInput: IUserInput, {getState, rejectWithValue}) => {
    const state = getState()
    const uid = state?.authUser?.user?.uid
    const response = await UserService.updateUserData({
      uid,
      userInput,
    })

    console.log('Response:', response)
    return response?.errors[0]?.message
      ? rejectWithValue(response?.errors[0]?.message)
      : response?.data
  },
)
// Thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'userData/fetchUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue('Failed to fetch user data')
    }
  },
)

export const refetchTrainingProfile = createAsyncThunk(
  'userData/refetchTrainingProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${userId}`)
      return response.data.training_profile
    } catch (error) {
      return rejectWithValue('Failed to fetch updated training profile')
    }
  },
)


const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addUserData(state, action: PayloadAction<Record<string, any>>) {
      state.userData = { ...state.userData, ...action.payload }
    },
    removeFromTrainingProfile(
      state,
      action: PayloadAction<{ domain: string; key: string }>,
    ) {
      const { domain, key } = action.payload
      if (state.userData.training_profile[domain]) {
        delete state.userData.training_profile[domain]?.[key]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.userData = action.payload // Ensure this is the full user object
          state.loading = false
        },
      )
      .addCase(
        refetchTrainingProfile.fulfilled,
        (state, action: PayloadAction<TrainingProfile>) => {
          state.userData.training_profile = action.payload
        },
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addUserData, removeFromTrainingProfile } = userSlice.actions
export default userSlice.reducer
export type { UserState }
