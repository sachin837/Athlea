import {useContext, useState} from 'react'
import {DataTypes, Email, FormikTypes, Password} from './types'
import {useFormik} from 'formik'
import {ValidationSchema} from './LoginSchema'
import {onSignIn, useAppDispatch, useAppSelector} from '../../../store'
import {AuthContext} from '../../../utils'
import {useNavigation} from '@react-navigation/native'
import {RouteNames, ValidationSchemes} from '../../../_constants'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import {onSignInWithCredential, store} from 'store'

export const useLogin = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const authContext = useContext(AuthContext)
  const {authenticationLoading} = useAppSelector(state => state.auth)
  const [loading ,setLoading ] = useState(false)

  const [errorMessage, setErrorMessage] = useState<{
    email: Email;
    password: Password;
  }>({
    email: '',
    password: '',
  })

  const goToUserProfile = () => {
    return navigation.navigate('RiderDetails')
  }

  const loginErrorHandeling = (errorResponse) => {
    switch (errorResponse?.code) {
    case 'auth/wrong-password':
      setErrorMessage({
        email: '',
        password: errorResponse.message,
      })
      break
    default:
      setErrorMessage({
        email: errorResponse.message,
        password: errorResponse.message,
      })
      break
    }
  }

  const onSubmit = async (data: DataTypes) => {
    setLoading(true)
    dispatch(onSignIn(data))
      .then(response => {
        const result = response as any
        if (result.error) {
          loginErrorHandeling(result.payload)
        } else {
          authContext.dispatch('login')
          navigation.navigate(RouteNames.homeTabs)
        }
      })
      .catch(error => {
        loginErrorHandeling(error.payload)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onValidate = () => {
    if (errorMessage?.email !== '' || errorMessage?.password !== '') {
      setErrorMessage({
        email: '',
        password: '',
      })
    }
  }

  const formik: FormikTypes = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: ValidationSchemes.Login,
    validate: () => onValidate(),
    initialErrors: {
      email: errorMessage.email,
      password: errorMessage.password,
    },
    onSubmit: data => onSubmit(data),
  })
  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const {idToken} = await GoogleSignin.signIn()
      const credentials = auth.GoogleAuthProvider.credential(idToken)
      await store.dispatch(onSignInWithCredential(credentials))
      authContext.dispatch('login')
      navigation.navigate(RouteNames.homeTabs)
    } catch (error) {
      switch (error.code) {
      case 'DEVELOPER_ERROR':
        console.error('Developer error, check your settings:', error)
        break
      case 'NETWORK_ERROR':
        console.error(
          'Network error, check your internet connection:',
          error,
        )
        break
      case 'SIGN_IN_CANCELLED':
        console.error('Sign-in cancelled by user:', error)
        break
      case 'PLAY_SERVICES_NOT_AVAILABLE':
        console.error(
          'Google Play services not available or outdated:',
          error,
        )
        break
      case 'ERROR_ACCOUNT_NOT_FOUND':
        console.error('No Google account found on the device:', error)
        break
      case 'ERROR_INVALID_CREDENTIAL':
        console.error('Invalid credentials:', error)
        break
      default:
        console.error('Error signing in with Google:', error)
      }
    }
  }
  return {
    formik,
    loading,
    onGoogleSignIn,
  }
}
