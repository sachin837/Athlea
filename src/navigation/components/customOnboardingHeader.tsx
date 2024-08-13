import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {DefaultTheme} from 'styled-components/native';
import {NavigatorParameters} from '../navigationDto.ts';

interface CustomOnboardingHeaderProps {
  title?: string;
  navigation: NativeStackScreenProps<NavigatorParameters, any>;
  headerShown?: boolean;
  theme?: DefaultTheme;
}

export const CustomOnboardingHeader = (
  props: CustomOnboardingHeaderProps,
): NativeStackNavigationOptions => {
  return {
    ...props,
    headerBackTitleVisible: false,
    title: props?.title,
    headerStyle: {
      backgroundColor: props?.theme?.background,
    },
    headerTintColor: props?.theme?.primary,
  };
};
