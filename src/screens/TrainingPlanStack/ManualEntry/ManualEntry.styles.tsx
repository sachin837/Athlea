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

export const StrengthItem = styled.TouchableOpacity<{ selected: boolean }>`
  ${({ theme, selected }) => css`
    background: ${theme.background};
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    width: 30%;
    gap: 8px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${selected ? theme.brand : theme.white};
  `}
`
export const ListContainer = styled.View`
  justify-content: center;
  padding-horizontal: 16px;
`;

export const ItemContainer = styled.View`
  background-color: #ffff;
  align-items: center;
  justify-content: center;
  padding: 8px;
  flex: 1;
  margin: 4px;
  border-radius: 12px;
  height: 80px;
  position: relative;
  width:100%;
  elevation: 5;
`;

export const StarIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Container = styled(View)`
  flex: 1;
  padding: 20px;
`;

export const InputContainer = styled(View)`
  margin-bottom: 1px;
`;

export const Label = styled(Text)`
  color: #333;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const InputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #f0f4f8;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
`;

export const StyledInput = styled(TextInput)`
  flex: 1;
  color: #333;
  font-size: 16px;
`;

export const IconWrapper = styled(TouchableOpacity)`
  margin-right: 5px;
`;

export const DescriptionInput = styled(TextInput)`
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
  color: #333;
  font-size: 16px;
  height: 100px;
  text-align-vertical: top;
`;
export const Footer = styled.View`
  padding: 12px 16px 24px;
  gap: 24px;
`