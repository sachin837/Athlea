import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Route} from '@react-navigation/native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from '../../components'
import {RouteNames} from '_constants'
import {Colors} from '../../theme'

interface Props {
  route: Route<any>
  focused: boolean
}

const TabBarIcon: React.FC<Props> = (props) => {
  const { focused, route } = props
  let iconName = ''

  const color = focused ? Colors.purple : Colors.black4

  switch (route.name) {
  case RouteNames.home: {
    iconName = 'home'
  } break

  case RouteNames.train: {
    iconName = 'train'
  } break

  case RouteNames.feed: {
    iconName = 'feed'
  } break

  case RouteNames.threads: {
    iconName = 'list'
  } break
  }

  return (
    <View style={styles.wrapper}>
      <Icons name={iconName} color={color} size={24} />
      <Text type={'small'} bold={focused} color={color}>
        {route.name}
      </Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})

export default TabBarIcon
