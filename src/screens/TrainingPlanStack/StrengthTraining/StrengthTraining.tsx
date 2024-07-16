import { BackHeader, Text, Button } from '../../../components';
import {
  MainContainer, styles
} from './StrengthTraining.styles';
import { ScrollView, FlatList, Alert } from 'react-native';
import { useAddTrainingType } from './useAddTrainingType';
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrainingCard from './Components/TrainingCard';
import DateTimeCard from './Components/DateTimeCard';
import ActivitiesCard from './Components/ActivitiesCard';
import ChatBox from './Components/ChatBox';
export const StrengthTraining = () => {
  const { data, ManualEntry } = useAddTrainingType();

  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TrainingCard />
        <DateTimeCard />
        <ActivitiesCard />
        <ChatBox />
        <View style={{ marginTop: 20 }}>
          <Button
            text={'Save'}
          // onPress={console.log('sss')}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};
