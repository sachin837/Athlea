import { FormikHandlers, FormikState, FormikComputedProps } from "formik";

type Email = string;
type Password = string;
type DisplayName = string;

type FormikTypes = FormikHandlers &
  FormikState<{ email: Email; password: Password; displayName?: DisplayName }> &
  FormikComputedProps<{
    email: Email;
    password: Password;
    displayName?: DisplayName;
  }>;

export type DataTypes = {
  email: Email;
  password: Password;
  displayName?: DisplayName;
};
