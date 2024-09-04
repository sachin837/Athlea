import React from 'react'
import {RouteNames} from '../_constants'
import {TabNavigator} from './group/tabNavigator'
import {TrainingStack} from './group/trainingStack'
import {
  AddTrainingType,
  Onboarding,
  TrainingPlanArrangement,
  ManualEntry,
  StrengthTraining,
  AddNewActivity,
  EditActivity,
  Chat,
  Settings,
  EditProfile,
  ChangePassword,
} from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useSwipeContext } from 'contexts/SwipeContext'

const App = createNativeStackNavigator<NavigatorParameters>()

export const AppStack = () => {
  const {swipeEnabled} = useSwipeContext()
  return (
    <App.Navigator screenOptions={{headerShown: false}}>
      <App.Screen
        name={RouteNames.homeTabs}
        component={TabNavigator}
        options={{
          swipeEnabled: swipeEnabled, // Pass swipeEnabled as part of options
        }}
      />

      <App.Screen name={RouteNames.settings} component={Settings} />
      <App.Screen name={RouteNames.editProfile} component={EditProfile} />
      <App.Screen
        name={RouteNames.changePassword}
        component={ChangePassword}
      />
      <App.Screen
        name={RouteNames.trainingPlanArrangement}
        component={TrainingPlanArrangement}
      />
      <App.Screen name={RouteNames.trainingStack} component={TrainingStack} />
      <App.Screen
        name={RouteNames.addTrainingType}
        component={AddTrainingType}
      />
      <App.Screen name={RouteNames.chat} component={Chat} />
      <App.Screen name={RouteNames.onboarding} component={Onboarding} />
      <App.Screen name={RouteNames.manualEntry} component={ManualEntry} />
      <App.Screen
        name={RouteNames.strengthTraining}
        component={StrengthTraining}
      />
      <App.Screen
        name={RouteNames.addNewActivity}
        component={AddNewActivity}
      />
      <App.Screen name={RouteNames.editActivity} component={EditActivity} />
    </App.Navigator>
  )
}
