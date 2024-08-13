import styled, { css } from 'styled-components/native'
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export const ChatBoxContainer = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  padding: 16px;
  border-radius: 12px;
  elevation: 2;
  `}
`;

export const ChatBoxMessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ChatBoxMessageContent = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 5px;
  border-width: 1px;
  border-color: #e3eaf8;
  padding: 5px;
`}
`;

export const ChatBoxMessageTextContainer = styled.View`
  flex: 1;
`;

export const ChatBoxInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
  border-width: 1px;
  border-color: #e3e3e3;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 8px;
`;
