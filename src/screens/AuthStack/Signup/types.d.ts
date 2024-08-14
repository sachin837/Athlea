import {FormikHandlers, FormikState, FormikComputedProps} from 'formik';

type DisplayName = string;
type Email = string;
type Password = string;

type FormikTypes = FormikHandlers &
  FormikState<{email: Email; password: Password; displayName: DisplayName; repeatPassword:Password}> &
  FormikComputedProps<{
    email: Email;
    password: Password;
    displayName: DisplayName;
    repeatPassword:Password;
  }>;

type DataTypes = {
  repeatPassword: Password;
  email: Email;
  password: Password;
  displayName: DisplayName;
};
 type ErrorType = {
  email: Email;
  password: Password;
  repeatPassword: Password;
}
