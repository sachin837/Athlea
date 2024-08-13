import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .label('email')
    .email('Please enter a valid email address')
    .required('This is a required field'),
  password: Yup.string().label('password').required('This is a required field'),
})
