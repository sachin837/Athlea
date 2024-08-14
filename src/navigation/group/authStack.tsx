import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {RouteNames} from '../../_constants'
import {Start} from '../../screens/AuthStack/Start/Start'
import {ForgotPassword, Login, Signup} from '../../screens'


const Auth = createNativeStackNavigator<NavigatorParameters>()


export const AuthStack = () => {

  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name={RouteNames.start} component={Start} />
      <Auth.Screen name={RouteNames.login} component={Login} />
      <Auth.Screen name={RouteNames.signup} component={Signup} />
      <Auth.Screen name={RouteNames.forgotPassword} component={ForgotPassword} />
    </Auth.Navigator>
  )
}
