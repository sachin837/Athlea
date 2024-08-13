import {createAsyncThunk} from '@reduxjs/toolkit'
import {UserService} from '../../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
