import styled, { css } from 'styled-components/native'
import { StyleSheet,TextInput, View, Text ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MainContainer = styled.View`
  ${({ theme }) => css`
    background: ${theme.pageBackground};
    flex: 1;
  `}
`
export const SectionContainer = styled.View`
  gap: 16px;
  padding-top: 24px;
`
export const TitleContainer = styled.View`
  gap: 4px;
`

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 24,
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


