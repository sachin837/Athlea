import React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'styled-components/native';
import {
  Container,
  GraphContainer,
  HeaderContainer,
  ScoreHeader,
  ScoreLabel,
  ScoreText,
  ScoreTextContainer,
} from './graphHeader.style.tsx';
import FullGraph from '../fullGraph';
import MessageButton from '../../messageButton';
import ResponseLineGraph from './components/ResponseLineGraph.tsx';
import ResponseBarGraph from './components/ResponseBarGraph.tsx';
import ResponseZoneGraph from './components/ResponseZoneGraph.tsx';
import {Image} from 'react-native';
import {View} from 'react-native';

interface Data {
  date: string;
  value: number;
}

interface Props {
  data: Data[];
  HeaderText: string;
  ScoreValue: string;
  ScoreLabelText: string;
  ScoreValue2?: string;
  ScoreLabel2?: string;
  DescriptionText?: string;
  color?: string;
  paddingLeft?: number;
  keywords?: string[];
  time?: boolean;
}

const GraphPlusHeaderGraph = ({
  data,
  HeaderText,
  ScoreValue,
  ScoreLabelText,
  ScoreValue2,
  ScoreLabel2,
  paddingLeft,
  color,
  time,
  graphType,
  deviceType = 'appleSeries3',
}: Props) => {
  const convertToHoursAndMinutes = value => {
    const hours = Math.floor(value);
    const minutes = Math.round((value % 1) * 60);
    return (
      <Text>
        <ScoreText>{hours}</ScoreText>
        <ScoreLabel>hr </ScoreLabel>
        <ScoreText>{minutes}</ScoreText>
        <ScoreLabel>min</ScoreLabel>
      </Text>
    );
  };

  console.log(
    'GraphPlusHeaderGraph Props:',
    data,
    HeaderText,
    ScoreValue,
    ScoreLabelText,
    ScoreValue2,
    ScoreLabel2,
    paddingLeft,
    color,
    time,
    graphType,
    deviceType,
  );

  const theme = useTheme();
  return (
    <Container>
      <HeaderContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ScoreHeader>{HeaderText}</ScoreHeader>
          {deviceType === 'appleSeries3' ? (
            <Image
              source={require('../../../../assets/images/AppleWatchSeries3.png')}
              style={{
                width: 26,
                height: 26,
                marginLeft: 6,
                resizeMode: 'contain',
              }}
            />
          ) : deviceType === 'garminHRM' ? (
            <Image
              source={require('../../../../assets/images/Garmin_HRMRUN_Sensor1.png')}
              style={{
                width: 28,
                height: 28,
                marginLeft: 4,
                marginTop: 2,
                resizeMode: 'contain',
              }}
            />
          ) : null}
        </View>
        <ScoreTextContainer>
          {!time && (
            <>
              <ScoreText color={color}>{ScoreValue}</ScoreText>
              <ScoreLabel paddingLeft={paddingLeft}>
                {ScoreLabelText}
              </ScoreLabel>
            </>
          )}
          {time && (
            <>
              <ScoreText color={color}>
                {convertToHoursAndMinutes(ScoreValue)}
              </ScoreText>
              <ScoreLabel paddingLeft={paddingLeft}>{ScoreLabel2}</ScoreLabel>
            </>
          )}
        </ScoreTextContainer>
      </HeaderContainer>
      <GraphContainer>
        {graphType === 'bar' ? (
          <ResponseBarGraph data={data} />
        ) : graphType === 'line' ? (
          <ResponseLineGraph data={data} />
        ) : graphType === 'zones' ? (
          <ResponseZoneGraph data={data} />
        ) : graphType === 'bartrend' ? (
          <ResponseBarGraph data={data} showTrendLine={true} />
        ) : graphType === 'linetrend' ? (
          <ResponseLineGraph data={data} showTrendLine={true} />
        ) : (
          <Text> Graph type not available </Text>
        )}
      </GraphContainer>
    </Container>
  );
};

export default GraphPlusHeaderGraph;
