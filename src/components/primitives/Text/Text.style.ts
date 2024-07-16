import styled, {css} from 'styled-components/native'
import {StyledTextProps} from './type'


export const StyledText = styled.Text<StyledTextProps>`
  ${({theme, ...props}) => css`
    font-weight: ${props.weight ?? 'normal'};
    color: ${props.color || props.themeColor && theme[props.themeColor] || theme.font};
    font-family: sans-serif Inter;
    text-align: ${props.centered ? 'center' : undefined};
    font-size: ${props.size ?? 0}px;
  `}
`

export const Heading1 = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 32px;
    line-height: 40px;
    font-weight: bold;
  `}    
`

export const Heading2 = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  `}    
`

export const Heading3 = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
  `}    
`

export const SubHeading = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 18px;
    line-height: 24px;
  `}    
`

export const Body = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 16px;
    line-height: 24px;
  `}    
`

export const SubBody = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 14px;
    line-height: 21px;
  `}    
`
export const Small = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 12px;
    line-height: 16px;
  `}    
`

export const Tiny = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 10px;
    line-height: 12px;
  `}    
`

export const SuperTiny = styled(StyledText)`
  ${({theme, ...props}) => css`
    font-size: 6px;
  `}
`
