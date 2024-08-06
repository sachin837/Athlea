import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TextInput } from '../../../../components';
import {
  Row, TextInputContainer, DateTimeContainer, DateTimeCardView,
} from '../StrengthTraining.styles';
import { useTheme } from 'styled-components/native'

const DateTimeCard = () => {
  const theme = useTheme()
  return (
    <DateTimeContainer>
      <DateTimeCardView>
        <Text themeColor={'subtitle'}>Select date & time:</Text>
        <Row>
          <TextInputContainer>
            <TextInput
              label={'Date'}
              placeholder={'8 May 2024'}
              // value={values.email}
              // onChangeText={handleChange('email')}
              // handleBlur={handleBlur('email')}
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              keyboardType={'email-address'}
              inputStyle={{ height: 50, }}
              inputContainer={{ height: 50, }}
              icon={<Icon name="calendar-today" size={15} color="#99a3a4" />}
            />
          </TextInputContainer>
          <TextInputContainer>
            <TextInput
              label={'Time'}
              placeholder={'20:00'}
              // value={values.email}
              // onChangeText={handleChange('email')}
              // handleBlur={handleBlur('email')}
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              keyboardType={'email-address'}
              inputStyle={{ height: 50 }}
              inputContainer={{ height: 50 }}
              icon={<Icon name="access-time" size={15} color="#99a3a4" />}
            />
          </TextInputContainer>
        </Row>
      </DateTimeCardView>
    </DateTimeContainer>
  );
};

export default DateTimeCard;
