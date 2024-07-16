import {ButtonText, Container} from './Button.styles'
import {FC} from 'react'
import {ButtonProps} from './type'
import {ActivityIndicator} from 'react-native'
import {Colors} from '../../../theme'

export const Button:FC<ButtonProps> = (props) => {

  return (
    <Container {...props} onPress={props.onPress}>
      {!props.loading && <ButtonText {...props} weight={'700'}>{props.text}</ButtonText>}
      {props.loading && (
        <ActivityIndicator
          style={{height: 16}}
          color={Colors.white}
          size={'small'}
        />
      )}
    </Container>
  )
}
