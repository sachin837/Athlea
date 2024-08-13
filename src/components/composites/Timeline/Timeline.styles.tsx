import styled, {css} from 'styled-components/native'
import {Colors} from '../../../theme'


export const DaysContainer = styled.View`
  padding: 1px;
  gap: 2px;
  flex: 1
`

export const Day = styled.View<{active: boolean}>`
  height: 24px;
  ${({theme, active}) => active && css`
    background: ${Colors.green10};
    border: 1px solid ${Colors.green};
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
  `}
`
