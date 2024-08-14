import React from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import auth from '@react-native-firebase/auth'
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
import {onSignInWithCredential, store} from 'store'
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
  const {formik, loading} = useLogin()
  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
  } = formik

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const {idToken} = await GoogleSignin.signIn()
      const credentials = auth.GoogleAuthProvider.credential(idToken)
      await store.dispatch(onSignInWithCredential(credentials))
      navigation.navigate(RouteNames.homeTabs)
    } catch (error) {
      switch (error.code) {
      case 'DEVELOPER_ERROR':
        console.error('Developer error, check your settings:', error)
        break
      case 'NETWORK_ERROR':
        console.error(
          'Network error, check your internet connection:',
          error,
        )
        break
      case 'SIGN_IN_CANCELLED':
        console.error('Sign-in cancelled by user:', error)
        break
      case 'PLAY_SERVICES_NOT_AVAILABLE':
        console.error(
          'Google Play services not available or outdated:',
          error,
        )
        break
      case 'ERROR_ACCOUNT_NOT_FOUND':
        console.error('No Google account found on the device:', error)
        break
      case 'ERROR_INVALID_CREDENTIAL':
        console.error('Invalid credentials:', error)
        break
      default:
        console.error('Error signing in with Google:', error)
      }
    }
  }


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
            <Text type={'subBody'}>or</Text>
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
