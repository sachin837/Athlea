import React, {useCallback} from 'react'
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useTheme, DefaultTheme} from 'styled-components/native'
import {BackButton} from './components/headerLeft'
import {View} from 'react-native'

const Stack = createNativeStackNavigator<NavigatorParameters>()
export const onboardingNavigationRef = createNavigationContainerRef()

export interface Props {
  loginStatus: LoginStatus;
}

export const OnboardingNavigator: React.FC<Props> = ({loginStatus}) => {
  const theme: DefaultTheme = useTheme()

  const renderLoginBackButton = useCallback(
    (
      navigation: NavigationProp<NavigatorParameters, 'Login'>,
      route: RouteProp<NavigatorParameters, 'Login'>,
    ) => <BackButton navigation={navigation} route={route} />,
    [],
  )

  const renderSignupBackButton = useCallback(
    (
      navigation: NavigationProp<NavigatorParameters, 'Signup'>,
      route: RouteProp<NavigatorParameters, 'Signup'>,
    ) => <BackButton navigation={navigation} route={route} />,
    [],
  )

  console.log('loginStatus', loginStatus)

  return (
    <NavigationContainer ref={onboardingNavigationRef}>
      <Stack.Navigator
        initialRouteName={'Welcome'}
        screenOptions={{animation: 'none'}}>
        <Stack.Screen name={'Onboarding'} component={View} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
