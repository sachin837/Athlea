import styled, {css} from "styled-components/native";


export const Subtitle = styled.Text` 
  ${({theme}) => css`
    font-size: 18px;
    color: ${theme.subtitle};
    margin: 0 25px 29px 25px;
  `}
`

export const ListContainer = styled.View`
  ${({theme}) => css`
    padding: 24px 0;
    border-top-width: 1px;
    border-top-color: ${theme.borderColor};
  `}
`

export const Username = styled.Text`
  ${({theme}) => css`
    color: ${theme.primary};
    font-size: 18px;
  `}
`
export const BackButton = styled.TouchableOpacity`
  gap: 4px;
  marging-right:5px;
`