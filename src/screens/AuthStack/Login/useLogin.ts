import {useContext, useState} from 'react'
import {DataTypes, Email, FormikTypes, Password} from './types'
import {useFormik} from 'formik'
import {ValidationSchema} from './LoginSchema'
import {onSignIn, useAppDispatch, useAppSelector} from '../../../store'
import {AuthContext} from '../../../utils'
import {useNavigation} from '@react-navigation/native'
import {RouteNames, ValidationSchemes} from '../../../_constants'


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
          authContext.dispatch('registered')
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

  return {
    formik,
    loading,
  }
}
