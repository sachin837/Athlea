import {Platform, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {RouteNames} from '_constants'
import {Feed, Home, Threads, Train} from 'screens'
import TabBarIcon from '../components/TabBarIcon'

const Tabs = createBottomTabNavigator()

export const TabNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, {paddingBottom: Platform.select({ios: insets.bottom, android: 16})}],
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} route={route} />
        ),
      })}
    >
      <Tabs.Screen name={RouteNames.home} component={Home} />
      <Tabs.Screen name={RouteNames.train} component={Train} />
      <Tabs.Screen name={RouteNames.feed} component={Feed} />
      <Tabs.Screen name={RouteNames.threads} component={Threads} />
    </Tabs.Navigator>
  )
}


export const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: 78,
    borderTopWidth: 1,
  },
})
