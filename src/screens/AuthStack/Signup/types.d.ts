import {FormikHandlers, FormikState, FormikComputedProps} from 'formik';

type DisplayName = string;
type Email = string;
type Password = string;

type FormikTypes = FormikHandlers &
  FormikState<{email: Email; password: Password; displayName: DisplayName}> &
  FormikComputedProps<{
    email: Email;
    password: Password;
    displayName: DisplayName;
  }>;

type DataTypes = {
  email: Email;
  password: Password;
  displayName: DisplayName;
};
