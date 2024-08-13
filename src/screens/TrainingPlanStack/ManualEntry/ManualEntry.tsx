import { BackHeader, Text, Button, TextInput } from '../../../components';
import {
  MainContainer, styles, TitleContainer, SectionContainer, TextInputContainer, Row,
  Footer,
} from './ManualEntry.styles';
import { ScrollView, FlatList, Alert } from 'react-native';
import { useAddTrainingType } from './useAddTrainingType';
import { useTheme } from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ManualEntry = () => {
  const theme = useTheme()
  const { data, ManualEntry } = useAddTrainingType();

  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} weight={'bold'} themeColor={'subtitle'}>Manual entry</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>Fill in session details</Text>
        </TitleContainer>
        <SectionContainer style={styles.SectionContainer}>
          <TextInput
            label={'Name'}
            placeholder={'Evening run'}
            // value={values.email}
            // onChangeText={handleChange('email')}
            // handleBlur={handleBlur('email')}
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
            keyboardType={'email-address'}
            inputStyle={{ height: 50, }}
            inputContainer={{ height: 50, }}
          />

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

          <Row>
            <TextInputContainer>
              <TextInput
                label={'Duration'}
                placeholder={'00:48:00'}
                // value={values.email}
                // onChangeText={handleChange('email')}
                // handleBlur={handleBlur('email')}
                placeholderTextColor={theme.placeholder}
                autoCapitalize="none"
                keyboardType={'email-address'}
                inputStyle={{ height: 50, }}
                inputContainer={{ height: 50, }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInput
                label={'Intensity'}
                placeholder={'Middle'}
                // value={values.email}
                // onChangeText={handleChange('email')}
                // handleBlur={handleBlur('email')}
                placeholderTextColor={theme.placeholder}
                autoCapitalize="none"
                keyboardType={'email-address'}
                inputStyle={{ height: 50 }}
                inputContainer={{ height: 50 }}
              />
            </TextInputContainer>
          </Row>

          <TextInput
            label={'Description'}
            placeholder={'Description'}
            // value={values.email}
            // onChangeText={handleChange('email')}
            // handleBlur={handleBlur('email')}
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
            keyboardType={'email-address'}
            inputStyle={{ height: 50, }}
            inputContainer={{ height: 50, }}
          />
        </SectionContainer>
        <Footer>
          <Button
            text={'Continue'}
          // onPress={console.log('sss')}
          />
        </Footer>
      </ScrollView>
    </MainContainer>
  );
};
