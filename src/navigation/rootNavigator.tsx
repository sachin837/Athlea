import React from 'react'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useSwipeContext} from '../contexts/SwipeContext'
import {RouteNames} from '../_constants'
import {TabNavigator} from './group/tabNavigator'
import {TrainingStack} from './group/trainingStack'
import {
  AddTrainingType,
  Settings,
  TrainingPlanArrangement,
  ManualEntry,
  StrengthTraining,
  AddNewActivity
} from '../screens'
import {AuthStack} from './group/authStack'

export const tabNavigationRef = createNavigationContainerRef()
const Stack = createStackNavigator<NavigatorParameters>()

export const RootNavigator = ({loginStatus}) => {
  const {swipeEnabled} = useSwipeContext()

  return (
    <NavigationContainer ref={tabNavigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/*{loginStatus !== 'authenticated' && (*/}
         <Stack.Screen name={RouteNames.authStack} component={AuthStack} />
        {/*)}*/}
        <Stack.Screen
          name={RouteNames.homeTabs}
          component={TabNavigator}
          options={{
            swipeEnabled: swipeEnabled, // Pass swipeEnabled as part of options
          }}
        />
        <Stack.Screen name={RouteNames.settings} component={Settings} />
        <Stack.Screen name={RouteNames.trainingPlanArrangement} component={TrainingPlanArrangement} />
        <Stack.Screen name={RouteNames.trainingStack} component={TrainingStack} />
        <Stack.Screen name={RouteNames.addTrainingType} component={AddTrainingType} />
        <Stack.Screen name={RouteNames.manualEntry} component={ManualEntry} />
        <Stack.Screen name={RouteNames.strengthTraining} component={StrengthTraining} />
        <Stack.Screen name={RouteNames.addNewActivity} component={AddNewActivity} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
