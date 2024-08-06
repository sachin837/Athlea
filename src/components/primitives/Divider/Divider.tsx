import {Divider as DefaultDivider, DividerProps} from 'react-native-paper'
import {FC, ReactNode} from 'react'
import {Body, Container, Dash} from './Divider.styles'

interface Props extends DividerProps {
  children?: ReactNode
}

export const Divider:FC<Props> = (props) => {

  return (
    <Container>
      <Dash />
      <Body>
        {props.children}
      </Body>
      <Dash />
    </Container>
  )
}
