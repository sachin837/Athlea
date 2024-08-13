import styled, {css, DefaultTheme} from 'styled-components/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Colors } from 'theme'
import { StyleSheet } from 'react-native'

export const StyledContainer = styled(SafeAreaView)`
  ${({theme: {space}}) => css`
    flex: 1;
    padding: 24px 16px;
    background-color: #fff;
  `}
`

export const TopContainer = styled.View`
  ${({theme: {space}}) => css`
    align-items: center;
    gap: 40px;
    padding-bottom: 32px;
  `}
`

export const MiddleContainer = styled.View`
  gap: 24px;
  flex: 1;
`

export const BottomContainer = styled.View`
  gap: 24px;
  padding-top: 24px;
`

export const Spacing = styled.View`
  ${({theme: {space}}) => css`
    height: 10px; /* Example fixed value. Adjust as needed. */
  `}
`

export const StyledSubtitle = styled.Text`
  color: #000;
  font-weight: 500;
  font-size: 30px; /* Adjust as per your design */
  margin-bottom: 30px; /* Space between the subtitle and description */
  text-align: left;
`

export const Input = styled.TextInput`
  /* width: 80%; */
  padding: 20px 0px;
  border-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: left;
  color: #000;
`

export const SocialButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`

export const SocialButton = styled.TouchableOpacity`
  ${({theme}) => css`
    flex: 1;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.border};
    padding: 12px 20px;
  `}  
`

export const SocialImage = styled.Image`
  width: 24px;
  height: 24px
`

export const InputContainer = styled.View`
  gap: 20px;
`

export const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
`
export const styles = StyleSheet.create({
  emailInput:{
    color: Colors.black1,
  },
  passwordInput:{
    color: Colors.black1,
  },
})