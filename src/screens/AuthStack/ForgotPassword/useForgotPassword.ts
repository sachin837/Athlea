import {useState} from 'react'
import {useFormik} from 'formik'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {AuthErrorResponse} from '../../../model/authentication'
import {onResetPassword, useAppDispatch} from '../../../store'
import {DataTypes, FormikTypes} from './types'
import {RouteNames, ValidationSchemes} from '../../../_constants'
import { Alert } from 'react-native'

export const useForgotPassword = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [isSubmitPress, setIsSubmitPress] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<DataTypes>({
    email: '',
  })


  const forgotPasswordErrorHandeling = (
    errorResponse: AuthErrorResponse,
    email: string,
  ) => {
    console.log('🚀 ~ useForgotPassword ~ errorResponse:', errorResponse)
    if (errorResponse?.code === 'auth/email-already-in-use') {
      // navigation.navigate('AccountError', {
      //   errorStatus: 'accountExist',
      //   email,
      // })
      return
    } else {
      setErrorMessage({
        email: '',
      })
    }
  }

  const onSubmit = async (data: DataTypes) => {
    if (!data.email) {return}
    setIsSubmitPress(true)
    dispatch(onResetPassword(data))
      .then(response => {
        const result = response as any
        if (onResetPassword.fulfilled.match(result)) {
          Alert.alert('', 'Password reset link has been sent to your email.', [
            {text: 'OK', onPress: () => navigation.navigate(RouteNames.login)},
          ])
        } else {
          forgotPasswordErrorHandeling(result.payload, data.email)
        }
      })
      .catch(error => {
        forgotPasswordErrorHandeling(error.payload, data.email)
      })
      .finally(() => {
        setIsSubmitPress(false)
      })
  }

  const onValidate = (values:DataTypes) => {
    const errors: DataTypes = errorMessage
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
    setErrorMessage(errors)
    return result
  }

  const formik: FormikTypes = useFormik({
    initialValues: {email: ''},
    validationSchema: ValidationSchemes.ForgotPasswordSchema,
    validate: (values) => onValidate(values),
    initialErrors: {
      email: errorMessage.email,
    },
    onSubmit: data => onSubmit(data),
  })
  return {
    formik,
    errorMessage,
    isSubmitPress,
  }
}
