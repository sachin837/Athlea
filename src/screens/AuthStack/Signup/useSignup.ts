import {useState} from 'react'
import {useFormik} from 'formik'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {AuthErrorResponse} from '../../../model/authentication'
import {onSignInWithCredential, onSignUp, store, useAppDispatch, useAppSelector} from '../../../store'
import {DataTypes, Email, ErrorType, FormikTypes, Password} from './types'
import {RouteNames, ValidationSchemes} from '../../../_constants'

export const useSignup = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [isSubmitPress, setIsSubmitPress] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<ErrorType>({
    email: '',
    password: '',
    repeatPassword: '',
  })
  
  const {authenticationLoading} = useAppSelector(state => state.auth)

  const signUpErrorHandeling = (
    errorResponse: AuthErrorResponse,
    email: string,
  ) => {
    if (errorResponse?.code === 'auth/email-already-in-use') {
      navigation.navigate('AccountError', {
        errorStatus: 'accountExist',
        email,
      })
      return
    } else {
      setErrorMessage({
        email: '',
        password: errorResponse?.message,
      })
    }
  }
  const onValidate = (values:DataTypes) => {
    const errors: ErrorType = errorMessage
    let result = true
    if (!values.email) {
      errors.email = ' '
      result = false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      result = false
      errors.email = 'Invalid email address'
    } else {
      result = true
      errors.email = ''
    }
    if (!values.password) {
      result = false
      errors.password = ' '
    } else if (values.password.length < 8) {
      result = false
      errors.password = 'Password must be at least 8 characters'
    } else {
      result = true
      errors.password = ''
    }
    if (!values.repeatPassword) {
      result = false
      errors.repeatPassword = ' '
    } else if (values.repeatPassword !== values.password) {
      result = false
      errors.repeatPassword = 'Password and repeat password do not match'
    } else {
      result = true
      errors.repeatPassword = ''
    }
    setErrorMessage(errors)
    return result
  }
  const onSubmit = async (data: DataTypes) => {
    if (onValidate(data)) {
      setIsSubmitPress(true)
      dispatch(onSignUp(data))
        .then(response => {
          const result = response as any
          if (onSignUp.fulfilled.match(result)) {
            navigation.navigate(RouteNames.onboarding)
          } else {
            signUpErrorHandeling(result.payload, data.email)
          }
        })
        .catch(error => {
          signUpErrorHandeling(error.payload, data.email)
          console.log("🚀 ~ onSubmit ~ error:", error)
        })
        .finally(() => {
          setIsSubmitPress(false)
        })
    }
  }


  const formik: FormikTypes = useFormik({
    initialValues: {email: '', password: '', repeatPassword: ''},
    validationSchema: ValidationSchemes.PersonalDetailSchema,
    initialErrors: {
      email: errorMessage.email,
      password: errorMessage.password,
      repeatPassword: errorMessage.repeatPassword,
    },
    validate: (values) => onValidate(values),
    onSubmit: data => onSubmit(data),
  })

  const onSignIn = async () => {
    const {idToken} = await GoogleSignin.signIn()
    const credentials = auth.GoogleAuthProvider.credential(idToken)
    await store.dispatch(onSignInWithCredential(credentials))
  }

  return {
    formik,
    onSignIn,
    errorMessage,
    isSubmitPress,
  }
}
