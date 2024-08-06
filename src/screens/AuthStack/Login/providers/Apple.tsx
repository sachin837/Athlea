// import React from 'react';
// import auth from '@react-native-firebase/auth';
// import {appleAuth} from '@invertase/react-native-apple-authentication';
// import Button from '../../../components/button';
// import {onSignInWithCredential} from '../../../store/authentication';
// import {onUpdateUserData} from '../../../store/user';
// import { store } from '../../../store/reducers';

// const onSignIn = async () => {
//   try {
//     // Start the sign-in request
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     // Ensure Apple returned a user identityToken
//     if (!appleAuthRequestResponse.identityToken) {
//       throw new Error('Apple Sign-In failed - no identify token returned');
//     }

//     // Create a Firebase credential from the response
//     const {identityToken, nonce} = appleAuthRequestResponse;
//     const appleCredential = auth.AppleAuthProvider.credential(
//       identityToken,
//       nonce,
//     );
//     // Sign the user in with the credential
//     await store.dispatch(onSignInWithCredential(appleCredential));
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const AppleButton: React.FC<{label: string}> = ({label}) => {
//   return <Button text={label} type="apple" onPress={() => onSignIn()} />;
// };
