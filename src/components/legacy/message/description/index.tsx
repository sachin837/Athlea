import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {MessageContainer, MessageText} from './Description.style.tsx';
import useAnimateTextWithCompletion from '../../../../utils/animateTextWithCompletion.tsx';

const DescriptionComp = ({
  MessageContent,
  animate = true,
  activity,
  speed = 2,
  MessageWidth = 80,
}) => {
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  const {animatedSections, isComplete} = useAnimateTextWithCompletion(
    MessageContent,
    speed,
  ); // Use new hook
  const prevMessageContent = useRef(MessageContent);
  const theme = useTheme();
  const isMounted = useRef(true);

  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyText();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (prevMessageContent.current !== MessageContent) {
      prevMessageContent.current = MessageContent;
      // No need to manually set animation completion status
    }
  }, [MessageContent]);

  const animatedText = animatedSections.join('');

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
        {date: '2024-02-29', highlight: 'False', load: 45.65},
        {date: '2024-03-01', highlight: 'False', load: 46.03},
        {date: '2024-03-02', highlight: 'False', load: 45.8},
        {date: '2024-03-03', highlight: 'False', load: 58.35},
        {date: '2024-03-04', highlight: 'False', load: 44.05},
        {date: '2024-03-05', highlight: 'False', load: 47.63},
        {date: '2024-03-06', highlight: 'False', load: 50.17},
        {date: '2024-03-07', highlight: 'False', load: 46.33},
        {date: '2024-03-08', highlight: 'False', load: 41.59},
        {date: '2024-03-09', highlight: 'False', load: 56.81},
        {date: '2024-03-10', highlight: 'False', load: 59.37},
        {date: '2024-03-11', highlight: 'False', load: 47.45},
        {date: '2024-03-12', highlight: 'False', load: 44.15},
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
      graphChart: 'linetrend',
      graphType: 'zones',
      graphHeader: 'Heart Rate Zones',
      graphLabel: 'Time Spent',
      graphScore: '',
      text: 'spent more time in the higher intensity zones',
      data: [
        {
          zone: 'Zone 5',
          bpmRange: '> 163 BPM',
          time: '00:00',
          percentage: '0%',
          color: '#FF6B6B', // Red indicating very high intensity
        },
        {
          zone: 'Zone 4',
          bpmRange: '146 - 163 BPM',
          time: '00:00',
          percentage: '0%',
          color: '#FFD26B', // Orange indicating high intensity
        },
        {
          zone: 'Zone 3',
          bpmRange: '127 - 145 BPM',
          time: '5:00',
          percentage: '10%',
          color: '#6BFF8F', // Green for moderate intensity
        },
        {
          zone: 'Zone 2',
          bpmRange: '109 - 126 BPM',
          time: '20:00',
          percentage: '80%',
          color: '#6BCBFF', // Blue for light intensity
        },
        {
          zone: 'Zone 1',
          bpmRange: '91 - 108 BPM',
          time: '10:00',
          percentage: '10%',
          color: '#B8B8B8', // Grey for very light intensity
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

  const animatedBodyText = useMemo(() => {
    return isComplete // Use isComplete directly from the hook
      ? renderBodyText(
          animatedText,
          highlightedSections,
          actions,
          graphType,
          setSelectedGraphIndex,
          selectedGraphIndex,
        )
      : animatedText;
  }, [
    isComplete, // Adjust dependency to isComplete
    animatedText,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
  ]);

  return (
    <View>
      {animate ? (
        <MessageContainer width={MessageWidth}>
          <MessageText>{animatedBodyText}</MessageText>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <MessageText>{MessageContent}</MessageText>
        </MessageContainer>
      )}
    </View>
  );
};

export default DescriptionComp;
