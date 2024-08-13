import {AuthenticationService} from '../../api/services'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {OnHandleFirebaseMessageError} from '../../_constants/authInfo'
import {AuthInitialState, AuthUserInput} from '../../model/authentication'
import {AuthCredentialResponse} from '../../model/authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'
import crashlytics from '@react-native-firebase/crashlytics'

const initialState: AuthInitialState = {
  credentials: undefined,
  authenticationLoading: false,
  error: {
    code: '',
    message: '',
  },
}

export const onSignIn = createAsyncThunk(
  'auth/signIn',
  async (signInInput: AuthUserInput, {rejectWithValue}) => {
    const {email, password} = signInInput
    try {
      const response = await AuthenticationService.signIn(email, password)
      crashlytics().log('User logged in')
      return response.credentials
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

export const onSignInWithCredential = createAsyncThunk(
  'auth/signInWithCredential',
  async (credential: AuthCredentialResponse, {rejectWithValue}) => {
    try {
      const response = await AuthenticationService.signInWithCredential(
        credential,
      )
      return response.credentials
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

export const onSignOut = createAsyncThunk('auth/signOut', async () => {
  try {
    crashlytics().log('User logged out')
    await AuthenticationService.logout()
  } catch (error: any) {
    crashlytics().recordError(error)
    console.log('SIGN OUT', error)
  }
})

export const onSignUp = createAsyncThunk(
  'auth/signUp',
  async (signInInput: AuthUserInput, {rejectWithValue}) => {
    const {email, password} = signInInput
    try {
      const response = await AuthenticationService.signUp(email, password)
      return response.credentials
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

export const onUpdatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (updatePasswordInput: string, {rejectWithValue}) => {
    const password = updatePasswordInput
    try {
      const response = await AuthenticationService.updatePassword(password)
      return response.credentials
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

export const onResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AuthenticationService.resetPassword(email)
      return response
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

export const onUpdateEmail = createAsyncThunk(
  'auth/updateEmail',
  async (updateEmailInput: string, {rejectWithValue}) => {
    const email = updateEmailInput
    try {
      const response = await AuthenticationService.updateEmail(email)
      return response.credentials
    } catch (error: any) {
      crashlytics().recordError(error)
      const message = OnHandleFirebaseMessageError(error.code)
      return rejectWithValue({code: error.code, message})
    }
  },
)

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(onSignIn.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onSignIn.fulfilled, (state, action) => {
      state.credentials = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onSignIn.rejected, (state, action) => {
      state.error = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onSignInWithCredential.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onSignInWithCredential.fulfilled, (state, action) => {
      state.credentials = action.payload
      AsyncStorage.setItem(
        'UserCredentials',
        JSON.stringify(action.payload?.user),
      )
      state.authenticationLoading = false
    })
    builder.addCase(onSignInWithCredential.rejected, (state, action) => {
      state.error = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onSignOut.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onSignOut.fulfilled, state => {
      AsyncStorage.removeItem('UserCredentials')
      state.credentials = undefined
      state.authenticationLoading = false
    })
    builder.addCase(onSignOut.rejected, state => {
      state.authenticationLoading = false
    })
    builder.addCase(onSignUp.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onSignUp.fulfilled, (state, action) => {
      state.credentials = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onSignUp.rejected, state => {
      state.authenticationLoading = false
    })
    builder.addCase(onUpdatePassword.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onUpdatePassword.fulfilled, (state, action) => {
      state.credentials = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onResetPassword.fulfilled, (state, action) => {
      state.authenticationLoading = false
    })
    builder.addCase(onUpdatePassword.rejected, (state, action) => {
      state.error = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onUpdateEmail.pending, state => {
      state.authenticationLoading = true
    })
    builder.addCase(onUpdateEmail.fulfilled, (state, action) => {
      state.credentials = action.payload
      state.authenticationLoading = false
    })
    builder.addCase(onUpdateEmail.rejected, (state, action) => {
      state.error = action.payload
      state.authenticationLoading = false
    })
  },
})

export default authSlice.reducer
