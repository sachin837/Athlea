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
export const AthleaContainer = styled.View`
    ${({ theme }) => css`
        flex-direction: column;
        gap: 2px;
        margin-top: 2px;
    `}
`
export const AIContainerHeader = styled.View`
    ${({ theme }) => css`
        border-radius: 100px;
        border: 1px solid ${theme.border};
        padding: 3px;
        flex-direction: row;
        gap: 8px;
        margin-top: 2px;
    `}
`

export const AIButtonHeader = styled.TouchableOpacity<{color: string, selected: boolean}>`
    ${({ theme, color, selected }) => css`
        width: 20px;
        height: 20px;
        border: 1px solid ${color};
        background: ${selected ? theme.white : color};
        border-radius: 100px;
        align-items: center;
        justify-content: center;
    `}
`
export const ModalBackground = styled.View`
flex: 1;
justify-content: flex-start;
align-items: center;
background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.View`
width: 75%;
background-color: white;
margin-top: 110px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
shadow-color: #000;
shadow-offset: 0px 4px;
shadow-opacity: 0.3;
shadow-radius: 4px;
elevation: 10;
`;

export const TitleText = styled.Text`
font-size: 14px;
font-weight: 400;
padding: 15px;
color:gray;
margin-bottom: 0px;
`;

export const ActionItem = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 10px;
border-top-width: 1px;
border-top-color: #e5e5e5;
`;
export const TrainingItem = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
padding: 10px;
border-top-width: 1px;
border-top-color: #e5e5e5;
`;
export const DeleteContainer = styled.View`
width: 75%;
background-color: white;
margin-top: 0px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
shadow-color: #000;
shadow-offset: 0px 4px;
shadow-opacity: 0.3;
shadow-radius: 4px;
elevation: 10;
`;
export const ActionItemDelete = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 10px;
margin-bottom: 3px;
`;

export const ActionText = styled.Text`
font-size: 16px;
color: #333;
margin-left: 10px;
`;

export const DeleteText = styled.Text`
font-size: 16px;
color: red;
margin-left: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
padding: 10px 0;
align-items: center;
`;

export const CloseButtonText = styled.Text`
font-size: 16px;
color: #007aff;
`;