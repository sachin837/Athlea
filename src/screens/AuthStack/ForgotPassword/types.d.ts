import {FormikHandlers, FormikState, FormikComputedProps} from 'formik';

type Email = string;

type FormikTypes = FormikHandlers &
  FormikState<{email: Email;}> &
  FormikComputedProps<{
    email: Email;
  }>;

type DataTypes = {
  email: Email;
};
