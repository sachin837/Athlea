import React, { useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useTheme } from 'styled-components/native'
import { BackHeader, Text } from '../../../components';
import {
  MainContainer, TitleContainer, SectionContainer, styles,
  CardContainer, InfoContainer, Row
} from './AddNewActivity.styles';
import Dropdown from '../../../components/basic/Dropdown/Dropdown';
import { useAddTrainingType } from './useAddNewActivityType';

export const AddNewActivity = () => {
  const theme = useTheme()
  const { BodyPart, activities, EditActivity } = useAddTrainingType();

  const renderActivity = useCallback((item: any) => {
    const UserComponent = item?.item?.userImage;
    return (
      <TouchableOpacity onPress={() => EditActivity()}>
        <CardContainer>
          <UserComponent width={50} height={50} style={styles.image} />
          <InfoContainer>
            <Text type={'heading2'} size={18} themeColor={'subtitle'} weight='700'>{item.item.title}</Text>
            <Row>
              <Text themeColor={'subtitle'}>{item.item?.description}</Text>
              <Text themeColor={'subtitle'}> ● {item.item?.dis}</Text>
              <Text themeColor={'subtitle'}> ● {item.item?.duration}</Text>
            </Row>
          </InfoContainer>
        </CardContainer>
      </TouchableOpacity>
    );
  }, [EditActivity]);

  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} themeColor={'subtitle'} weight='bold'>{"Add new activity"}</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>{"Set up the activities list"}</Text>
        </TitleContainer>
        <SectionContainer style={styles.SectionContainer}>
          <View>
            <Text style={styles.label} themeColor={'subtitle'}>{"Body Part"}</Text>
            <Dropdown data={BodyPart} />
            <Text style={styles.label} themeColor={'subtitle'}>{"Equipment"}</Text>
            <Dropdown data={BodyPart} />
          </View>
        </SectionContainer>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </MainContainer>
  )
}