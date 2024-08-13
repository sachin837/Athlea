import styled, { css } from 'styled-components/native'
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MainContainer = styled.View`
  ${({ theme }) => css`
    background: ${theme.pageBackground};
    flex: 1;
  `}
`
export const SectionContainer = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  gap: 16px;
  padding-top: 24px;
`}
`
export const TitleContainer = styled.View`
  gap: 4px;
`

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  SectionContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 15
  },
})

export const Footer = styled.View`
  gap: 24px;
  margin-top:15px;
`
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TextInputContainer = styled.View`
  width: 47%;
`;