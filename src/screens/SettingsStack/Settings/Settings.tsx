import React, {useMemo, useState, useEffect} from 'react'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import {RouteNames} from '_constants'
import {
  AvatarContainer,
  Container,
  DeleteAccountItem,
  Footer,
  IconWrapper,
  ListContainer,
  ListItem,
  LogoutButton,
  ProfileHeader,
  ProfileListItem,
} from './Settings.style'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import {useThemes} from '../../../contexts/ThemeContext'
import {onSignOut, useAppDispatch} from 'store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {BackHeader, ProfileImage, Text} from 'components'
import {useSettings} from './useSettings'
import {Colors} from 'theme'
import {Icons} from '../../../assets/icons'
import {PersonalDetails} from './PersonalDetails'
import BottomSheet from '@gorhom/bottom-sheet'
import {Notifications} from './Notifications'
import { DeviceIntegration } from './DeviceIntegration'

export const Settings = () => {
  const theme = useTheme()
  const {isTheme, setIsTheme} = useThemes()
  const [isSwitchOn, setIsSwitchOn] = useState(isTheme === 'dark')
  const insets = useSafeAreaInsets()
  const {
    profileSheetRef,
    snapPoints,
    openProfileSheet,
    closeProfileSheet,
    notificationSheetRef,
    openNotificationSheet,
    closeNotificationSheet,
    deviceSheetRef,
    openDeviceSheet,
    closeDeviceSheet,
  } = useSettings()
  useEffect(() => {
    setIsSwitchOn(isTheme === 'dark')
  }, [isTheme])

  const onToggleSwitch = () => {
    const newTheme = isTheme === 'light' ? 'dark' : 'light'
    setIsTheme(newTheme)
    setIsSwitchOn(newTheme === 'dark')
  };

  const name = 'michwilf'
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const accountSettingsConfig = useMemo(
    () => [
      {
        title: 'Groups',
        icon: 'users',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My bubble',
        icon: 'users',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My communities',
        icon: 'users',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'My teams',
        icon: 'users',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Notifications',
        icon: 'notificationBox',
        onPress: openNotificationSheet,
      },
      {
        title: 'Device integration',
        icon: 'bluetooth',
        onPress: openDeviceSheet,
      },
      {
        title: 'Payment',
        icon: 'cardPayment',
        onPress: () => navigation.navigate(RouteNames.editProfile),
      },
      {
        title: 'Calendar syncing',
        icon: 'calendarCheck',
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
  )

  const moreConfig = useMemo(
    () => [
      {title: 'About us', onPress: () => {}},
      {title: 'Privacy policy', onPress: () => {}},
      {title: 'Terms and conditions', onPress: () => {}},
      {title: 'Give Feedback', onPress: () => {}},
    ],
    [],
  )
  const signOut = async () => {
    const resultAction = await dispatch(onSignOut())
    if (onSignOut.fulfilled.match(resultAction)) {
      await AsyncStorage.clear()
      navigation.replace(RouteNames.authLoading)
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.pageBackground}}>
      <BackHeader />
      <Container>
        <ProfileHeader>
          <AvatarContainer>
            <ProfileImage
              size={100}
              letter={name[0].toUpperCase()}
              // backgroundColor={'#e1e1e1'}
              source={require('../../../assets/images/people/RandomImage1.png')}
            />
            <Text
              color={Colors.black1}
              style={{marginTop: 20}}
              weight="700"
              size={18}
              centered>
              Charlie Cooper
            </Text>
          </AvatarContainer>
          <ProfileListItem onPress={openProfileSheet}>
            <IconWrapper>
              <Icons name="user" size={20} />
              <Text
                color={Colors.black1}
                size={16}
                weight="400"
                style={{marginLeft: 5}}>
                Personal details
              </Text>
            </IconWrapper>
            <Icon name="chevron-forward" size={20} color={Colors.black4} />
          </ProfileListItem>
        </ProfileHeader>
        <ListContainer>
          {accountSettingsConfig.map((item, index) => (
            <ListItem
              key={index}
              onPress={item.onPress}
              isLastIndex={accountSettingsConfig.length - 1 === index}>
              <IconWrapper>
                <Icons name={item.icon} size={20} color={Colors.black2} />
                <Text
                  color={Colors.black1}
                  size={16}
                  weight="400"
                  style={{marginLeft: 5}}>
                  {item.title}
                </Text>
              </IconWrapper>
              <Icon name="chevron-forward" size={20} color={Colors.black4} />
            </ListItem>
          ))}
        </ListContainer>
        <DeleteAccountItem onPress={openProfileSheet}>
          <IconWrapper>
            <Text color={Colors.black1} size={16} weight="400">
              Delete account
            </Text>
          </IconWrapper>
          <Icon name="chevron-forward" size={20} color={Colors.black4} />
        </DeleteAccountItem>
        <LogoutButton onPress={signOut}>
          <IconWrapper>
            <Icon name="exit-outline" size={22} color={Colors.warning500} />
            <Text
              color={Colors.warning500}
              weight="400"
              size={16}
              style={{marginLeft: 5}}>
              Log out
            </Text>
          </IconWrapper>
        </LogoutButton>
        <Footer style={{gap: 18}}>
          <Text color={Colors.black3} size={14} centered>
            About us
          </Text>
          <Text color={Colors.black3} size={14} centered>
            Privacy policy
          </Text>
          <Text color={Colors.black3} size={14} centered>
            Terms & conditions
          </Text>
        </Footer>
      </Container>
      <BottomSheet
        index={-1}
        ref={profileSheetRef}
        enablePanDownToClose
        topInset={insets.top}
        snapPoints={snapPoints}
        handleComponent={() => null}>
        <PersonalDetails onClose={closeProfileSheet} />
      </BottomSheet>
      <BottomSheet
        index={-1}
        ref={notificationSheetRef}
        enablePanDownToClose
        topInset={insets.top}
        snapPoints={snapPoints}
        handleComponent={() => null}>
        <Notifications onClose={closeNotificationSheet} />
      </BottomSheet>
      <BottomSheet
        index={-1}
        ref={deviceSheetRef}
        enablePanDownToClose
        topInset={insets.top}
        snapPoints={snapPoints}
        handleComponent={() => null}>
        <DeviceIntegration onClose={closeDeviceSheet} />
      </BottomSheet>
    </SafeAreaView>
  )
};
