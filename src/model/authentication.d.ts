import {FirebaseAuthTypes} from '@react-native-firebase/auth'

export interface AuthUserInput {
  email: string;
  password: string;
  displayName?: string;
}

export type AuthUserCredentialResponse = FirebaseAuthTypes.UserCredential;
export type AuthCredentialResponse = FirebaseAuthTypes.AuthCredential;
export interface AuthErrorResponse {
  code: string;
  message: string;
}

export interface AuthInitialState {
  credentials?: AuthCredentialResponse;
  authenticationLoading: boolean;
  error: AuthErrorResponse;
}
