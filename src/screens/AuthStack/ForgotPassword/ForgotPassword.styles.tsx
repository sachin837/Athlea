import styled, {css} from 'styled-components/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Colors } from 'theme'

export const StyledContainer = styled(SafeAreaView)`
  ${({theme: {}}) => css`
    flex: 1;
    background-color: #fff;
    justify-content: space-between;
    padding: 24px 16px;
  `}
`

export const TopContainer = styled.View`
  align-items: center;
  gap: 40px;
  padding-bottom: 32px;
`

export const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
`

export const MiddleContainer = styled.View`
  gap: 24px;
  flex: 1;
`

export const BottomContainer = styled.View`
  //align-items: center;
  gap: 24px;
  margin-top:20px;
`

export const SpacerView = styled.View``

export const StyledSubtitle = styled.Text`
  color: #000;
  font-weight: 500;
  font-size: 30px; /* Adjust as per your design */
  text-align: left;
`

export const SocialButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`


export const InputContainer = styled.View`
  gap: 20px;
`
export const styles = StyleSheet.create({
  emailInput:{
    color: Colors.black1,
  },
})