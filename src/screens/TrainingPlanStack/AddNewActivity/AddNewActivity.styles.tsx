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

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
})


export const StarIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Footer = styled.View`
  padding: 12px 16px 24px;
  gap: 24px;
`

export const CardContainer = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  flex-direction: row;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  `}
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
