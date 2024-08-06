import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {
  MessageContainer,
  MessageText,
} from '../description/Description.style.tsx';

const StatComp = ({MessageContent, MessageWidth = 80}) => {
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  const theme = useTheme();
  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyText();

  // Define your highlightedSections, actions, and graphTypes based on your application's needs
  const highlightedSections = [
    {
      text: 'relaxation techniques',
      reference: 'source',
      sourceUrl:
        'https://www.sports-fitness.co.uk/blog/what-is-the-point-of-doing-hill-repeats#:~:text=Even%20for%20those%20who%20race,an%20explosive%20level%20of%20power.',
    },
    {
      text: 'cardiovascular health and long-term fitness goals',
      reference: 'source',
      sourceUrl: 'https://www.example.com/cardiovascular-health',
    },
    {
      text: 'oxygen utilization',
      reference: 'highlight',
      // An example URL, you should replace this with the actual resource or reference
      sourceUrl: 'https://www.example.com/oxygen-utilization',
    },
    {
      text: 'solid foundation of aerobic fitness',
      reference: 'source',
      sourceUrl:
        'https://www.healthline.com/health/exercise-fitness/aerobic-exercise-examples#benefits',
    },
    {
      text: 'exertion profile',
      reference: 'source',
      sourceUrl:
        'https://complementarytraining.net/how-to-create-individualized-exercise-profile-in-strength-training-part-4-velocityexertion-profile/',
    },
    {
      text: 'benchmarks set by athletes within your age group',
      reference: 'source',
      sourceUrl: 'https://www.cdc.gov/physicalactivity/basics/age-chart.html',
    },
  ]; // This should be an array of objects containing text and sourceUrl
  const actions = [
    {
      text: 'track these changes',
      actionType: 'action',
      category: 'strength',
      bodyPart: 'full body',
    },
    {
      text: 'gradually increasing your workout intensity',
      actionType: 'action',
      category: 'endurance',
      bodyPart: 'full body',
    },
    {
      text: 'Keep monitoring',
      actionType: 'action',
      // Details related to the action, replace with actual values as per your application
      category: 'endurance',
      bodyPart: 'full body',
    },
    {
      text: 'well-maintained conditioning program',
      actionType: 'action',
      // Details related to the action, replace with actual values as per your application
      category: 'endurance',
      bodyPart: 'full body',
    },
  ]; // This should be an array of objects containing text and actionType
  const graphType = [
    {
      type: 'graphType',
      graphType: 'linetrend',
      graphHeader: 'Heart Rate',
      graphLabel: 'bpm',
      graphScore: '',
      text: 'higher than usual',
      data: [
        {date: '2024-02-27', highlight: false, load: 51.32},
        {date: '2024-02-28', highlight: false, load: 47.34},
        {date: '2024-02-29', highlight: false, load: 45.65},
        {date: '2024-03-01', highlight: false, load: 46.03},
        {date: '2024-03-02', highlight: false, load: 45.8},
        {date: '2024-03-03', highlight: false, load: 58.35},
        {date: '2024-03-04', highlight: false, load: 44.05},
        {date: '2024-03-05', highlight: false, load: 47.63},
        {date: '2024-03-06', highlight: false, load: 50.17},
        {date: '2024-03-07', highlight: false, load: 62.98},
      ],
    },
    {
      type: 'graphType',
      graphChart: 'monthlytrend',
      graphHeader: 'Monthly Activity Load',
      graphLabel: 'Hours',
      graphScore: '',
      text: 'monthly ebb and flow',
      data: [
        {date: '2024-02-01', highlight: false, load: 30},
        {date: '2024-02-08', highlight: false, load: 28},
        {date: '2024-02-15', highlight: false, load: 25},
        {date: '2024-02-22', highlight: true, load: 20},
        {date: '2024-02-29', highlight: false, load: 22},
      ],
    },
    {
      type: 'graphType',
      graphType: 'bartrend',
      graphHeader: 'Activity Intensity',
      graphLabel: 'Intensity Level',
      graphScore: '',
      text: 'dynamic training',
      data: [
        {date: '2024-02-29', highlight: false, load: 50},
        {date: '2024-03-01', highlight: false, load: 55},
        {date: '2024-03-02', highlight: false, load: 60},
        {date: '2024-03-03', highlight: false, load: 65},
        {date: '2024-03-04', highlight: true, load: 70},
        {date: '2024-03-05', highlight: false, load: 75},
        {date: '2024-03-06', highlight: false, load: 80},
        {date: '2024-03-07', highlight: false, load: 85},
      ],
    },
    {
      type: 'graphType',
      graphType: 'bartrend',
      graphHeader: 'Weekly VO2 Max Levels',
      graphLabel: 'ml/kg/min',
      graphScore: '',
      text: 'VO2 max levels',
      data: [
        {date: '2024-02-06', highlight: 'False', load: 35},
        {date: '2024-02-13', highlight: 'False', load: 36},
        {date: '2024-02-20', highlight: 'False', load: 37},
        {date: '2024-02-27', highlight: 'True', load: 38},
      ],
    },
    {
      type: 'graphType',
      graphType: 'linetrend',
      graphHeader: 'Weekly Heart Rate Consistency',
      graphLabel: 'bpm',
      graphScore: '',
      text: 'last weeks graph',
      data: [
        {date: '2024-02-22', highlight: 'False', load: 58},
        {date: '2024-02-23', highlight: 'False', load: 59},
        {date: '2024-02-24', highlight: 'False', load: 57},
        {date: '2024-02-25', highlight: 'False', load: 60},
        {date: '2024-02-26', highlight: 'False', load: 61},
        {date: '2024-02-27', highlight: 'False', load: 59},
        {date: '2024-02-28', highlight: 'False', load: 62},
      ],
    },
    {
      type: 'graphType',
      graphType: 'linetrend',
      graphHeader: 'Monthly Heart Rate',
      graphLabel: 'bpm',
      graphScore: '',
      text: 'a bit low relative to your usual metrics',
      data: [
        {date: '2024-01-15', highlight: 'False', load: 55},
        {date: '2024-01-22', highlight: 'False', load: 54},
        {date: '2024-01-29', highlight: 'False', load: 53},
        {date: '2024-02-05', highlight: 'False', load: 52},
        {date: '2024-02-12', highlight: 'False', load: 56},
        {date: '2024-02-19', highlight: 'False', load: 54},
        {date: '2024-02-26', highlight: 'False', load: 55},
      ],
    },
    {
      type: 'graphType',
      graphType: 'zones',
      graphHeader: 'Heart Rate Zones',
      graphLabel: 'Time Spent',
      graphScore: '',
      text: 'spent more time in the higher intensity zones',
      data: [
        {
          zone: 'Zone 5',
          bpmRange: '> 163 BPM',
          time: '4:00',
          percentage: '1%',
          color: '#FF6B6B', // softer red
        },
        {
          zone: 'Zone 4',
          bpmRange: '146 - 163 BPM',
          time: '2:01:45',
          percentage: '41%',
          color: '#FFD26B', // softer orange
        },
        {
          zone: 'Zone 3',
          bpmRange: '127 - 145 BPM',
          time: '1:24:54',
          percentage: '29%',
          color: '#6BFF8F', // softer green
        },
        {
          zone: 'Zone 2',
          bpmRange: '109 - 126 BPM',
          time: '53:40',
          percentage: '18%',
          color: '#6BCBFF', // softer blue
        },
        {
          zone: 'Zone 1',
          bpmRange: '91 - 108 BPM',
          time: '31:27',
          percentage: '11%',
          color: '#B8B8B8', // softer grey
        },
      ],
    },
    {
      type: 'graphType',
      graphType: 'linetrend',
      graphHeader: 'VO2 Max',
      graphLabel: 'ml/kg/min',
      graphScore: '',
      text: 'optimal performance levels',
      data: [
        {date: '2024-02-26', highlight: 'False', load: 36.0},
        {date: '2024-02-27', highlight: 'False', load: 36.5},
        {date: '2024-02-28', highlight: 'False', load: 37.2},
        {date: '2024-02-29', highlight: 'False', load: 37.8},
        {date: '2024-03-01', highlight: 'False', load: 38.3},
        {date: '2024-03-02', highlight: 'False', load: 38.7},
        {date: '2024-03-03', highlight: 'True', load: 39.5},
      ],
    },
  ]; // This should be an array of objects containing text and graph-related properties

  // Directly use renderBodyText without useMemo as there's no animation to wait for
  const processedBodyText = renderBodyText(
    MessageContent,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
  );

  return (
    <View>
      <MessageContainer width={MessageWidth}>
        <MessageText>{processedBodyText}</MessageText>
      </MessageContainer>
    </View>
  );
};

export default StatComp;
