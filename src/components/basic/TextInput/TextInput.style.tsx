import styled, {css} from 'styled-components/native'


export const MainContainer = styled.View`
  width: 100%
`

export const InputContainer = styled.View<{focused?: boolean, error?: boolean}>`
  ${({theme, ...props}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border-width: 1px;
    border-color: ${(props.error && theme.error500) || (props.focused && theme.brand) || 'transparent'};
    background: ${theme.black6};
    marginTop:5px;
    paddingLeft:5px
  `}
`

export const StyledInput = styled.TextInput<{icon?: boolean}>`
  ${({theme, ...props}) => css`
    flex: 1;
    margin-right: ${props.icon ? 10 : 0}px
  `}
`

export const LabelContainer = styled.View`
  flex-direction: row;
`

export const IconContainer = styled.View`
  
`
