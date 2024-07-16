import styled, {css} from "styled-components/native";

export const Container = styled.View`
  ${({theme}) => css`
    border: 1px solid ${theme.borderColor};
    border-radius: 100px;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    position: relative;
  `}
`

export const AvatarLetter = styled.Text`
  ${({theme}) => css`
    font-size: 22px;
    color: ${theme.primary};
  `}
`

export const EditContainer = styled.View`
  ${({theme}) => css`
    border: 1px solid ${theme.background};
    border-radius: 100px;
    position: absolute;
    padding: 2px;
    bottom: 0;
    right: 0;
  `}
`
