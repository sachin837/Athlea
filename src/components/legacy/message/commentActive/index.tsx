import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {
  BotContainer,
  BotText,
  Dot,
  MessageIcon,
  MessageText,
  TimeText,
  MessageContainer,
  HeaderContainer,
  IconContainer,
} from './commentActive.style.tsx';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';
import {useNavigation} from '@react-navigation/native';
import useRenderBodyTextWithNumber from '../../../../hooks/useRenderBodyTextWithNumber.tsx';
import CircleNumber from '../../circleComponent';
import useAnimateTextWithCompletion from '../../../../utils/animateTextWithCompletion.tsx';

const CircleNumberUnit = ({number}) => (
  <View
    style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    }}>
    <Text style={{color: '#fff'}}>{number}</Text>
  </View>
);

const CommentActiveComp = ({
  TimeTextContent,
  MessageContent,
  animate = true,
  activity,
  speed,
  width,
  marginBottom = 0,
  botType = 'default',
  showIcons = true,
}) => {
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  const [aiActive, setAiActive] = useState(false);
  const {animatedSections, isComplete} = useAnimateTextWithCompletion(
    MessageContent,
    speed,
  ); // Use the new hook here
  const theme = useTheme();
  const navigation = useNavigation();
  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyTextWithNumber({
    aiActive,
  });

  const animatedText = animatedSections.join('');

  // Render based on ref value instead of state

  // Define your highlightedSections, actions, and graphTypes based on your application's needs
  const highlightedSections = useMemo(
    () => [
      {
        text: 'heart rate variability',
        reference: 'source',
        sourceUrl:
          'https://www.sports-fitness.co.uk/blog/what-is-the-point-of-doing-hill-repeats#:~:text=Even%20for%20those%20who%20race,an%20explosive%20level%20of%20power.',
        logic:
          "Monitoring your heart rate variability is crucial for understanding your body's stress levels and recovery status, optimizing training schedules accordingly.",
      },
      {
        text: 'High-Intensity Interval Training (HIIT)',
        logic:
          'Suggested by your recovery coach to improve cardiovascular health and enhance metabolic rate efficiently.',
        reference: 'source',
        sourceUrl:
          'https://www.hsph.harvard.edu/nutritionsource/high-intensity-interval-training/#:~:text=HIIT%20is%20a%20type%20of,periods%20of%20lower%20intensity%20movements.',
      },
      {
        text: 'improves anaerobic capacity',
        logic:
          'Suggested by your recovery coach as essential for boosting high-intensity performance and endurance.',
        reference: 'source',
        sourceUrl:
          'https://www.evoq.bike/blog/anaerobic-capacity-cycling#:~:text=You%20can%20improve%20anaerobic%20capacity,minimum%20of%20three%20minutes%20rest.',
      },
      {
        text: 'relaxation techniques',
        reference: 'source',
        sourceUrl:
          'https://www.sports-fitness.co.uk/blog/what-is-the-point-of-doing-hill-repeats#:~:text=Even%20for%20those%20who%20race,an%20explosive%20level%20of%20power.',
        logic:
          'Incorporating relaxation techniques is vital for stress reduction and enhancing overall mental well-being, aiding in recovery and performance.',
      },
      {
        text: 'cardiovascular health and long-term fitness goals',
        reference: 'source',
        sourceUrl: 'https://www.example.com/cardiovascular-health',
        logic:
          'Focusing on cardiovascular health is foundational to achieving and maintaining long-term fitness goals, supporting a healthy lifestyle.',
      },
      {
        text: 'oxygen utilization',
        reference: 'highlight',
        sourceUrl: 'https://www.example.com/oxygen-utilization',
        logic:
          'Optimizing oxygen utilization is key to improving endurance and efficiency during physical activity, directly impacting performance.',
      },
      {
        text: 'solid foundation of aerobic fitness',
        reference: 'source',
        sourceUrl:
          'https://www.healthline.com/health/exercise-fitness/aerobic-exercise-examples#benefits',
        logic:
          'Establishing a solid foundation of aerobic fitness is essential for enhancing endurance, stamina, and overall health.',
      },
      {
        text: 'exertion profile',
        reference: 'source',
        sourceUrl:
          'https://complementarytraining.net/how-to-create-individualized-exercise-profile-in-strength-training-part-4-velocityexertion-profile/',
        logic:
          'Understanding your exertion profile helps in customizing training intensity and volume for optimal performance and recovery.',
      },
      {
        text: 'benchmarks set by athletes within your age group',
        reference: 'source',
        sourceUrl: 'https://www.cdc.gov/physicalactivity/basics/age-chart.html',
        logic:
          'Comparing to benchmarks set by athletes within your age group offers motivation and context for setting realistic and challenging goals.',
      },
    ],
    [],
  );
  const actions = useMemo(
    () => [
      {
        text: 'Incorporating these types of interval training',
        actionType: 'action',
      },
      {
        text: 'pulled from your',
        actionType: 'action',
        logic: 'pulled from your Apple smart watch',
      },
    ],
    [],
  );
  const graphType = useMemo(
    () => [
      {
        type: 'graphType',
        graphType: 'bar',
        graphHeader: 'Aerobic building',
        graphLabel: 'mL/kg/min',
        graphScore: '46',
        logic:
          'This graph shows the improvement in your aerobic capacity over time, highlighting the effectiveness of your cardiovascular training regimen.',
        text: 'cardiovascular fitness',
        data: [
          {date: '2024-01-01', highlight: 'False', load: 46.03},
          {date: '2024-01-02', highlight: 'False', load: 45.8},
          {date: '2024-01-03', highlight: 'False', load: 58.35},
          {date: '2024-01-04', highlight: 'False', load: 44.05},
          {date: '2024-01-05', highlight: 'False', load: 47.63},
          {date: '2024-01-06', highlight: 'False', load: 50.17},
          {date: '2024-01-07', highlight: 'False', load: 46.33},
          {date: '2024-01-08', highlight: 'False', load: 41.59},
          {date: '2024-01-09', highlight: 'False', load: 56.81},
          {date: '2024-01-10', highlight: 'False', load: 59.37},
          {date: '2024-01-11', highlight: 'False', load: 47.45},
          {date: '2024-01-12', highlight: 'False', load: 44.15},
          {date: '2024-01-13', highlight: 'False', load: 53.36},
          {date: '2024-01-14', highlight: 'False', load: 41.73},
          {date: '2024-01-15', highlight: 'False', load: 57.2},
          {date: '2024-01-16', highlight: 'False', load: 45.85},
          {date: '2024-01-17', highlight: 'False', load: 47.13},
          {date: '2024-01-18', highlight: 'False', load: 40.01},
          {date: '2024-01-19', highlight: 'False', load: 58.56},
          {date: '2024-01-20', highlight: 'False', load: 44.55},
          {date: '2024-01-21', highlight: 'False', load: 40.02},
          {date: '2024-01-22', highlight: 'False', load: 52.55},
          {date: '2024-01-23', highlight: 'False', load: 53.22},
          {date: '2024-01-24', highlight: 'False', load: 47.03},
          {date: '2024-01-25', highlight: 'False', load: 40.96},
          {date: '2024-01-26', highlight: 'False', load: 55.19},
          {date: '2024-01-27', highlight: 'False', load: 51.73},
          {date: '2024-01-28', highlight: 'False', load: 44.92},
          {date: '2024-01-29', highlight: 'False', load: 45.65},
          {date: '2024-01-30', highlight: 'False', load: 59.74},
          {date: '2024-01-31', highlight: 'False', load: 52.36},
        ],
      },
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
          {date: '2024-03-07', highlight: true, load: 57.98},
        ],
      },
      {
        type: 'graphType',
        graphChart: 'monthlytrend',
        graphHeader: 'Monthly Activity Load',
        graphLabel: 'Hours',
        graphScore: '',
        text: 'monthly ebb and flow',
        logic:
          'By tracking your monthly activity load, this graph helps in understanding how your training volume fluctuates and impacts your fitness levels.',

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
        logic:
          'This bar graph showcases the varying intensity of your workouts, emphasizing the importance of dynamic training for balanced fitness.',
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
        logic:
          "Weekly tracking of VO2 Max levels in this graph underlines the progress in your body's ability to utilize oxygen, a key indicator of endurance.",
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
        logic:
          'This line graph illustrates the consistency of your heart rate over the past week, offering insights into cardiovascular efficiency and stress levels.',
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
        graphScore: '49',
        logic:
          'Observing monthly heart rate trends can help in identifying patterns in recovery, stress, and overall cardiovascular health.',
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
        logic:
          'This graph divides your workout into heart rate zones, allowing you to analyze the distribution of effort and optimize your training intensity.',
        text: 'spent more time in the higher intensity zones',
        data: [
          {
            zone: 'Zone 1',
            bpmRange: '91 - 108 BPM',
            time: '10:00',
            percentage: '10%',
            color: '#B8B8B8', // Grey for very light intensity
          },
          {
            zone: 'Zone 2',
            bpmRange: '109 - 126 BPM',
            time: '20:00',
            percentage: '80%',
            color: '#6BCBFF', // Blue for light intensity
          },
          {
            zone: 'Zone 3',
            bpmRange: '127 - 145 BPM',
            time: '5:00',
            percentage: '10%',
            color: '#6BFF8F', // Green for moderate intensity
          },
          {
            zone: 'Zone 4',
            bpmRange: '146 - 163 BPM',
            time: '0:00',
            percentage: '0%',
            color: '#FFD26B', // Orange indicating high intensity
          },

          {
            zone: 'Zone 5',
            bpmRange: '> 163 BPM',
            time: '0:00',
            percentage: '0%',
            color: '#FF6B6B', // Red indicating very high intensity
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
        logic:
          'Tracking VO2 Max trends helps gauge improvements in your body’s efficiency in using oxygen, directly correlating with aerobic fitness and endurance.',
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
    ],
    [],
  );

  const relevantHighlightedSections = useMemo(() => {
    return highlightedSections.filter(section =>
      MessageContent.includes(section.text),
    );
  }, [MessageContent, highlightedSections]);

  const relevantActions = useMemo(() => {
    return actions.filter(action => MessageContent.includes(action.text));
  }, [MessageContent, actions]);

  const relevantGraphTypes = useMemo(() => {
    return graphType.filter(graph => MessageContent.includes(graph.text));
  }, [MessageContent, graphType]);
  console.log('ai active', aiActive);

  const combinedItems = useMemo(() => {
    // Flatten all items with an additional property to indicate their type and position
    const allItems = [
      ...relevantHighlightedSections.map(item => ({
        ...item,
        type: 'highlighted',
        position: MessageContent.indexOf(item.text),
      })),
      ...relevantActions.map(action => ({
        ...action,
        type: 'action',
        position: MessageContent.indexOf(action.text),
      })),
      ...relevantGraphTypes.map(graph => ({
        ...graph,
        type: 'graphType',
        position: MessageContent.indexOf(graph.text),
      })),
    ];

    // Filter out items not found in the MessageContent (position === -1)
    const filteredItems = allItems.filter(item => item.position !== -1);

    // Sort the items by their position in MessageContent
    const sortedItems = filteredItems.sort((a, b) => a.position - b.position);

    // Map sorted items to a new array for rendering, removing the position property if no longer needed
    return sortedItems.map(({position, ...item}) => item);
  }, [
    MessageContent,
    relevantHighlightedSections,
    relevantActions,
    relevantGraphTypes,
  ]);

  // Logic to handle actions and rendering based on animation completion
  const animatedBodyText = useMemo(() => {
    return isComplete // Directly use isComplete from the new hook
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
    isComplete, // Depend on isComplete now
    animatedText,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
  ]);
  const handleNavigateToResponsePage = () => {
    // Filter highlightedSections to include only those mentioned in the MessageContent
    const relevantHighlightedSections = highlightedSections.filter(section =>
      MessageContent.includes(section.text),
    );

    // Filter actions to include only those mentioned in the MessageContent
    const relevantActions = actions.filter(action =>
      MessageContent.includes(action.text),
    );

    // For graphType, you might want to include it based on specific conditions,
    // such as if its text is mentioned in the MessageContent or other criteria
    const relevantGraphTypes = graphType.filter(graph =>
      MessageContent.includes(graph.text),
    );

    navigation.navigate('ResponsePage', {
      messageContent: MessageContent,
      highlightedSections: relevantHighlightedSections,
      actions: relevantActions,
      graphTypes: relevantGraphTypes,
    });
  };

  // Determine bot details and container type based on botType
  const {botIconName, botText, gradientColors, iconSize} = useMemo(() => {
    switch (botType) {
      case 'recovery':
        return {
          botIconName: 'recoveryicon',
          botText: 'Recovery',
          gradientColors: theme.gradients.recovery.colors,
          iconSize: 2.5,
        };
      case 'wellbeing':
        return {
          botIconName: 'wellbeingicon',
          botText: 'Wellbeing',
          gradientColors: theme.gradients.wellbeing.colors,
          iconSize: 2.5,
        };
      case 'strength':
        return {
          botIconName: 'strengthicon',
          botText: 'Strength',
          gradientColors: theme.gradients.strength.colors,
          iconSize: 2.5,
        };
      case 'endurance':
        return {
          botIconName: 'enduranceicon',
          botText: 'Endurance',
          gradientColors: theme.gradients.endurance.colors,
          iconSize: 2.5,
        };
      case 'nutrition':
        return {
          botIconName: 'nutritionicon',
          botText: 'Nutrition',
          gradientColors: theme.gradients.nutrition.colors,
          iconSize: 2.5,
        };
      default:
        // Return values for default botType with an additional flag to indicate default rendering
        return {
          botIconName: 'athleaiconsvg',
          botText: 'Athlea',
          isDefault: true,
        };
    }
  }, [botType, theme]);

  const renderBotIcon = () => {
    if (botType === 'default') {
      return (
        <BotContainer>
          <MessageIcon
            name={botIconName}
            size={1.7}
            color={theme.black}
            marginright={6}
          />
          <BotText>{botText}</BotText>
          <Dot />
          <TimeText>{TimeTextContent}</TimeText>
        </BotContainer>
      );
    } else {
      return (
        <GradientContainer size={iconSize} gradientColors={gradientColors}>
          <MessageIcon theme={theme} size={iconSize} name={botIconName} />
        </GradientContainer>
      );
    }
  };

  const handleAiIconPress = () => {
    setAiActive(!aiActive);
    console.log('AI Active State Changed:', !aiActive); // This will log the new state
  };

  useEffect(() => {
    console.log('Component Updated - aiActive:', aiActive);
  }, [aiActive]);

  console.log('Rendering Component - aiActive:', aiActive);
  if (aiActive) {
    highlightedSections.forEach((section, index) => {
      console.log(`Logic ${index + 1}:`, section.logic);
    });
  }

  const marginBottomValue = marginBottom ? marginBottom : 0;

  return (
    <>
      {activity ? (
        <MessageContainer>
          <MessageText>{MessageContent}</MessageText>
        </MessageContainer>
      ) : (
        <>
          <HeaderContainer>
            {renderBotIcon()}
            {showIcons && (
              <IconContainer>
                <MessageIcon
                  name="ai"
                  size={2.5}
                  color={aiActive ? theme.third : theme.primaryscale[9]}
                  marginright={8}
                  onPress={handleAiIconPress}
                />
                <MessageIcon
                  name="comment"
                  size={2.5}
                  color={theme.primaryscale[9]}
                  onPress={handleNavigateToResponsePage}
                />
              </IconContainer>
            )}
          </HeaderContainer>
          <MessageContainer width={width}>
            <MessageText>{animatedBodyText}</MessageText>
            {aiActive && (
              <View>
                {combinedItems.map((item, index) => (
                  <View
                    key={`item-${index}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingTop: 8,
                      width: '88%',
                    }}>
                    <View
                      style={{
                        paddingRight: 5,
                        paddingTop: 4,
                      }}>
                      <CircleNumber number={index + 1} />
                    </View>
                    {/* Use a single Text component with nested Text components for styling */}
                    <Text>
                      <Text>{item.logic}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </MessageContainer>
        </>
      )}
    </>
  );
};

export default CommentActiveComp;
