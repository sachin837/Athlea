import React from 'react'
import {
  StyledContainer,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  LogoContainer,
  InputContainer,
  styles,
} from './ForgotPassword.styles'
import {Button, Text, TextInput} from 'components'
import {useForgotPassword} from './useForgotPassword'
import Icons from '../../../assets/icons/Icons'
import {useTheme} from 'styled-components/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'
import {Colors} from 'theme'
import { RouteNames } from '_constants'

export const ForgotPassword = ({navigation}: any) => {
  const theme = useTheme()
  const {formik, errorMessage, isSubmitPress} = useForgotPassword()
  const {handleSubmit, handleChange, values, handleBlur} = formik

  return (
    <KeyboardAwareScrollView
      bounces={false}
      bottomOffset={20}
      contentContainerStyle={{flexGrow: 1}}>
      <StyledContainer>
        <TopContainer>
          <LogoContainer>
            <Icons name={'ai'} color={theme.brand} size={20} />
            <Text type={'heading2'} themeColor={'brand'}>
              athlea
            </Text>
          </LogoContainer>
          <Text type={'heading1'} color={Colors.black1}>
            Forgot Password
          </Text>
        </TopContainer>

        <MiddleContainer>
          <InputContainer>
            <TextInput
              label={'Email'}
              placeholder={'Email'}
              placeholderTextColor={theme.placeholder}
              value={values.email}
              errorText={errorMessage?.email}
              onChangeText={handleChange('email')}
              handleBlur={handleBlur('email')}
              inputStyle={styles.emailInput}
              autoCapitalize="none"
            />
          </InputContainer>
          <BottomContainer>
            <Button
              loading={isSubmitPress}
              text={'Reset Password'}
              onPress={handleSubmit}
            />

            <Text centered themeColor={'subtitle'} onPress={() => navigation.navigate(RouteNames.login)}> Back to Login</Text>
          </BottomContainer>
        </MiddleContainer>
      </StyledContainer>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword
