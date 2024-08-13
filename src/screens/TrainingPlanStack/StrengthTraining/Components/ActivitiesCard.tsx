import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native'
import { Button, Text } from '../../../../components';
import { useAddTrainingType } from '../useAddTrainingType';
import {
  ActivitiesCardRow, ActivitiesCardContainer, ActivitiesCardCard, ActivitiesCardSeparator,
  ActivitiesCardInfo, ActivitiesCardButtonContainer, styles
} from '../StrengthTraining.styles';

const ActivitiesCard = () => {
  const theme = useTheme()
  const { activities, addNewActivity } = useAddTrainingType();
 
  const renderActivity = (item: any) => {
    const UserComponent = item.item.userImage;
    const IconComponent = item.item.image;
    return (
      <ActivitiesCardCard>
        <UserComponent width={50} height={50} style={styles.activeCardImage} />
        <ActivitiesCardInfo>
          <Text type={'heading1'} size={15} themeColor={'subtitle'} weight='bold'>{item.item.title}</Text>
          <ActivitiesCardRow>
            <Text type={'subBody'} themeColor={'subtitle'} size={12}>{item.item.description}</Text >
            <Text type={'subBody'} themeColor={'subtitle'} size={12}> ● {item.item.duration}</Text>
          </ActivitiesCardRow>
        </ActivitiesCardInfo>
        <IconComponent width={20} height={20} style={styles.activeCardIicon} />
      </ActivitiesCardCard>
    );
  };

  const renderSeparator = () => {
    return <ActivitiesCardSeparator />;
  };

  return (
    <ActivitiesCardContainer>
      <Text type={'heading1'} size={14} themeColor={'subtitle'} weight='700'>Activities</Text>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
      <ActivitiesCardButtonContainer>
        <Button outlined text="+ Add New" onPress={() => addNewActivity()} />
      </ActivitiesCardButtonContainer>
    </ActivitiesCardContainer>
  );
};

export default ActivitiesCard;
