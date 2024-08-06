import {StyleProp, ViewStyle} from 'react-native'


export interface ButtonContainerProps {
  outlined?: boolean
}

export interface ButtonProps extends ButtonContainerProps {
  onPress?: () => void
  text: string
  style?: StyleProp<ViewStyle>
  loading?: boolean
}


