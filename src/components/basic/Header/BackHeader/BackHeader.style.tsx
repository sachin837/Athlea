import styled, {css} from 'styled-components/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text} from '../../../primitives/Text'

export const Container = styled.View`
  ${({theme}) => css`
    background: ${theme.background};
    border-bottom: 1px solid ${theme.divider};
  `}
`

export const Content = styled(SafeAreaView)`
  flex-direction: row;
  padding: 13px 16px;
  align-items: center;
`

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  flex: 1;
`

export const Title = styled(Text)`
  ${({theme}) => css`
    color: ${theme.primary};
    flex: 3;
    text-align: center;
  `}
`

export const RightComponentContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`
