import styled, { css } from 'styled-components/native'
import { StyleSheet } from 'react-native'
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
  ${({ theme }) => css`
  background-color: ${theme.background};
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
   `}
`;

export const StarIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;