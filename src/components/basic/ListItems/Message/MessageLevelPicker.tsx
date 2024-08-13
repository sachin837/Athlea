import {View} from 'react-native'
import {FC, useState} from 'react'


interface Props {

}

export const MessageLevelPicker:FC<Props> = (props) => {

  const [levels] = useState([
    {label: 'Beginner', value: 1},
    {label: 'Intermediate', value: 2},
    {label: 'Advanced', value: 3},
    {label: 'Elite', value: 4},
  ])

  return (
    <View>
      {levels.map(item => (
        <View />
      ))}
    </View>
  )
}
