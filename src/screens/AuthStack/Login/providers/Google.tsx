import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {onSignInWithCredential} from '../../../store/authentication';
import { store } from '../../../store';
import Button from '../../../components/button';

const onSignIn = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const credentials = auth.GoogleAuthProvider.credential(idToken);
  await store.dispatch(onSignInWithCredential(credentials));
};

export const GoogleButton: React.FC<{label: string}> = ({label}) => {
  return <Button text={label} type="google" onPress={onSignIn} />;
};
