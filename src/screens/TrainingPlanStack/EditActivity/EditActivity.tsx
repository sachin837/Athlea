import { View, ScrollView, Image, Dimensions } from 'react-native'
import { BackHeader, Text, Button } from '../../../components';
import {
  MainContainer, SectionContainer,
  CardContainer, ImageContainer, InfoContainer, IntensityLevelItem,
  DescriptionContainer, DetailsContainer, DetailItem, StarIcon, styles
} from './EditActivity.styles';
import Slider from '../../../components/basic/Slider/Slider';
import ChatInput from '../../../components/basic/ChatInput/ChatInput';
import IntensityLevel from '../../../components/basic/IntensityLevel/IntensityLevel';
import { useEditActivityType } from './useEditActivityType';
const { width: screenWidth } = Dimensions.get("screen")

export const EditActivity = () => {
  const { handleSets, valueSets, handleRepetition, valueRepetition, handleWeight, valueWeight } = useEditActivityType();
  return (
    <MainContainer>
      <BackHeader title="Add session" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CardContainer>
          <ImageContainer>
            <Image
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              resizeMethod='scale'
              resizeMode='cover'
              style={{ width: screenWidth - 15 }}
              source={require('../../../assets/images/full_user.png')} />
          </ImageContainer>
          <InfoContainer>
            <Text type={'heading1'} size={14} weight={700} themeColor={'subtitle'}>{"Barbell Pullover to Press"}</Text>
            <StarIcon name="star" size={20} color="#CBD5E1" />
          </InfoContainer>
          <DescriptionContainer>
            <Text type={'small'} size={14} themeColor={'subtitle'}>{"Description orem ipsum dolor sit amet consectetur. Quis nisi elit volutpat sed aliquam ut massa ut"}</Text>
          </DescriptionContainer>
          <DetailsContainer>
            <DetailItem>
              <Text type={'small'} size={12} themeColor={'subtitle'} weight={400}>Estimated duration</Text>
              <Text type={'heading1'} size={14} weight={700} themeColor={'subtitle'}>9 min</Text>
            </DetailItem>
            <IntensityLevelItem>
              <IntensityLevel level={3} />
            </IntensityLevelItem>
          </DetailsContainer>
        </CardContainer>
        <SectionContainer>
          <Slider
            type='Sets'
            value={valueSets}
            onchange={(val: any) => handleSets(val)}
          />
          <Slider type='Repetitions'
            value={valueRepetition}
            onchange={(val: any) => handleRepetition(val)}
          />
          <Slider type='Weight'
            value={valueWeight}
            onchange={(val: any) => handleWeight(val)}
          />
        </SectionContainer>
        <View style={{margin:10}}>
          <ChatInput />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            text={'Add'}
          />
        </View>
      </ScrollView>
    </MainContainer>
  )
}
