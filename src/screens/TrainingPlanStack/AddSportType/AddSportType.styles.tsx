import styled, {css} from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {Text} from '../../../components'

export const MainContainer = styled.View`
  ${({theme}) => css`
    background: ${theme.pageBackground};
    flex: 1;
  `}
`

export const SportSection = styled.View`
  
`

export const SportContainer = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
  `}
`

export const SportItem = styled.TouchableOpacity<{selected: boolean}>`
  ${({theme, selected}) => css`
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

export const TitleContainer = styled.View`
  gap: 4px;
  
`

export const SectionContainer = styled.View`
  gap: 16px;
  padding-top: 24px;
`

export const SelectableText = styled(Text)<{selected: boolean}>`
  ${({theme, selected}) => css`
      color: ${selected ? theme.primary : theme.subtitle}
  `}
`

export const Footer = styled.View`
  gap: 24px;
  margin-top:15px;
`

export const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
})
