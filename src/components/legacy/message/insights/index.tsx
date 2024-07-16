import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {
  MessageContainer,
  MessageHeader,
  MessageText,
} from './Insights.style.tsx';

const InsightsComp = ({
  header, // New prop for the header
  MessageContent,
  activity,
  speed = 5,
  MessageWidth = 80,
  handleActionPress,
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  // const animatedTextSections = useAnimateText(MessageContent, 1);
  // const prevMessageContent = useRef(MessageContent);
  const theme = useTheme();
  const isMounted = useRef(true); // Ref to track if the component is mounted

  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyText();

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when component unmounts
    };
  }, []);

  // useEffect(() => {
  //   if (prevMessageContent.current !== MessageContent) {
  //     prevMessageContent.current = MessageContent;
  //     setIsAnimationComplete(false); // Reset the animation completion state
  //   }
  // }, [MessageContent]);

  // const animatedText = animatedTextSections.join('');

  // useEffect(() => {
  //   if (isMounted.current) {
  //     // Check if the component is still mounted
  //     // Determine if the full text has been animated
  //     setIsAnimationComplete(animatedText === MessageContent);
  //   }
  // }, [animatedText, MessageContent]);

  // Define your highlightedSections, actions, and graphTypes based on your application's needs
  const highlightedSections = [
    {
      text: 'typical range for recreational athletes (0.3-0.5 g/min)',
      reference: 'source',
      sourceUrl:
        'https://jissn.biomedcentral.com/articles/10.1186/s12970-018-0207-1',
    },
    {
      text: ' efficient fat metabolism is a significant advantage for endurance sports',
      reference: 'source',
      sourceUrl:
        'https://www.gssiweb.org/sports-science-exchange/article/nutritional-factors-that-affect-fat-oxidation-rates-during-exercise',
    },
    {
      text: 'improves anaerobic capacity',
      reference: 'source',
      sourceUrl:
        'https://www.evoq.bike/blog/anaerobic-capacity-cycling#:~:text=You%20can%20improve%20anaerobic%20capacity,minimum%20of%20three%20minutes%20rest.',
    },
    {
      text: 'improving economy of movement, delaying muscle fatigue, and preventing injuries',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9319953/.',
    },
    {
      text: 'males aged 25-30 typically exhibit an average VO2max around 30-40 ml/kg/min',
      reference: 'source',
      sourceUrl: 'https://www.fitnescity.com/understanding-vo2-max',
    },
  ]; // This should be an array of objects containing text and sourceUrl
  const actions = [
    {
      text: 'supports fat oxidation, incorporating healthy fats and timing carbohydrate ',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'nutrition',
    },
    {
      text: 'Emphasizing both steady-state and interval training',
      actionType: 'action',
    },
  ]; // This should be an array of objects containing text and actionType
  const graphType = [
    {
      type: 'graphType',
      graphType: 'bar',
      graphHeader: 'Aerobic building',
      graphLabel: 'mL/kg/min',
      graphScore: '46',
      text: 'recovery techniques',
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
        {date: '2024-03-13', highlight: 'False', load: 53.36},
        {date: '2024-03-14', highlight: 'False', load: 41.73},
        {date: '2024-03-15', highlight: 'False', load: 57.2},
        {date: '2024-03-16', highlight: 'False', load: 45.85},
        {date: '2024-03-17', highlight: 'False', load: 47.13},
        {date: '2024-03-18', highlight: 'False', load: 40.01},
        {date: '2024-03-19', highlight: 'False', load: 58.56},
        {date: '2024-03-20', highlight: 'False', load: 44.55},
        {date: '2024-03-21', highlight: 'False', load: 40.02},
        {date: '2024-03-22', highlight: 'False', load: 52.55},
        {date: '2024-03-23', highlight: 'False', load: 53.22},
        {date: '2024-03-24', highlight: 'False', load: 47.03},
        {date: '2024-03-25', highlight: 'False', load: 40.96},
        {date: '2024-03-26', highlight: 'False', load: 55.19},
        {date: '2024-03-27', highlight: 'False', load: 51.73},
        {date: '2024-03-28', highlight: 'False', load: 44.92},
        {date: '2024-03-29', highlight: 'False', load: 45.65},
        {date: '2024-03-30', highlight: 'False', load: 45.65},
        {date: '2024-03-31', highlight: 'False', load: 45.65},
      ],
    },
    {
      type: 'graphType',
      graphType: 'linetrend',
      graphHeader: 'Heart Rate',
      graphLabel: 'bpm',
      graphScore: '',
      text: 'training regime',
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
      type: 'linetrend',
      graphType: 'linetrend',
      graphHeader: 'Ventilatory Thresholds Over Time',
      graphLabel: 'Threshold (VT1 & VT2)',
      graphScore: '',
      text: 'Observation of Ventilatory Thresholds',
      data: [
        {date: '2024-02-29', highlight: 'False', load: 45.65},
        {date: '2024-03-01', highlight: 'False', load: 46.03},
        {date: '2024-03-02', highlight: 'False', load: 45.8},
        {date: '2024-03-03', highlight: 'True', load: 58.35},
        {date: '2024-03-04', highlight: 'False', load: 44.05},
        {date: '2024-03-05', highlight: 'False', load: 47.63},
        {date: '2024-03-06', highlight: 'False', load: 50.17},
        {date: '2024-03-07', highlight: 'False', load: 46.33},
        {date: '2024-03-08', highlight: 'False', load: 41.59},
        {date: '2024-03-09', highlight: 'False', load: 56.81},
        {date: '2024-03-10', highlight: 'True', load: 59.37},
        {date: '2024-03-11', highlight: 'False', load: 47.45},
        {date: '2024-03-12', highlight: 'False', load: 44.15},
      ],
    },
  ]; // This should be an array of objects containing text and graph-related properties

  const animatedBodyText = useMemo(() => {
    return isAnimationComplete
      ? renderBodyText(
          MessageContent,
          highlightedSections,
          actions,
          graphType,
          setSelectedGraphIndex,
          selectedGraphIndex,
          handleActionPress,
        )
      : MessageContent; // Use combinedMessage here for animation
  }, [
    isAnimationComplete,
    MessageContent, // Update dependencies to include combinedMessage
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
    handleActionPress,
  ]);

  return (
    <View>
      <MessageContainer>
        {/* For non-animated text, also use the combined message */}
        <MessageHeader>{header}</MessageHeader>
        <MessageText>{animatedBodyText}</MessageText>
      </MessageContainer>
    </View>
  );
};

export default InsightsComp;
