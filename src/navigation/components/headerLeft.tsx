import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {NavigatorParameters} from '../navigationDto.ts'; // Adjust the import path accordingly

type BackButtonProps = {
  navigation: NavigationProp<NavigatorParameters>;
  route: RouteProp<NavigatorParameters, keyof NavigatorParameters>;
};

export const BackButton: React.FC<BackButtonProps> = ({navigation, route}) => {
  const handlePress = () => {
    if (route?.name === 'Signup') {
      navigation.navigate('Welcome');
    } else {
      navigation.goBack();
    }
  };

  return (
    <Ionicons
      name="chevron-back-outline"
      size={36}
      color="black"
      onPress={handlePress}
      style={{marginLeft: 5}}
      accessibilityLabel="Go back"
    />
  );
};
