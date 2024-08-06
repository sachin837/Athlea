import styled, {css} from "styled-components/native"

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 25px
`

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: 18px;
    color: ${theme.primary}
  `}
`
