import styled, {css} from 'styled-components/native'


export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Dash = styled.View`
  ${({theme}) => css`
    height: 1px;
    flex-grow: 1;
    background: ${theme.divider};
  `}
`

export const Body = styled.View`
  padding: 0 24px;
`
