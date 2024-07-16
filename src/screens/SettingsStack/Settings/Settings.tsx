import React, {FC, useMemo} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {RouteNames} from '_constants'
import {ProfileImage, ListItem, BackHeader} from 'components'
import {ListContainer, Subtitle, Username} from './Settings.style'
import {useNavigation} from '@react-navigation/native'

export const Settings = () => {

  const name = 'michwilf'
  const navigation = useNavigation()


  const accountSettingsConfig = useMemo(() => ([
    {title: 'Edit profile', onPress: () => navigation.navigate(RouteNames.editProfile)},
    {title: 'Change password', onPress: () => navigation.navigate(RouteNames.changePassword)},
    {title: 'Language', onPress: () => {}},
    {title: 'Push notifications', onPress: () => {}, rightComponent: <Switch />},
    {title: 'Dark mode', onPress: () => {}, rightComponent: <Switch />},
  ]), [])

  const moreConfig = useMemo(() => ([
    {title: 'About us', onPress: () => {}},
    {title: 'Privacy policy', onPress: () => {}},
    {title: 'Terms and conditions', onPress: () => {}},
    {title: 'Give Feedback', onPress: () => {}},
  ]),[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProfileImage
              source={undefined}
              letter={name[0].toUpperCase()}
            />
            <View style={{marginLeft: 8}}>
              <Username>{name}</Username>
              <TouchableOpacity onPress={() => {}}>
                <Text style={{fontSize: 14, color: 'red'}}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ListContainer>
          <Subtitle>Account Settings</Subtitle>
          <View style={{gap: 32}}>
            {accountSettingsConfig.map((item, index) => (
              <ListItem {...item} key={index} />
            ))}
          </View>
        </ListContainer>
        <ListContainer>
          <Subtitle>More</Subtitle>
          <View style={{gap: 32}}>
            {moreConfig.map((item, index) => (
              <ListItem {...item} key={index} />
            ))}
          </View>
        </ListContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
