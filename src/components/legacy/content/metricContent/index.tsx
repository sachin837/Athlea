import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFilter} from '../../../../contexts/FilterContext.tsx';
import FullMetricGraph from '../../graphs/fullMetricGraph';
import WeekRectangleLineGraph from '../../graphs/fullRectangleLineGraph/week';
import TimeSelector from '../../selectors/TimeSelector';
import {
  Container,
  DescriptorContainer,
  GraphContainer,
  GraphInfoContainer,
  HeaderContainer,
  Icon,
  MetricColumnContainer,
  MetricContainer,
  MetricGraphContainer,
  MetricHeader,
  MetricLabel,
  MetricTitleContainer,
  MetricValue,
  MetricValueContainer,
  SelectorContainer,
  SubDescriptorText,
  SubheaderContainer,
  SubheaderText,
  ValueDescriptionText,
} from './metricContent.style.tsx';
import {ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingIndicator from '../../loading';
import {View} from 'react-native';
import RectangleLineGraph from '../../graphs/fullMetricGraph/RectangleLineGraph.tsx';
import {threads} from '../../../../data/threads.ts';
import {useNavigation} from '@react-navigation/native';
import DescriptionComp from '../../message/description';
import GraphInfo from '../../graphInfo';
import GraphStatTypeInfo from '../../graphStatTypeInfo';
import {createSelector} from '@reduxjs/toolkit';
import ValueRectangleLineGraph from '../../graphs/fullRectangleLineGraph/week/ValueRectangleLineGraph.tsx';
import NumbRectangleLineGraph from '../../graphs/fullRectangleLineGraph/week/NumbRectangleLineGraph.tsx';
import StatComp from '../../message/stat';
import CommentActiveComp from '../../message/commentActive';

const getData = state => state.filters.data;

// Dynamic selector factory
const makeSelectDataForStatType = statType =>
  createSelector([getData], data => {
    switch (statType) {
      case 'heartRate':
        return data.map(item => ({
          date: item.date,
          load: item.heartRate, // This will be used for the rectangle line graph
          value: item.hrv, // This will be used for the week rectangle line graph
          numb: item.rhr, // This will be used for the week rectangle line graph
        }));
      case 'vo2':
        return data.map(item => ({
          date: item.date,
          load: item.vo2,
          value: item.vo2Variability,
        }));
      case 'distance':
        return data.map(item => ({
          date: item.date,
          load: item.distance,
          value: item.steps,
          numb: item.flightsClimbed,
        }));
      // Add other cases as needed
      default:
        return [];
    }
  });

const MetricContent = ({
  MetricText,
  DateText,
  IconSize,
  IconName,
  statConfig,
  statType,
  MetricHeaderText1,
  MetricValue1,
  MetricLabel1,
  MetricHeaderText2,
  MetricValue2,
  MetricLabel2,
  SubDescriptorText1,
  SubDescriptorText2,
}: {
  MetricText: string;
  DateText: string;
  DescriptorText: string;
  MetricHeaderText1: string;
  MetricValue1: string;
  MetricLabel1: string;
  MetricHeaderText2: string;
  MetricValue2: string;
  MetricLabel2: string;
  IconSize: number;
  IconName: string;
  statConfig: any;
  SubDescriptorText1: string;
  SubDescriptorText2: string;
}) => {
  const dispatch = useDispatch();
  const {
    filterType,
    isLoading,
    data,
    avgHRV,
    minRHR,
    maxHR,
    meanVO2,
    vo2Variance,
    vo2Variability,
    meanDistance,
    distanceVariance,
    distanceStandardDeviation,
    distanceCV,
  } = useSelector(state => state.filters);
  const navigation = useNavigation();

  const selectDataForStatType = useMemo(
    () => makeSelectDataForStatType(statType),
    [statType],
  );
  const dataForStatType = useSelector(state => selectDataForStatType(state));

  const {averageLoad, maxLoad, minLoad} = useMemo(() => {
    // Directly work with the 'load' since it represents the value of interest
    const loadValues = dataForStatType.map(item => item.load);
    const totalLoad = loadValues.reduce((acc, curr) => acc + curr, 0);
    const averageLoad =
      loadValues.length > 0 ? totalLoad / loadValues.length : 0;
    const maxLoad = Math.max(...loadValues);
    const minLoad = Math.min(...loadValues);

    return {averageLoad, maxLoad, minLoad};
  }, [dataForStatType]);

  // Conditionally display the heart rate related metrics only if statType is 'heartRate'
  const displayHeartRateMetrics = statType === 'heartRate'; // Adjust based on your actual condition
  const displayVO2Metrics = statType === 'vo2'; // Adjust based on your actual condition
  const displayDistanceMetrics = statType === 'distance'; // Adjust based on your actual condition

  const prevFilterTypeRef = useRef(filterType);
  useEffect(() => {
    if (filterType !== prevFilterTypeRef.current) {
      prevFilterTypeRef.current = filterType;
    }
  }, [filterType, dispatch]);

  // Debug logging to verify the values are present and correct
  useEffect(() => {
    console.log('avgHRV:', avgHRV, 'minRHR:', minRHR, 'maxHR:', maxHR);
  }, [avgHRV, minRHR, maxHR]);

  const dynamicTexts = useMemo(() => {
    console.log('Recomputing dynamic texts:', {filterType, statConfig});
    if (statConfig) {
      const headerText1 = statConfig.getHeaderText1(filterType);
      const headerText2 = statConfig.getHeaderText2(filterType);
      const metricValue1 = statConfig.getMetricValue1(filterType).toString();
      const metricValue2 = statConfig.getMetricValue2(filterType).toString();
      const description = statConfig.getDescription(filterType).toString();

      return {
        headerText1,
        headerText2,
        metricValue1,
        metricValue2,
        description,
      };
    }
    return {
      headerText1: '',
      headerText2: '',
      metricValue1: '',
      metricValue2: '',
      description: '',
    };
  }, [filterType, statConfig]);

  const onCommentSelect = headerText => {
    // Mark selection as made

    // Optional: Immediately navigate if the suggestion matches a thread header text
    // This part is up to your app's flow and whether you want to navigate right away
    const selectedThread = threads.find(
      thread =>
        thread.ThreadHeaderText.toLowerCase() === headerText.toLowerCase(),
    );
    if (selectedThread) {
      navigation.navigate('ResponsePage', {selectedThread});
    } else {
      console.log('No matching thread found for suggestion:', suggestion);
      // Handle the case where no matching thread is found if needed
    }
  };

  const onMetricSelect = metricText => {
    // Assuming threads array is accessible here
    const selectedThread = threads.find(thread =>
      thread.ThreadHeaderText.toLowerCase().includes(metricText.toLowerCase()),
    );

    if (selectedThread) {
      navigation.navigate('ResponsePage', {selectedThread});
    } else {
      console.log('No matching thread found for metric:', metricText);
      // Handle the case where no matching thread is found if needed
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 300,
        }}>
        <LoadingIndicator />
      </View>
    );
  }
  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <HeaderContainer>
          <SubheaderContainer>
            <Icon name={IconName} size={IconSize} />
            <SubheaderText>{MetricText}</SubheaderText>
            <Icon
              name="comment"
              size={16}
              marginLeft={4}
              color="grey"
              onPress={() => onMetricSelect(MetricText)}
            />
          </SubheaderContainer>
          <ValueDescriptionText>{DateText}</ValueDescriptionText>
        </HeaderContainer>

        <MetricGraphContainer>
          <RectangleLineGraph data={dataForStatType} />
        </MetricGraphContainer>
        {/* <SubDescriptorText>{DescriptorText}</SubDescriptorText> */}
        <View
          style={{
            paddingHorizontal: 26,
          }}>
          <CommentActiveComp
            MessageContent={dynamicTexts.description}
            TimeTextContent="last updated 1 minute"
            animate={true}
          />
        </View>
        {displayHeartRateMetrics && (
          <GraphStatTypeInfo
            AverageValue={averageLoad.toFixed(2)}
            MaxValue={maxLoad.toFixed(2)}
            MinValue={minLoad.toFixed(2)}
            StatTypeUnit={'bpm'}
          />
        )}
        {displayVO2Metrics && (
          <GraphStatTypeInfo
            AverageValue={averageLoad.toFixed(2)}
            MaxValue={maxLoad.toFixed(2)}
            MinValue={minLoad.toFixed(2)}
            StatTypeUnit={'ml/kg/min'}
          />
        )}
        {displayDistanceMetrics && (
          <GraphStatTypeInfo
            AverageValue={averageLoad.toFixed(2)}
            MaxValue={maxLoad.toFixed(2)}
            MinValue={minLoad.toFixed(2)}
            StatTypeUnit={'km'}
          />
        )}
        <MetricColumnContainer>
          <MetricContainer>
            <MetricTitleContainer>
              <MetricHeader>{dynamicTexts.headerText1}</MetricHeader>
              <Icon
                name="comment"
                size={16}
                marginLeft={4}
                color="grey"
                onPress={() => onCommentSelect(dynamicTexts.headerText1)}
              />
            </MetricTitleContainer>
            <MetricValueContainer>
              <MetricValue>{dynamicTexts.metricValue1}</MetricValue>
              <MetricLabel>{MetricLabel1}</MetricLabel>
            </MetricValueContainer>
          </MetricContainer>
          <GraphContainer>
            <ValueRectangleLineGraph data={dataForStatType} />
          </GraphContainer>
          <SubDescriptorText>{SubDescriptorText1}</SubDescriptorText>
        </MetricColumnContainer>
        <MetricColumnContainer>
          <MetricContainer>
            <MetricTitleContainer>
              <MetricHeader>{dynamicTexts.headerText2}</MetricHeader>
              <Icon
                name="comment"
                size={16}
                marginLeft={4}
                color="grey"
                onPress={() => onCommentSelect(dynamicTexts.headerText2)}
              />
            </MetricTitleContainer>
            <MetricValueContainer>
              <MetricValue>{dynamicTexts.metricValue2}</MetricValue>
              <MetricLabel>{MetricLabel2}</MetricLabel>
            </MetricValueContainer>
          </MetricContainer>
          <GraphContainer>
            <NumbRectangleLineGraph data={dataForStatType} />
          </GraphContainer>
          <SubDescriptorText>{SubDescriptorText2}</SubDescriptorText>
        </MetricColumnContainer>
      </ScrollView>
    </Container>
  );
};

export default MetricContent;
