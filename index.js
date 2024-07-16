/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {initializeApp, getApps} from '@react-native-firebase/app';
import firebaseConfig from './src/config/firebaseConfig.ios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

GoogleSignin.configure({
  webClientId:
    '422028132636-s4gsjrpsmp1n54d6ac2rm6utbm6ce4v4.apps.googleusercontent.com',
});

// Check for Google Play Services before initializing the app
async function checkGooglePlayServices() {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    console.log('Google Play Services are available.');
  } catch (err) {
    console.error('Play services are not available', err);
  }
}

// Execute the Play Services check
checkGooglePlayServices();

AppRegistry.registerComponent(appName, () => App);
