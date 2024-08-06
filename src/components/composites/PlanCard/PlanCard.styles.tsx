import styled, {css} from 'styled-components/native'


export const Container = styled.View`
  ${({theme, ...props})  => css`
    background: ${theme.cardBackground};
    border-radius: 16px;
    padding: 16px;
    gap: 20px;
  `}
`

export const RowCenter = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
`

export const RowSpace = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const TrainingBarsContainer = styled.View`
  flex-direction: row;
  gap: 6px;
`

export const TrainingBar = styled.View<{background: string}>`
  ${({theme, ...props}) => css`
    flex-grow: 1;
    height: 10px;
    background: ${props.background};
    border-radius: 8px;
  `}
`

export const TrainingDetailContainer = styled.View`
  ${({theme, ...props}) => css`
    border-top-width: 1px;
    border-color: ${theme.border};
    padding-top: 20px;
    gap: 12px;
  `}
`

export const TrainingDetails = styled.View`
  gap: 20px;
`
