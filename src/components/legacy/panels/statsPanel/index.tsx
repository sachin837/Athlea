import React, {useEffect} from 'react';
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
} from './statsPanel.style.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native';
import LoadingIndicator from '../../loading';
import CommentComp from '../../message/comment';
import MessageButton from '../../messageButton';

interface StatsPanelProps {
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

const StatsPanel = ({
  HeaderIconName,
  StatisticsText,
  MetricHeaderText1,
  MetricValue1,
  MetricLabel1,
  MetricHeaderText2,
  MetricValue2,
  MetricLabel2,
  IconSize,
  onPress,
  data,
  showMessage,
  showAppleWatch = false,
  showGarmin = false,
  onMessageButtonPress,
  IconColor,
}: StatsPanelProps) => {
  console.log('showAppleWatch', showAppleWatch);
  // Check if data is not empty before rendering

  if (data.length === 0) {
    return <Text></Text>;
  }

  // console.log('statsPanel', data);
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
            <MetricHeader>{MetricHeaderText1}</MetricHeader>
          </View>
          <MetricValueContainer>
            <MetricValue>{MetricValue1}</MetricValue>
            <MetricLabel>{MetricLabel1}</MetricLabel>
          </MetricValueContainer>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            {showMessage && <MessageButton onPress={onMessageButtonPress} />}

            {showAppleWatch && (
              <Image
                source={require('../../../../assets/images/AppleWatchSeries31.png')}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  marginLeft: 6,
                }}
              />
            )}
            {showGarmin && (
              <Image
                source={require('../../../../assets/images/Garmin_HRMRUN_Sensor1.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginLeft: 6,
                }}
              />
            )}
          </View>
        </MetricContainer>
        <GraphContainer>
          <HalfRectangleLineGraph data={data} />
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
          </View>
          <MetricValueContainer>
            <MetricValue>{MetricValue2}</MetricValue>
            <MetricLabel>{MetricLabel2}</MetricLabel>
          </MetricValueContainer>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            {showMessage && <MessageButton onPress={onMessageButtonPress} />}

            {showAppleWatch && (
              <Image
                source={require('../../../../assets/images/AppleWatchSeries31.png')}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  marginLeft: 6,
                }}
              />
            )}
            {showGarmin && (
              <Image
                source={require('../../../../assets/images/Garmin_HRMRUN_Sensor1.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginLeft: 6,
                }}
              />
            )}
          </View>
        </MetricContainer>
        <GraphContainer>
          <HalfRectangleLineGraph data={data} />
        </GraphContainer>
      </MetricContainer2>
    </Container>
  );
};

export default StatsPanel;
