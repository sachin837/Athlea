import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RouteNames} from '../../_constants'
import {TabNavigator} from './tabNavigator'

const Stack = createNativeStackNavigator<NavigatorParameters>()

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.home}
      screenOptions={{animation: 'none', headerShown: false}}
    >
      <Stack.Screen
        component={TabNavigator}
        name={RouteNames.home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
