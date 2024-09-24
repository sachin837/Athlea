import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import {
  StyledContainer,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  InputContainer,
  LogoContainer,
  SocialButton,
  SocialButtonContainer,
  SocialImage,
  styles,
} from './Login.styles'
import {RouteNames} from '_constants'
import {TextInput, Text, Divider, Button } from 'components'
import {FormikTypes} from './types'
import {useLogin} from './useLogin'
import Icons from '../../../assets/icons/Icons'
import {Images} from '../../../assets/images'
import {TouchableOpacity} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'
import { Colors } from 'theme'

type LoginViewProps = {
  formik: FormikTypes; // You can use a more specific type if you know the exact structure of the formik object.
};

export const Login = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const {formik, loading, onGoogleSignIn} = useLogin()
  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
  } = formik


  return (
    <KeyboardAwareScrollView
      bounces
      bottomOffset={20}
      contentContainerStyle={{flexGrow: 1}}
    >
      <StyledContainer>
        <TopContainer>
          <LogoContainer>
            <Icons name={'ai'} color={theme.brand} size={20} />
            <Text type={'heading2'} themeColor={'brand'}>
            athlea
            </Text>
          </LogoContainer>
          <Text type={'heading1'} color={Colors.black1}>Welcome Back</Text>
        </TopContainer>

        <MiddleContainer>
          <SocialButtonContainer>
            <SocialButton onPress={onGoogleSignIn}>
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
              value={values.email}
              onChangeText={handleChange('email')}
              handleBlur={handleBlur('email')}
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              keyboardType={'email-address'}
              inputStyle={styles.emailInput}
            />
            <TextInput
              label={'Password'}
              placeholder={'Password'}
              value={values.password}
              onChangeText={handleChange('password')}
              handleBlur={handleBlur('password')}
              placeholderTextColor={theme.placeholder}
              inputStyle={styles.passwordInput}
              autoCapitalize="none"
              password
            />
            <TouchableOpacity onPress={() => navigation.navigate(RouteNames.forgotPassword)}>
              <Text style={{alignSelf: 'flex-end', color: '#F94A8C'}}>
              Forgot password?
              </Text>
            </TouchableOpacity>
          </InputContainer>
        </MiddleContainer>

        <BottomContainer>
          <Button
            text={'Login'}
            loading={loading}
            onPress={handleSubmit}
          />
          <Text themeColor={'primary'} centered>
            Don't have account yet?
            <Text themeColor={'subtitle'} onPress={() => navigation.navigate(RouteNames.signup)}> Sign up</Text>
          </Text>
          <Text type={'tiny'} themeColor={'subtitle'} centered>
            By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </BottomContainer>
      </StyledContainer>
    </KeyboardAwareScrollView>
  )
}

export default Login
