import React, {useEffect, useRef, useState, forwardRef} from 'react';
import {StyledInput} from './loginText.style.tsx';
import {CustomInputProps} from './loginTextProp';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      value,
      placeholder,
      customStyle,
      placeholderTextColor,
      handleChange,
      handleBlur,
      onMaxLengthReached,
      showMaxChar,
      handleSubmit,
      maxLength,
      loading = false,
      focused = false,
      secureTextEntry = false,
    },
    ref,
  ) => {
    const [text, setText] = useState(value);
    const [activeField, setActiveField] = useState<boolean>(false);
    const inputRef = useRef<TextInput | null>(null);

    useEffect(() => {
      setText(value);
    }, [value]);

    useEffect(() => {
      if (focused) {
        inputRef.current?.focus();
      }
    }, [focused]);

    const OnChangeText = (values: string) => {
      handleChange(values.trim());
      setText(values);
      if (onMaxLengthReached && maxLength && values.length === maxLength) {
        onMaxLengthReached();
      }
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setActiveField(false);
      handleBlur(e);
    };

    const onPress = () => {
      inputRef.current?.focus();
    };

    const onSubmitEditing = () => {
      if (handleSubmit && text) {
        handleSubmit();
      }
      Keyboard.dismiss();
    };

    return (
      <StyledInput
        ref={ref}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(e: string) => OnChangeText(e)}
        customStyle={customStyle}
        onSubmitEditing={() => onSubmitEditing()}
        onFocus={() => setActiveField(true)}
        onPress={onPress}
        maxLength={maxLength}
        loading={loading}
        focused={focused}
        handleChange={handleChange}
        handleBlur={handleBlur}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
    );
  },
);

export default CustomInput;
