import React, {useEffect, useState} from 'react';
import {useFilter} from '../../../../contexts/FilterContext.tsx';
import HalfRectangleLineGraph from '../../graphs/halfRectangeLineGraph';
import {
  Container,
  GraphContainer,
  HeaderContainer,
  HeaderTitle,
  MetricContainer,
  MetricContainer1,
  MetricContainer2,
  MetricHeader,
  MetricLabel,
  MetricValue,
  MetricValueContainer,
  StatsIcon,
  SubHeaderContainer,
} from '../statsPanel/statsPanel.style.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native';
import LoadingIndicator from '../../loading';
import CommentComp from '../../message/comment';
import MessageButton from '../../messageButton';
import ActivityGraph from '../../graphs/activityGraph';
import ActivityAmountGraph from '../../graphs/activityAmountGraph';
import ActivityTimeGraph from '../../graphs/activityTimeGraph';

interface ActivitiesPanelProps {
  HeaderIconName: string;
  StatisticsText: string;
  MetricHeaderText1: string;
  MetricValue1: string;
  MetricLabel1: string;
  MetricHeaderText2: string;
  MetricValue2: string;
  MetricLabel2: string;
  IconSize: number;
}

const ActivitiesPanel = ({
  HeaderIconName,
  StatisticsText,
  MetricHeaderText1,
  MetricValue1,
  MetricLabel1,
  MetricHeaderText2,
  MetricValue2,
  MetricLabel2,
  IconSize = 1.75,
  onPress,
  data,
  showMessage,
  filterType,
  showAppleWatch = false,
  showGarmin = false,
  onMessageButtonPress,
  IconColor,
}: ActivitiesPanelProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  if (data.length === 0) {
    return <Text></Text>;
  }
  return (
    <Container>
      <MetricContainer1 onPress={onPress}>
        <MetricContainer>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <StatsIcon
              color={IconColor}
              name={HeaderIconName}
              size={IconSize}
            />
            <MetricHeader>{MetricHeaderText2}</MetricHeader>
            {showAppleWatch && (
              <Image
                source={require('../../../../assets/images/AppleWatchSeries31.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            )}
            {showGarmin && (
              <Image
                source={require('../../../../assets/images/Garmin_HRMRUN_Sensor1.png')}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            )}
            {showMessage && <MessageButton onPress={onMessageButtonPress} />}
          </View>
          <MetricValueContainer>
            <MetricValue>{MetricValue1}</MetricValue>
            <MetricLabel>activities</MetricLabel>
          </MetricValueContainer>
        </MetricContainer>
        <GraphContainer>
          <ActivityAmountGraph filterType={filterType} activitiesData={data} />
        </GraphContainer>
      </MetricContainer1>
      <MetricContainer2 onPress={onPress}>
        <MetricContainer>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <StatsIcon
              color={IconColor}
              name={HeaderIconName}
              size={IconSize}
            />
            <MetricHeader>{MetricHeaderText2}</MetricHeader>
            {showAppleWatch && (
              <Image
                source={require('../../../../assets/images/AppleWatchSeries31.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            )}
            {showGarmin && (
              <Image
                source={require('../../../../assets/images/Garmin_HRMRUN_Sensor1.png')}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            )}
            {showMessage && <MessageButton onPress={onMessageButtonPress} />}
          </View>
          <MetricValueContainer>
            <MetricValue>{MetricValue2}</MetricValue>
            <MetricLabel>hrs</MetricLabel>
          </MetricValueContainer>
        </MetricContainer>
        <GraphContainer>
          <ActivityTimeGraph filterType={filterType} activitiesData={data} />
        </GraphContainer>
      </MetricContainer2>
    </Container>
  );
};

export default ActivitiesPanel;
