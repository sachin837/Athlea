import styled, {css} from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'


export const MainContainer = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    justify-content: space-between;
    
  `}
`

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 53px;
`

export const SheetHeader = styled.View`
    ${({ theme }) => css`
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-color: ${theme.divider};
    `}
`
export const SheetFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 53px 25px;
`

export const MicrophoneContainer = styled.TouchableOpacity`
    ${({ theme }) => css`
        background: ${theme.button};
        padding: 16px;
        border-radius: 100px;
        align-items: center;
        justify-content: center;
    `}
`

export const Header = styled.View`
    ${({ theme }) => css`
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding: 16px;
        border-bottom-width: 1px;
        border-color: ${theme.divider};
    `}
`

export const SheetContainer = styled.View`
    ${({ theme }) => css`
        flex: 1;
        justify-content: space-between;
    `}
`

export const AIContainer = styled.View`
    ${({ theme }) => css`
        border-radius: 100px;
        border: 1px solid ${theme.border};
        padding: 8px;
        flex-direction: row;
        gap: 8px;
        margin-top: 32px;
    `}
`

export const AIButton = styled.TouchableOpacity<{color: string, selected: boolean}>`
    ${({ theme, color, selected }) => css`
        width: 28px;
        height: 28px;
        border: 1px solid ${color};
        background: ${selected ? theme.white : color};
        border-radius: 100px;
        align-items: center;
        justify-content: center;
    `}
`
