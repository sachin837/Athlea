import styled, {css} from 'styled-components/native'
import {Text} from '../Text'
import {ButtonContainerProps} from './type'


export const Container = styled.TouchableOpacity<ButtonContainerProps>`
  ${({theme, outlined}) => css`
    min-height: 50px;
    padding: 12px 20px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background: ${outlined ? theme.white : theme.button};
    border: 1px solid ${theme.button};
  `}
`

export const ButtonText = styled(Text)<ButtonContainerProps>`
   ${({theme, outlined}) => css`
     color: ${outlined ? theme.button : theme.white}
  `}
`
