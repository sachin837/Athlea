import {createSlice} from '@reduxjs/toolkit'
import {onDeleteUserData, onFetchUserData, onUpdateUserData} from './action.ts'

const initialUserState = {
  displayName: '',
  email: '',
  password: '',
}

const initialAccountDataState = {
  accountData: initialUserState,
  userLoading: false,
  userErrors: {
    status: false,
    message: '',
  },
}

const userFromAccountData = createSlice({
  name: 'userFromAccountData',
  initialState: initialAccountDataState,
  reducers: {
    resetAccountData: () => initialAccountDataState,
  },
  extraReducers: builder => {
    builder.addCase(onFetchUserData.pending, state => {
      state.userLoading = true
    })
    builder.addCase(onFetchUserData.fulfilled, (state, action) => {
      console.log('Payload on fulfilled:', action.payload)
      state.accountData = action.payload
      state.userLoading = false
    })
    builder.addCase(onFetchUserData.rejected, state => {
      state.userLoading = false
    })
    builder.addCase(onUpdateUserData.pending, state => {
      state.userLoading = true
    })
    builder.addCase(onUpdateUserData.fulfilled, (state, action) => {
      state.accountData = action.payload
      state.userLoading = false
    })
    builder.addCase(onUpdateUserData.rejected, (state, action) => {
      state.userLoading = false
      state.userErrors.status = true
      state.userErrors.message = action.payload
    })
    builder.addCase(onDeleteUserData.pending, state => {
      state.userLoading = true
    })
    builder.addCase(onDeleteUserData.fulfilled, state => {
      state.accountData = initialUserState
      state.userLoading = false
    })
    builder.addCase(onDeleteUserData.rejected, state => {
      state.userLoading = false
    })
  },
})

export const {resetAccountData} = userFromAccountData.actions
export default userFromAccountData.reducer
