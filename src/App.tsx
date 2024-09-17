import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DeviceOrientationProvider} from './contexts/DeviceOrientationContext';
import {NotificationsProvider} from './contexts/NotificationsContext';
import {
  RootNavigator,
  homeNavigationRef,
  tabNavigationRef,
} from './navigation/rootNavigator';
import theme from './theme';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {onRefreshToken, store} from 'store';
import {FilterProvider} from './contexts/FilterContext';
import {SwipeProvider} from './contexts/SwipeContext';
import {AdditionalResponsesProvider} from './contexts/AdditonalResponseContext';
import {InputProvider} from './contexts/InputContext';
import {LoadingProvider} from './contexts/LoadingContext';
import {ModalProvider} from './contexts/ModalContext';
import Toast from 'react-native-toast-message';
import NotificationListener from './components/legacy/notifications/NotificationListener';
import CustomToast from './components/legacy/customToast';
import {TimeSelectorProvider} from './contexts/TimeSelectorContext';
import {onFetchUserData} from './store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationService} from './api/services';
import {AuthContext} from 'utils';
import crashlytics from '@react-native-firebase/crashlytics';
import {setUserDataFromAuth} from './store/user/authUser';
import {AuthUserResponse} from './model/user';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {UserThemeProvider, useThemes} from './contexts/ThemeContext';

const toastConfig = {
  custom: props => <CustomToast {...props} />,
  recovery: props => <CustomToast {...props} />,
  nutrition: props => <CustomToast {...props} />,
  wellbeing: props => <CustomToast {...props} />,
  strength: props => <CustomToast {...props} />,
  endurance: props => <CustomToast {...props} />,
  apple: props => <CustomToast {...props} />,
  garmin: props => <CustomToast {...props} />,
};

interface AuthContextProps {
  dispatch: (action: AuthAction) => void;
}

function App() {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('unknown');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permissions, setPermissions] = useState({});

  const onAuthState = async (userData: AuthUserResponse) => {
    try {
      if (userData) {
        crashlytics().setUserId(userData.uid);

        // Set user data
        store.dispatch(setUserDataFromAuth(userData));

        // Refresh API token in case expired
        await store.dispatch(onRefreshToken(userData));

        // GET user via API
        const resultAction = await store.dispatch(onFetchUserData(userData));

        if (onFetchUserData.fulfilled.match(resultAction)) {
          const isNewUser = Boolean(
            !resultAction.payload && !resultAction.payload?.displayName,
          );

          if (userData?.providerData?.length) {
            const [userProviderData] = userData?.providerData;
            // isLoggedInByEmail used to determine which settings to allow (change email, change password)
            await AsyncStorage.setItem(
              'isLoggedInByEmail',
              String(userProviderData?.providerId === 'password'),
            );
          }

          await AsyncStorage.setItem('userEmail', String(userData?.email));
          const isRegistered = await AsyncStorage.getItem('registered');

          // Start account setup
          if (isNewUser) {
            setLoginStatus('noAccount');
          }

          if (!isNewUser && !Boolean(isRegistered)) {
            setLoginStatus('authenticated');
          }

          setIsLoading(false);
        }
      } else {
        await AsyncStorage.removeItem('accessToken');
        setLoginStatus('unknown');
        setInitializing(!initializing);
        setIsLoading(false);
      }
    } catch (err: any) {
      crashlytics().recordError(err);
      console.error(err);
    }
  };
  // Function to fetch health data
  useEffect(() => {
    const subscriber = AuthenticationService.AuthStateChanged(onAuthState);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContext: AuthContextProps = {
    dispatch: async (action: AuthAction) => {
      switch (action) {
      case 'wakeUp':
        break;
      case 'paired':
      case 'registered':
        setLoginStatus('registered');
        break;
      case 'login':
        setLoginStatus('authenticated');
        break;
      case 'reset':
        setLoginStatus('unknown');
        break;
      }
    },
  };
  return (
    <Provider store={store}>
      <KeyboardProvider>
        <UserThemeProvider>
          <ModalProvider>
            <InputProvider>
              <SwipeProvider>
                <TimeSelectorProvider>
                  <AdditionalResponsesProvider>
                    <GestureHandlerRootView style={{flex: 1}}>
                      <FilterProvider>
                        <DeviceOrientationProvider>
                          <BottomSheetModalProvider>
                            <NotificationsProvider>
                              <LoadingProvider>
                                <AuthContext.Provider value={authContext}>
                                  <DeviceOrientationProvider>
                                    <RootNavigator loginStatus={loginStatus} />
                                    <NotificationListener />
                                    <Toast config={toastConfig} />
                                  </DeviceOrientationProvider>
                                </AuthContext.Provider>
                              </LoadingProvider>
                            </NotificationsProvider>
                          </BottomSheetModalProvider>
                        </DeviceOrientationProvider>
                      </FilterProvider>
                    </GestureHandlerRootView>
                  </AdditionalResponsesProvider>
                </TimeSelectorProvider>
              </SwipeProvider>
            </InputProvider>
          </ModalProvider>
        </UserThemeProvider>
      </KeyboardProvider>
    </Provider>
  );
}

let AppEntryPoint = App;

//to launch story view uncomment line below
// if (process.env.STORYBOOK_ENABLED) {
//   AppEntryPoint = require("./.ondevice").default;
// }

export default AppEntryPoint;
