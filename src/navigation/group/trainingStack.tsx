import {createStackNavigator} from '@react-navigation/stack'
import {RouteNames} from '../../_constants'
import {AddSportType} from '../../screens/TrainingPlanStack/AddSportType/AddSportType'


const Stack = createStackNavigator()

export const TrainingStack = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteNames.addSportType} component={AddSportType} />
    </Stack.Navigator>
  )
}
