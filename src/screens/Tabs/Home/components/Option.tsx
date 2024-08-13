import {OptionContainer} from '../Home.styles'
import {Text} from '../../../../components'
import {FC} from 'react'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {Colors} from '../../../../theme'
import { useTheme } from 'styled-components/native'

interface Props {
  children: string
  onPress: () => void
}

export const OptionButton:FC<Props> = ({children, onPress}) => {
  const theme = useTheme()
  return (
    <OptionContainer onPress={onPress}>
      <Text style={{fontSize: 24}} color={theme.black3}>{children}</Text>
      <Icons name={'chevron-right'} size={24} color={Colors.black4} />
    </OptionContainer>
  )
}
