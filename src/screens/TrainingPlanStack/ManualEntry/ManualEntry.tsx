import { BackHeader, Text,Button } from '../../../components';
import Icons from '../../../assets/icons/Icons';
import {
  MainContainer, styles, TitleContainer, SectionContainer, StarIcon, ItemContainer,
  Footer, Label, StyledInput, InputContainer, InputWrapper, IconWrapper, DescriptionInput
} from './ManualEntry.styles';
import { ScrollView, FlatList, Alert } from 'react-native';
import { useAddTrainingType } from './useAddTrainingType';
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ManualEntry = () => {
  const { data, ManualEntry } = useAddTrainingType();

  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} style={{ fontWeight: 'bold', color: 'black' }}>Manual entry</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>Fill in session details</Text>
        </TitleContainer>
        <SectionContainer style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 15 }}>
          <InputContainer>
            <Label>Name</Label>
            <InputWrapper>
              <StyledInput placeholder="Evening run" placeholderTextColor="#99a3a4" />
            </InputWrapper>
          </InputContainer>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputContainer style={{ flex: 1, marginRight: 10 }}>
              <Label>Date</Label>
              <InputWrapper>
                <StyledInput placeholder="8 May 2024" placeholderTextColor="#99a3a4" />
                <IconWrapper>
                  <Icon name="calendar-today" size={15} color="#99a3a4" />
                </IconWrapper>
              </InputWrapper>
            </InputContainer>

            <InputContainer style={{ flex: 1, marginLeft: 10 }}>
              <Label>Time</Label>
              <InputWrapper>
                <StyledInput placeholder="20:00" placeholderTextColor="#99a3a4" />
                <IconWrapper>
                  <Icon name="access-time" size={15} color="#99a3a4" />
                </IconWrapper>
              </InputWrapper>
            </InputContainer>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputContainer style={{ flex: 1, marginRight: 10 }}>
              <Label>Duration</Label>
              <InputWrapper>
                <StyledInput placeholder="00:48:00" placeholderTextColor="#99a3a4" />
              </InputWrapper>
            </InputContainer>

            <InputContainer style={{ flex: 1, marginLeft: 10 }}>
              <Label>Intensity</Label>
              <InputWrapper>
                <StyledInput placeholder="Middle" placeholderTextColor="#99a3a4" />
              </InputWrapper>
            </InputContainer>
          </View>

          <InputContainer>
            <Label>Description</Label>
            <DescriptionInput placeholder="Placeholder" placeholderTextColor="#99a3a4" multiline />
          </InputContainer>
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
