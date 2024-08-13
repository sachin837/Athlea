import styled, {css} from 'styled-components/native'
import { Picker } from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PickerContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const PickerWrapper = styled.View`
  background-color: #F0F0F0;
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-color: #E0E0E0;
  justify-content: center;
  align-items: center;
`;

export const StyledPicker = styled(Picker)`
  height: 45px;
  width: 100%;
`;