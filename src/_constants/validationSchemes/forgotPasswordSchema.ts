import * as Yup from 'yup'

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .label('email')
    .email('Please enter a valid email address')
    .required('This is a required field'),
})
