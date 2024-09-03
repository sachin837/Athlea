import React, {useEffect, useState} from 'react'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createStackNavigator} from '@react-navigation/stack'
import {RouteNames} from '../_constants'

import {ThemeProvider} from 'styled-components/native'
import theme from '../theme'
import {useThemes} from '../contexts/ThemeContext'
import { AuthLoading } from './AuthLoading'

export const tabNavigationRef = createNavigationContainerRef()
const Stack = createStackNavigator<NavigatorParameters>()

export const RootNavigator = ({loginStatus}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme.light)
  const {isTheme, setIsTheme} = useThemes()

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme')
        if (storedTheme) {
          const newTheme = storedTheme === 'light' ? theme.light : theme.dark
          setSelectedTheme(newTheme)
          setIsTheme(storedTheme)
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error)
      }
    }

    loadTheme()
  }, [])

  useEffect(() => {
    const newTheme = isTheme === 'light' ? theme.light : theme.dark
    setSelectedTheme(newTheme)
  }, [isTheme])

  return (
    <ThemeProvider theme={selectedTheme}>
      <NavigationContainer ref={tabNavigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={RouteNames.authLoading}
          >
            {props => <AuthLoading loginStatus={loginStatus} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
