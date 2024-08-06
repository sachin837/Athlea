import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {MessageContainer, MessageHeader, MessageText} from './Report.style.tsx';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';
import {MessageIcon} from '../comment/comment.style.tsx';

const ReportCompMessage = ({
  header, // New prop for the header
  MessageContent,
  activity,
  speed = 5,
  MessageWidth = 80,
  handleActionPress,
  botType,
  bulletPoint = false,
  textRenderSize,
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  // const animatedTextSections = useAnimateText(MessageContent, 1);
  // const prevMessageContent = useRef(MessageContent);
  const theme = useTheme();
  const isMounted = useRef(true); // Ref to track if the component is mounted

  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyText({
    size: textRenderSize || 16,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when component unmounts
    };
  }, []);

  const highlightedSections = [
    {
      text: 'typical range for recreational athletes (0.3-0.5 g/min)',
      reference: 'source',
      sourceUrl:
        'https://jissn.biomedcentral.com/articles/10.1186/s12970-018-0207-1',
    },
    {
      text: 'muscular strength in endurance performance',
      reference: 'source',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/26838985/',
    },
    {
      text: 'movement economy, delay muscle fatigue, and prevent injuries.',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3355468/',
    },
    {
      text: 'efficient fat oxidation',
      reference: 'source',
      sourceUrl: 'https://www.example.com/efficient-fat-oxidation',
    },
    {
      text: 'Incorporating mental endurance strategies such as visualization, goal setting, and mindfulness',
      reference: 'source',
      sourceUrl: 'https://www.apa.org/monitor/2016/06/cover-mindfulness',
    },
    {
      text: 'These practices are crucial for facing the mental demands of endurance competitions',
      reference: 'source',
      sourceUrl: 'https://link.springer.com/article/10.1007/s12662-019-00593-4',
    },
    {
      text: 'robust aerobic foundation',
      reference: 'source',
      sourceUrl:
        'https://www.supwell.io/supbeat/the-runners-guide-to-aerobic-base-building',
    },
    {
      text: 'recovery strategies',
      reference: 'source',
      sourceUrl:
        'https://www.gssiweb.org/sports-science-exchange/article/sse-120-recovery-techniques-for-athletes',
    },
    {
      text: 'muscle recovery and growth',
      reference: 'highlight',
      sourceUrl: 'https://www.healthline.com/health/muscle-recovery',
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
      text: 'delayed muscle fatigue, and reduced injury risk',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK299282/',
    },
    {
      text: 'building aerobic capacity has notably improved your muscular strength',
      reference: 'source',
      sourceUrl:
        'https://www.sciencedirect.com/science/article/abs/pii/S2095254618301005',
    },
    {
      text: 'importance of rest in your physical development and muscle recovery',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2953297/',
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
    {
      text: 'indicates a superior aerobic capacity compared to the average for your age group',
      reference: 'source',
      sourceUrl:
        'https://www.ahajournals.org/doi/full/10.1161/CIRCULATIONAHA.107.734764',
    },
    {
      text: 'especially advantageous for endurance events like triathlons',
      reference: 'source',
      sourceUrl:
        'https://www.sciencedirect.com/science/article/abs/pii/S1440244015000734',
    },
    {
      text: 'in higher intensity zones, critical for enhancing overall endurance and sustaining effort during competitions',
      reference: 'source',
      sourceUrl:
        'https://www.tandfonline.com/doi/full/10.1080/17461391.2016.1185167',
    },
    {
      text: 'mental endurance techniques',
      reference: 'source',
      sourceUrl:
        'https://www.calm.com/blog/mental-strength#:~:text=Develop%20emotional%20regulation%20skills&text=Developing%20emotional%20regulation%20skills%20is,and%20enhance%20your%20mental%20resilience.',
    },
    {
      text: 'enhancing overall performance',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9540195/',
    },
    {
      text: 'maximal fat oxidation rate',
      reference: 'source',
      sourceUrl:
        'https://jissn.biomedcentral.com/articles/10.1186/s12970-018-0207-1',
    },
    {
      text: 'sparing glycogen and delaying fatigue',
      reference: 'source',
      sourceUrl:
        'https://link.springer.com/article/10.2165/00007256-198401060-00004#:~:text=Since%20fatigue%20rarely%20results%20from,it%20does%20not%20prevent%20fatigue.',
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
      text: 'prioritizing recovery',
      actionType: 'action',
      category: 'recovery',
      description:
        'Implement comprehensive recovery strategies focusing on rest, nutrition, hydration, and active recovery.',
    },
    {
      text: 'monitoring of recovery indicators',
      actionType: 'action',
      category: 'performance monitoring',
      description:
        'Regularly monitor indicators like heart rate variability to assess training readiness and adjust training schedules accordingly.',
    },
    {
      text: 'steady-state and interval training',
      actionType: 'action',
    },
    {
      text: 'monitoring of sleep',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'recovery',
      description:
        'Track your sleep duration and quality over the next week to identify any patterns or areas for improvement. Utilize sleep tracking tools or apps to gather data for a detailed analysis.',
    },
    {
      text: 'emphasizing healthy fats and strategic carbohydrate timing',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'recovery',
      description:
        'Track your sleep duration and quality over the next week to identify any patterns or areas for improvement. Utilize sleep tracking tools or apps to gather data for a detailed analysis.',
    },
    {
      text: 'visualization, goal setting, and mindfulness practices',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'recovery',
    },
    {
      text: 'consistent pre-sleep routine',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'Recovery',
      description:
        '•Ensure a consistent pre-sleep routine to further enhance sleep quality and potentially elevate the sleep score.',
    },
    {
      text: '5-minute breathing exercise',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'Recovery',
      description:
        '•Incorporate a 5-minute breathing exercise into your daily routine to potentially elevate the HRV score.',
    },
    {
      text: 'cool-down phase post-training',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'Recovery',
      description:
        '•Consider introducing a brief cool-down phase post-training to aid in a more immediate heart rate recovery.',
    },
    {
      text: 'balance meal',
      actionType: 'action',
      bodyPart: 'full body',
      category: 'Nutrition',
      description:
        '•Consume a balanced meal 2-3 hours before bedtime to potentially enhance sleep quality.',
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
      graphHeader: 'Ventilatory Thresholds',
      graphLabel: 'Threshold',
      graphScore: '',
      text: 'high ventilatory thresholds',
      data: [
        {date: '2024-02-29', highlight: false, load: 45.65},
        {date: '2024-03-01', highlight: false, load: 46.03},
        {date: '2024-03-02', highlight: false, load: 45.8},
        {date: '2024-03-03', highlight: true, load: 58.35},
        {date: '2024-03-04', highlight: false, load: 44.05},
        {date: '2024-03-05', highlight: false, load: 47.63},
        {date: '2024-03-06', highlight: false, load: 50.17},
        {date: '2024-03-07', highlight: false, load: 46.33},
        {date: '2024-03-08', highlight: false, load: 41.59},
        {date: '2024-03-09', highlight: false, load: 56.81},
        {date: '2024-03-10', highlight: true, load: 59.37},
        {date: '2024-03-11', highlight: false, load: 47.45},
        {date: '2024-03-12', highlight: false, load: 44.15},
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

  // Determine bot details and container type based on botType
  const {botIconName, botText, gradientColors, iconSize, size} = useMemo(() => {
    switch (botType) {
      case 'recovery':
        return {
          botIconName: 'recoveryicon',
          botText: 'Recovery',
          gradientColors: theme.gradients.recovery.colors,
          iconSize: 1.75,
          size: 5.5,
        };
      case 'wellbeing':
        return {
          botIconName: 'wellbeingicon',
          botText: 'Wellbeing',
          gradientColors: theme.gradients.wellbeing.colors,
          iconSize: 1.5,
          size: 5.5,
        };
      case 'strength':
        return {
          botIconName: 'strengthicon',
          botText: 'Strength',
          gradientColors: theme.gradients.strength.colors,
          iconSize: 1,
          size: 5.5,
        };
      case 'endurance':
        return {
          botIconName: 'enduranceicon',
          botText: 'Endurance',
          gradientColors: theme.gradients.endurance.colors,
          iconSize: 1.5,
          size: 5.5,
        };
      case 'nutrition':
        return {
          botIconName: 'nutritionicon',
          botText: 'Nutrition',
          gradientColors: theme.gradients.nutrition.colors,
          iconSize: 1.5,
          size: 5.5,
        };
      default:
        // Return values for default botType with an additional flag to indicate default rendering
        return {
          botIconName: 'athleaiconsvg',
          botText: 'Athlea',
          gradientColors: theme.gradients.endurance.colors,
          iconSize: 1.5,
          size: 5.5,
        };
    }
  }, [botType, theme]);

  const renderBotIcon = () => {
    if (botType !== 'default') {
      return (
        <GradientContainer size={size} gradientColors={gradientColors}>
          <MessageIcon
            theme={theme}
            size={iconSize}
            color="white"
            name={botIconName}
          />
        </GradientContainer>
      );
    }
    // No need to return anything for the default case
  };

  return (
    <MessageContainer>
      {/* For non-animated text, also use the combined message */}
      {bulletPoint ? (
        <View
          style={{
            paddingBottom: 10,
            paddingLeft: 10,
          }}>
          <MessageText>•{animatedBodyText}</MessageText>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {renderBotIcon()}
            <MessageHeader>{header}</MessageHeader>
          </View>
          <MessageText>{animatedBodyText}</MessageText>
        </>
      )}
    </MessageContainer>
  );
};

export default ReportCompMessage;
