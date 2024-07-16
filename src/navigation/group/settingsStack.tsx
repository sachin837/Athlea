import {useMemo} from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {RouteNames} from '../../_constants'
import {View} from 'react-native'

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
        <Stack.Screen name={RouteNames.settings} component={View} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
