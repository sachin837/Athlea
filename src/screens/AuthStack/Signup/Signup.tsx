import React from 'react'
import {
  StyledContainer,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  SocialButton,
  SocialImage,
  SocialButtonContainer,
  LogoContainer,
  InputContainer,
  styles,
} from './Signup.styles'
import {Colors} from 'theme'
import {Button, Divider, Text, TextInput} from 'components'
import {Images} from '../../../assets/images'
import {useSignup} from './useSignup'
import Icons from '../../../assets/icons/Icons'
import {useTheme} from 'styled-components/native'
import {RouteNames} from '../../../_constants'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

export const Signup = ({navigation}:any) => {
  const theme = useTheme()
  const {formik, onSignIn, errorMessage, isSubmitPress} = useSignup()
  const {handleSubmit, handleChange, values, handleBlur} = formik

  return (
    <KeyboardAwareScrollView
      bounces={false}
      bottomOffset={20}
      contentContainerStyle={{flexGrow: 1}}
    >
      <StyledContainer>
        <TopContainer>
          <LogoContainer>
            <Icons name={'ai'} color={theme.brand} size={20} />
            <Text type={'heading2'} themeColor={'brand'}>athlea</Text>
          </LogoContainer>
          <Text type={'heading1'} color={Colors.black1}>Create Account</Text>
        </TopContainer>

        <MiddleContainer>
          <SocialButtonContainer>
            <SocialButton onPress={onSignIn}>
              <SocialImage source={Images.google} />
            </SocialButton>
            <SocialButton>
              <SocialImage source={Images.facebook} />
            </SocialButton>
            <SocialButton>
              <SocialImage source={Images.apple} />
            </SocialButton>
          </SocialButtonContainer>
          <Divider>
            <Text color={Colors.black1} type={'subBody'}>or</Text>
          </Divider>
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
            <TextInput
              label={'Password'}
              placeholder={'Password'}
              value={values.password}
              errorText={errorMessage?.password}
              onChangeText={handleChange('password')}
              handleBlur={handleBlur('password')}
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              inputStyle={styles.passwordInput}
              password
            />
            <TextInput
              label={'Repeat password'}
              placeholder={'Repeat password'}
              value={values.repeatPassword}
              errorText={errorMessage?.repeatPassword}
              onChangeText={handleChange('repeatPassword')}
              handleBlur={handleBlur('repeatPassword')}
              placeholderTextColor={Colors.black4}
              autoCapitalize="none"
              inputStyle={styles.repeatPasswordInput}
              password
            />
          </InputContainer>
        </MiddleContainer>

        <BottomContainer>
          <Button loading={isSubmitPress} text={'Sign Up'} onPress={handleSubmit} />
          <Text themeColor={'primary'} centered>
          Already have an account?
            <Text themeColor={'subtitle'} onPress={() => navigation.navigate(RouteNames.login)}> Sign In</Text>
          </Text>
          <Text type={'tiny'} themeColor={'subtitle'} centered>
          By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </BottomContainer>
      </StyledContainer>
    </KeyboardAwareScrollView>
  )
}

export default Signup
