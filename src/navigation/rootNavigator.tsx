import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {useSwipeContext} from '../contexts/SwipeContext';
import {RouteNames} from '../_constants';
import {TabNavigator} from './group/tabNavigator';
import {TrainingStack} from './group/trainingStack';
import {
  AddTrainingType,
  Onboarding,
  Settings,
  TrainingPlanArrangement,
  ManualEntry,
  StrengthTraining,
  AddNewActivity,
  EditActivity,
  ChangePassword,
  EditProfile,
  Chat,
} from '../screens';
import {AuthStack} from './group/authStack';
import styled, {ThemeProvider} from 'styled-components/native';
import theme from '../theme';
import {useThemes} from '../contexts/ThemeContext';

export const tabNavigationRef = createNavigationContainerRef();
const Stack = createStackNavigator<NavigatorParameters>();

export const RootNavigator = ({loginStatus}) => {
  const {swipeEnabled} = useSwipeContext();
  const [selectedTheme, setSelectedTheme] = useState(theme.light);
  const {isTheme, setIsTheme} = useThemes();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          const newTheme = storedTheme === 'light' ? theme.light : theme.dark;
          setSelectedTheme(newTheme);
          setIsTheme(storedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const newTheme = isTheme === 'light' ? theme.light : theme.dark;
    setSelectedTheme(newTheme);
  }, [isTheme]);

  return (
    <ThemeProvider theme={selectedTheme}>
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

          <Stack.Screen name={RouteNames.editProfile} component={EditProfile} />
          <Stack.Screen
            name={RouteNames.changePassword}
            component={ChangePassword}
          />
          <Stack.Screen name={RouteNames.settings} component={Settings} />
          <Stack.Screen
            name={RouteNames.trainingPlanArrangement}
            component={TrainingPlanArrangement}
          />
          <Stack.Screen
            name={RouteNames.trainingStack}
            component={TrainingStack}
          />
          <Stack.Screen
            name={RouteNames.addTrainingType}
            component={AddTrainingType}
          />
          <Stack.Screen name={RouteNames.chat} component={Chat} />
          <Stack.Screen name={RouteNames.onboarding} component={Onboarding} />
          <Stack.Screen name={RouteNames.manualEntry} component={ManualEntry} />
          <Stack.Screen
            name={RouteNames.strengthTraining}
            component={StrengthTraining}
          />
          <Stack.Screen
            name={RouteNames.addNewActivity}
            component={AddNewActivity}
          />
          <Stack.Screen
            name={RouteNames.editActivity}
            component={EditActivity}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
