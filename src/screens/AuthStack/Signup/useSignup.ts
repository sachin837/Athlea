import {useState} from 'react'
import {useFormik} from 'formik'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {AuthErrorResponse} from '../../../model/authentication'
import {onSignInWithCredential, onSignUp, store, useAppDispatch, useAppSelector} from '../../../store'
import {DataTypes, Email, FormikTypes, Password} from './types'
import {RouteNames, ValidationSchemes} from '../../../_constants'

export const useSignup = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [isSubmitPress, setIsSubmitPress] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<{
    email: Email;
    password: Password;
    repeatPassword: Password;
  }>({
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

  const onSubmit = async (data: DataTypes) => {
    setIsSubmitPress(true)
    dispatch(onSignUp(data))
      .then(response => {
        const result = response as any
        if (onSignUp.fulfilled.match(result)) {
          navigation.replace(RouteNames.onboarding)
        } else {
          signUpErrorHandeling(result.payload, data.email)
        }
      })
      .catch(error => {
        signUpErrorHandeling(error.payload, data.email)
      })
      .finally(() => {
        setIsSubmitPress(false)
      })
  }

  const onValidate = () => {
    if (errorMessage?.email !== '' || errorMessage?.password !== '' || errorMessage?.repeatPassword !== '') {
      setErrorMessage({
        email: '',
        password: '',
        repeatPassword: '',
      })
    }
  }

  const formik: FormikTypes = useFormik({
    initialValues: {email: '', password: '', repeatPassword: ''},
    validationSchema: ValidationSchemes.PersonalDetailSchema,
    validate: () => onValidate(),
    initialErrors: {
      email: errorMessage.email,
      password: errorMessage.password,
      repeatPassword: errorMessage.repeatPassword,
    },
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
