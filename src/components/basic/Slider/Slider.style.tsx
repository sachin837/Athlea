import styled, { css } from 'styled-components/native'
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const SliderLabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`;

export const StyledPicker = styled(Picker)`
  height: 45px;
  width: 100%;
`;

export const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 20,
  },
});