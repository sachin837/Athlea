import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IAuthUserResponse} from '../../model/user'
import AsyncStorage from '@react-native-async-storage/async-storage'



const userDataFromAuthSlice = createSlice({
  name: 'userDataFromAuth',
  initialState: {
    user: {},
    userAuthLoading: false,
  },
  reducers: {
    setUserDataFromAuth(state, action: PayloadAction<IAuthUserResponse>) {
      if (action.payload) {
        state.user = action.payload
      }
    },
  },
})

export const {setUserDataFromAuth} = userDataFromAuthSlice.actions
export default userDataFromAuthSlice.reducer
