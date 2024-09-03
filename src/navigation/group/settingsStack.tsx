import {useMemo} from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {RouteNames} from '../../_constants'
import { ChangePassword, EditProfile, Settings } from 'screens'

const Stack = createStackNavigator()

export const SettingsStackNavigator = () => {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
      safeAreaInsets: {top: 0},
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible',
      },
    }),
    [],
  )

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={RouteNames.settings} component={Settings} />
        <Stack.Screen name={RouteNames.editProfile} component={EditProfile} />
          <Stack.Screen
            name={RouteNames.changePassword}
            component={ChangePassword}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
