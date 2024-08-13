import styled, {css} from 'styled-components/native'

export const MainContainer = styled.View`
  ${({theme}) => css`
    flex: 1;
    background: ${theme.pageBackground};
  `}
`

export const StyledFAB = styled.TouchableOpacity`
  ${({theme}) => css`
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    border: 1px solid ${theme.brand};
    background: ${theme.background};
  `}
`

export const TitleContainer = styled.View`
  padding: 16px;
  gap: 16px;
`

export const WorkoutsContainer = styled.View`
  gap: 12px;
  padding: 0 16px;
  z-index: 1;
`
