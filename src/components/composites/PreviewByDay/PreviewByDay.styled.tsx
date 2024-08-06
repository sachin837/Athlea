import styled, {css} from 'styled-components/native'
import {Text} from '../../primitives/Text'


export const Container = styled.View`
  gap: 20px
`

export const DaysContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`

export const Day = styled.View<{size: number, rest: boolean, noRecord: boolean}>`
  ${({theme, size, rest, noRecord}) => css`
    background: ${(rest || noRecord) ? 'transparent' : theme.black6};
    align-items: center;
    justify-content: center;
    width: ${size}px;
    height: ${size}px;
    border-radius: 4px;
    ${noRecord ? '' : css`border: 1px solid ${theme.black5};`}
  `}
`

export const DayRing = styled.View<{size: number}>`
  ${({ size}) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: 100px;
    background: #0D99FF;
    align-items: center;
    justify-content: center;
  `}
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`
