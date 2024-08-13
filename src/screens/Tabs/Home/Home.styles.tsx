import styled, {css} from 'styled-components/native'


export const ContentContainer = styled.View<{reverse?: boolean}>`
  ${({reverse}) => css`
    align-items: ${reverse ? 'flex-end' : 'flex-start'};
    justify-content: space-between;
  `}
`

export const TitleWrapper = styled.View`
  padding-bottom: 42px;
  align-items: center;
`

export const OptionWrapper = styled.View<{reverse?: boolean}>`
  ${({reverse}) => css`
    gap: 10px;
    align-items: ${reverse ? 'flex-end' : 'flex-start'};
  `}
  
`

export const OptionContainer = styled.TouchableOpacity`
  ${({theme, reverse}) => css`
    flex-direction: row;
    align-items: center;
    padding: 12px 20px;
    gap: 12px;
    border-radius: 16px;
    background: ${theme.white};
    //align-self: ${reverse ? 'flex-end' : 'flex-start'};
  `}
`

export const Avatar = styled.Image`
  width: 187px;
  height: 187px;
`
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
