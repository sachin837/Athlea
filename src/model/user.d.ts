import {FirebaseAuthTypes} from '@react-native-firebase/auth'

enum SEX_EMUM {
  MALE = 'male',
  FEMALE = 'famale',
  OTHERT = 'other',
}

type sexType = 'male' | 'famale' | 'other';

export type AuthUserResponse = FirebaseAuthTypes.User;

export interface UserIntoResponse {
  displayName: string;
  email: string;
  password: `${SEX_EMUM}`;
}
export interface UserInput {
  displayName: string;
}

export interface InitialAccountDataState {
  accountData: UserIntoResponse;
  userErrors: Errors;
  userLoading: boolean;
}
