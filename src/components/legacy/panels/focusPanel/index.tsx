import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  Container,
  GraphContainer,
  MetricContainer,
  MetricContainer1,
  MetricHeader,
  MetricLabel,
  MetricValue,
  MetricValueContainer,
  StatsIcon,
} from './focusPanel.style.tsx';
import MessageButton from '../../messageButton';
import {Image} from 'react-native-svg';
import HalfRectangleLineGraph from '../../graphs/halfRectangeLineGraph';
import useCountdown from '../../../../hooks/useCountdown.tsx';
import {useTheme} from 'styled-components/native';

const FocusPanel = ({
  HeaderIconName,
  StatisticsText,
  MetricHeaderText1,
  MetricValue1,
  MetricLabel1,
  IconSize,
  onPress,
  data,
  showMessage,
  showAppleWatch = true,
  showGarmin = false,
  onMessageButtonPress,
  IconColor,
  expiryTime,
}) => {
  const countdown = useCountdown(expiryTime); // Use the hook to get the countdown
  const theme = useTheme();
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
              color={theme.third}
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
          {/* <HalfRectangleLineGraph data={data} /> */}
          <View style={styles.expiryTimeContainer}>
            <Text style={styles.expiryTimeText}>{countdown}</Text>
          </View>
        </GraphContainer>
      </MetricContainer1>
    </Container>
  );
};

export default FocusPanel;

const styles = StyleSheet.create({
  expiryTimeContainer: {
    position: 'absolute', // Adjust positioning as needed
    bottom: 24, // Place it below the graph
    right: 1, // Align to the right
    backgroundColor: '#000000', // Semi-transparent white
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiryTimeText: {
    fontSize: 14,
    color: '#ffffff', // Adjust as needed
  },
});
