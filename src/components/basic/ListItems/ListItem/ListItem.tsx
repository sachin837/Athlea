import {FC, ReactElement} from 'react'
import {StyleProp, TextStyle, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Row, Title} from './ListItem.style'

interface Props {
    title: string
    textStyles?: StyleProp<TextStyle>
    onPress?: () => void
    rightComponent?: ReactElement
}

export const ListItem:FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Row>
        <Title style={props.textStyles}>{props.title}</Title>
        {!props.rightComponent && <Icon name={'chevron-forward-outline'} size={18} />}
        {!!props.rightComponent && props.rightComponent}
      </Row>
    </TouchableOpacity>
  )
}
