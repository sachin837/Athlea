import styled, {css} from 'styled-components/native'


export const HeaderContainer = styled.View`
  ${({theme}) => css`
    background: ${theme.background};
    border-radius: 16px;
    padding: 16px 0;
    gap: 16px;
` }
`

export const HorizontalContainer = styled.View`
  padding: 0 16px;
`
