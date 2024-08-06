import * as Yup from 'yup'
import {StrongPasswordValidation} from '../../utils'

export const PersonalDetailsSchema = Yup.object().shape({
  email: Yup.string()
    .label('email')
    .trim()
    .email('Please enter a valid email address')
    .required('This is a required field'),
  password: Yup.string()
    .label('password')
    .trim()
    .required('This is a required field')
    .min(8, 'Password must contain at least 8 characters')
    .test('validator-password-value', (value, {createError}) => {
      const errorMessage = value && StrongPasswordValidation(value)
      if (errorMessage) {
        return createError({
          message: errorMessage,
          path: 'password',
        })
      }
      return true
    }),
})
