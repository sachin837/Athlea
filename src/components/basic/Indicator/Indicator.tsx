import {FC} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '../../primitives'


interface Props {
  label: string
  value: string | number
  measure?: string
}

export const Indicator:FC<Props> = (props) => {

  return (
    <View>
      <Text type={'small'} themeColor={'subtitle'}>{props.label}</Text>
      <View style={styles.row}>
        <Text type={'heading3'} themeColor={'subtitle'}>{props.value}</Text>
        <Text type={'tiny'}  themeColor={'subtitle'} style={styles.measure}>
          {props.measure}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  measure: {
    paddingBottom: 3,
    paddingLeft: 3,
  },
})
