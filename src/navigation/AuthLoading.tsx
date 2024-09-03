import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {RouteNames} from '../_constants'

import {AuthStack} from './group/authStack'
import { AppStack } from './AppStack'

const AuthLoadingStack = createStackNavigator<NavigatorParameters>()

export const AuthLoading = ({loginStatus}) => {

  return (
    <AuthLoadingStack.Navigator screenOptions={{headerShown: false}}>
      {loginStatus !== 'authenticated' ? (
        <AuthLoadingStack.Screen component={AuthStack} name={RouteNames.authStack} />
      ) : (
        <AuthLoadingStack.Screen component={AppStack} name={RouteNames.appStack} />
      )}
    </AuthLoadingStack.Navigator>
  )
};
