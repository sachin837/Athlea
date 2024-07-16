import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFilter} from '../../../../contexts/FilterContext.tsx';
import FullMetricGraph from '../../graphs/fullMetricGraph';
import WeekRectangleLineGraph from '../../graphs/fullRectangleLineGraph/week';
import TimeSelector from '../../selectors/TimeSelector';
import {
  Container,
  DescriptorContainer,
  FullActivityGraphContainer,
  GraphContainer,
  GraphInfoContainer,
  HeaderContainer,
  Icon,
  MetricColumnContainer,
  MetricContainer,
  MetricGraphContainer,
  MetricHeader,
  MetricLabel,
  MetricValue,
  MetricValueContainer,
  SelectorContainer,
  SubDescriptorText,
  SubheaderContainer,
  SubheaderText,
  ValueDescriptionText,
} from '../metricContent/metricContent.style.tsx';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native-svg';
import LoadingIndicator from '../../loading';
import {View} from 'react-native';
import FullActivityAmountGraph from '../../graphs/halfActivityAmountGraph';
import FullActivityTimeGraph from '../../graphs/halfActivityTimeGraph';
import HalfActivityAmountGraph from '../../graphs/halfActivityAmountGraph';
import HalfActivityTimeGraph from '../../graphs/halfActivityTimeGraph';
import FullActivityGraph from '../../graphs/fullActivityGraph';
import KeyField from '../../graphKey/components/KeyField.tsx';
import GraphKey from '../../graphKey';
import GraphInfo from '../../graphInfo';
import DescriptionComp from '../../message/description';

const ActivityContent = ({
  MetricText,
  DateText,
  DescriptorText,
  MetricHeaderText1,
  MetricValue1,
  MetricLabel1,
  MetricHeaderText2,
  MetricValue2,
  MetricLabel2,
  IconSize,
  IconName,
  statConfig,
  SubDescriptorText1,
  SubDescriptorText2,
  statType,
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
  const {data, filterType, isLoading} = useSelector(state => state.filters);
  const prevFilterTypeRef = useRef(filterType);

  const {averageTimeSpent, maxTimeSpent, minTimeSpent} = useMemo(() => {
    const timeSpentValues = data.map(item => item.activitiesTimeSpent); // Assuming this is the correct path to your value
    const total = timeSpentValues.reduce((acc, curr) => acc + curr, 0);
    const average = total / timeSpentValues.length;
    const max = Math.max(...timeSpentValues);
    const min = Math.min(...timeSpentValues);

    return {averageTimeSpent: average, maxTimeSpent: max, minTimeSpent: min};
  }, [data]);

  const calculateActivityMetrics = activitiesData => {
    // Initialize a map to count occurrences of each activity type
    let activityFrequency = new Map();
    let totalDuration = 0;

    activitiesData.forEach(({activityDetails}) => {
      activityDetails.forEach(({type, timeSpent}) => {
        // Increment the activity type count
        activityFrequency.set(type, (activityFrequency.get(type) || 0) + 1);
        // Accumulate the total duration
        totalDuration += timeSpent;
      });
    });

    // Calculate the most frequent activity
    let mostFrequentActivity = '';
    let maxCount = 0;
    activityFrequency.forEach((count, type) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentActivity = type;
      }
    });

    // Activity count is the sum of all individual activity entries
    const activityCount = activitiesData.reduce(
      (acc, curr) => acc + curr.activityDetails.length,
      0,
    );

    return {
      activityCount,
      mostFrequentActivity,
      totalDuration: filterType === 'Day' ? totalDuration : totalDuration * 60, // If filterType is not 'Day', convert hours to minutes
    };
  };

  // Example usage
  const {activityCount, mostFrequentActivity, totalDuration} =
    calculateActivityMetrics(data, filterType);

  const dynamicTexts = useMemo(() => {
    console.log('Recomputing dynamic texts:', {filterType, statConfig});
    if (statConfig) {
      const headerText1 = statConfig.getHeaderText1(filterType);
      const headerText2 = statConfig.getHeaderText2(filterType);
      const metricValue1 = statConfig.getMetricValue1(filterType).toString();
      const metricValue2 = statConfig.getMetricValue2(filterType).toString();
      const description = statConfig.getDescription(filterType).toString();

      console.log('Computed dynamicTexts:', {
        headerText1,
        headerText2,
        metricValue1,
        metricValue2,
        description,
      });

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
            <Icon name="stats" size={IconSize} />
            <SubheaderText>{MetricText}</SubheaderText>
          </SubheaderContainer>
          <ValueDescriptionText>{DateText}</ValueDescriptionText>
        </HeaderContainer>

        <FullActivityGraphContainer>
          <FullActivityGraph activitiesData={data} filterType={filterType} />
          <GraphKey />
        </FullActivityGraphContainer>

        <DescriptorContainer>
          <DescriptionComp
            MessageContent={dynamicTexts.description}
            MessageWidth={92}
          />
        </DescriptorContainer>
        <GraphInfoContainer>
          <GraphInfo
            AverageValue={averageTimeSpent.toFixed(2)}
            MaxValue={maxTimeSpent}
            MinValue={minTimeSpent}
            filterType={filterType}
            TotalDuration={totalDuration.toFixed(2)}
            ActivityCount={activityCount}
            MostFrequentActivity={mostFrequentActivity}
          />
        </GraphInfoContainer>
        <MetricColumnContainer>
          <MetricContainer>
            <MetricHeader>{dynamicTexts.headerText1}</MetricHeader>
            <MetricValueContainer>
              <MetricValue>{dynamicTexts.metricValue1}</MetricValue>
              <MetricLabel>{MetricLabel1}</MetricLabel>
            </MetricValueContainer>
          </MetricContainer>
          <GraphContainer>
            <HalfActivityAmountGraph
              filterType={filterType}
              activitiesData={data}
            />
          </GraphContainer>
          <SubDescriptorText>{SubDescriptorText1}</SubDescriptorText>
        </MetricColumnContainer>
        <MetricColumnContainer>
          <MetricContainer>
            <MetricHeader>{dynamicTexts.headerText2}</MetricHeader>
            <MetricValueContainer>
              <MetricValue>{dynamicTexts.metricValue2}</MetricValue>
              <MetricLabel>{MetricLabel2}</MetricLabel>
            </MetricValueContainer>
          </MetricContainer>
          <GraphContainer>
            <HalfActivityTimeGraph
              activitiesData={data}
              filterType={filterType}
            />
          </GraphContainer>
          <SubDescriptorText>{SubDescriptorText2}</SubDescriptorText>
        </MetricColumnContainer>
      </ScrollView>
    </Container>
  );
};

export default ActivityContent;
