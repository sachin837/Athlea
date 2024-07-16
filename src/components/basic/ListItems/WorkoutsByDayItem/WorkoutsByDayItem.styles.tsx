import styled, {css} from 'styled-components/native'


export const Container = styled.View<{isAnimated: boolean}>`
  ${({isAnimated}) => css`
    flex-direction: row;
    align-items: center;
    gap: 16px;
    z-index: ${isAnimated ? 10 : 1};
    overflow: visible;
  `}
  
`

export const WorkoutContainer = styled.View`
  ${({theme}) => css`
    background: ${theme.background};
    padding: 12px;
    border-radius: 16px;
    gap: 8px;
    flex-grow: 1;
  `}
`
