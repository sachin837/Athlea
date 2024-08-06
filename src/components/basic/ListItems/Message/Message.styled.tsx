import styled, {css} from 'styled-components/native'
import {Text} from '../../../primitives'


export const MainContainer = styled.View`
    ${({ theme }) => css`
        
    `}
`

export const OptionsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
`

export const OptionContainer = styled.TouchableOpacity<{selected: boolean}>`
    ${({ theme, selected }) => css`
        flex-direction: row;
        align-items: center;
        gap: 8px;
        background: ${selected ? theme.messageRightBubble : theme.background };
        border: 1px solid ${theme.messageRightBubble};
        border-radius: 12px;
        padding: 8px 12px;
    `}
`

export const OptionText = styled(Text)<{selected: boolean}>`
    ${({ theme, selected }) => css`
        color: ${selected ? theme.white : theme.subtitle}
    `}
`

export const CustomViewsContainer = styled.View`
    margin-left: 52px;
    margin-top: 8px;
`
