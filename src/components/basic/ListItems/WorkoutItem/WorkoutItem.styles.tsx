import styled, {css} from 'styled-components/native'
import {TrainingTypes} from '../../../../_constants'


export const Container = styled.View<{trainingType: TrainingTypes}>`
  ${({theme, trainingType}) => css`
    background: ${theme[trainingType]};
    border-radius: 8px;
    padding: 8px 12px;
    gap: 4px;
    border: 1px solid white;
    z-index: 1;
    position: absolute;
    left: 16px;
    right: 16px;
  `}
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

export const RowSpace = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Bar = styled.View`
  height: 40px;
  width: 20px;
  background: red;
`
