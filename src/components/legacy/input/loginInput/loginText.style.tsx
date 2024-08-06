import React, {forwardRef} from 'react';
import styled from 'styled-components/native';
import {CustomInputProps} from './loginTextProp';
import {TextInput} from 'react-native';

export const StyledInput = styled(
  forwardRef<TextInput, CustomInputProps>((props, ref) => (
    <TextInput {...props} ref={ref} />
  )),
)<CustomInputProps>`
  padding: 20px 0px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 16px;
  border-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 10px;
  text-align: left;
`;
