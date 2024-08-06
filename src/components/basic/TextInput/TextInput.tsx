import {FC, useCallback, useEffect, useState} from 'react'
import {useTheme} from 'styled-components/native'
import {Text} from '../../index'
import {
  IconContainer,
  InputContainer,
  LabelContainer,
  MainContainer,
  StyledInput,
} from './TextInput.style'
import {TextInputProps} from './type'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {TouchableOpacity} from 'react-native'


export const TextInput:FC<TextInputProps> = (props) => {
  const theme = useTheme()
  const [focused, setFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    props.setFocused?.(focused)
  }, [focused])

  const togglePasswordVisibility = useCallback(() => setPasswordVisible(prev => !prev), [])

  return (
    <MainContainer>
      {!!props.label && (
        <LabelContainer>
          <Text type={'small'} themeColor={'subtitle'}>{props.label}</Text>
          {!!props.optionalLabel && (
            <Text type={'small'} themeColor={'subtitle'}>({props.optionalLabel})</Text>
          )}
        </LabelContainer>
      )}
      <InputContainer focused={focused} error={!!props.errorText}  style={props?.inputContainer}>
        <StyledInput
          {...props}
          icon={!!props.icon}
          style={props.inputStyle}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          secureTextEntry={props.password && !passwordVisible}
        />
        <IconContainer>{props.icon}</IconContainer>
        {props.password && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icons name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} />
          </TouchableOpacity>
        )}
      </InputContainer>
      {!!props.errorText && (
        <Text type={'small'} color={theme.error500}>
          {props.errorText}
        </Text>
      )}
    </MainContainer>
  )
}
