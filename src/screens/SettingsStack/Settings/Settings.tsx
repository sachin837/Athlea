import React, {FC, useMemo, useContext, useState, useEffect} from 'react';
import {
  DevSettings,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteNames} from '_constants';
// import { ProfileImage, ListItem, BackHeader } from 'components';
import {
  Container,
  FooterText,
  IconWrapper,
  ItemText,
  ListContainer,
  ListItem,
  ListItemIcon,
  LogoutButton,
  LogoutText,
  ProfileHeader,
  ProfileHeaderView,
  ProfileImage,
  ProfileListItem,
  ProfileName,
} from './Settings.style';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';
import {useThemes} from '../../../contexts/ThemeContext';
import {onSignOut, useAppDispatch} from 'store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHeader} from 'components';

export const Settings = () => {
  const theme = useTheme();
  const {isTheme, setIsTheme} = useThemes();
  const [isSwitchOn, setIsSwitchOn] = useState(isTheme === 'dark');

  useEffect(() => {
    setIsSwitchOn(isTheme === 'dark');
  }, [isTheme]);

  const onToggleSwitch = () => {
    const newTheme = isTheme === 'light' ? 'dark' : 'light';
    setIsTheme(newTheme);
    setIsSwitchOn(newTheme === 'dark');
  };

  const name = 'michwilf';
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const accountSettingsConfig = useMemo(
    () => [
      {
        title: 'Groups',
        icon: 'person-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My bubble',
        icon: 'person-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My communities',
        icon: 'person-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My teams',
        icon: 'person-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Notifications',
        icon: 'notifications-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Device integration',
        icon: 'bluetooth',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Payment',
        icon: 'person-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Calendar syncing',
        icon: 'calendar-clear-outline',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      // {
      //   title: 'Change password',
      //   onPress: () => navigation.navigate(RouteNames.changePassword),
      // },
      // {title: 'Language', onPress: () => {}},
      // {
      //   title: 'Push notifications',
      //   onPress: () => {},
      //   rightComponent: <Switch />,
      // },
      // {
      //   title: 'Dark mode',
      //   onPress: onToggleSwitch,
      //   rightComponent: (
      //     <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      //   ),
      // },
    ],
    [isSwitchOn, isTheme],
  );

  const moreConfig = useMemo(
    () => [
      {title: 'About us', onPress: () => {}},
      {title: 'Privacy policy', onPress: () => {}},
      {title: 'Terms and conditions', onPress: () => {}},
      {title: 'Give Feedback', onPress: () => {}},
    ],
    [],
  );
  const signOut = async () => {
    const resultAction = await dispatch(onSignOut());
    if (onSignOut.fulfilled.match(resultAction)) {
      await AsyncStorage.clear();
      // navigation.navigate(RouteNames.authStack)
      DevSettings.reload();
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.pageBackground}}>
      <BackHeader />
      <Container>
        <ProfileHeader>
          <ProfileHeaderView>
            <ProfileImage
              source={require('../../../assets/images/people/RandomImage1.png')}
            />
            <ProfileName>Charlie Cooper</ProfileName>
          </ProfileHeaderView>
          <ProfileListItem>
            <IconWrapper>
              <Icon name="person-outline" size={20} color="#8e8e93" />
              <ItemText>Personal details</ItemText>
            </IconWrapper>
            <Icon name="chevron-forward" size={20} color="#8e8e93" />
          </ProfileListItem>
        </ProfileHeader>
        <ListContainer>
          {accountSettingsConfig.map((item, index) => (
            <ListItem key={index} isLastIndex={(accountSettingsConfig.length - 1) === index}>
              <IconWrapper>
                <Icon name={item.icon} size={20} color="#8e8e93" />
                <ItemText>{item.title}</ItemText>
              </IconWrapper>
              <Icon name="chevron-forward" size={20} color="#8e8e93" />
            </ListItem>
          ))}
        </ListContainer>
        {/* Repeat ListItem for other options as in the screenshot */}

        <LogoutButton>
          <LogoutText>Log out</LogoutText>
        </LogoutButton>

        <FooterText>About us</FooterText>
        <FooterText>Privacy policy</FooterText>
        <FooterText>Terms & conditions</FooterText>
      </Container>
    </SafeAreaView>
  );
};
