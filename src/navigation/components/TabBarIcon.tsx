import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Route} from '@react-navigation/native'
import { Text } from '../../components'
import {RouteNames} from '_constants'
import {Colors} from '../../theme'
import {IconName, Icons} from '../../assets/icons'

interface Props {
  route: Route<any>
  focused: boolean
}

const TabBarIcon: React.FC<Props> = (props) => {
  const { focused, route } = props
  let iconName:IconName = 'home02'

  const color = focused ? Colors.purple : Colors.black4

  switch (route.name) {
  case RouteNames.home: {
    iconName = 'home02'
  } break

  case RouteNames.train: {
    iconName = 'barGroup'
  } break

  case RouteNames.feed: {
    iconName = 'columnHorizontal'
  } break

  case RouteNames.threads: {
    iconName = 'fileSearch'
  } break
  }

  return (
    <View style={styles.wrapper}>
      <Icons name={iconName} color={color} />
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
