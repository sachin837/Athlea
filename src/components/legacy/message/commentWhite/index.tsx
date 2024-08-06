import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
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
} from './commentWhite.style.tsx';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';
import {useNavigation} from '@react-navigation/native';

const CommentCompWhite = ({
  TimeTextContent,
  MessageContent,
  animate = true,
  activity,
  speed,
  botType = 'default',
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  const animatedTextSections = useAnimateText(MessageContent, speed);
  const prevMessageContent = useRef(MessageContent);
  const theme = useTheme();
  const isMounted = useRef(true); // Ref to track if the component is mounted
  const navigation = useNavigation();
  const {hideModal} = useModal();
  const renderBodyText = useRenderBodyText();

  const animatedText = animatedTextSections.join('');

  useEffect(() => {
    if (isMounted.current) {
      // Check if the component is still mounted
      // Determine if the full text has been animated
      setIsAnimationComplete(animatedText === MessageContent);
    }
  }, [animatedText, MessageContent]);

  // Render based on ref value instead of state

  // Define your highlightedSections, actions, and graphTypes based on your application's needs
  const highlightedSections = [
    {
      text: 'training regimen',
      reference: 'source',
      sourceUrl:
        'https://www.sports-fitness.co.uk/blog/what-is-the-point-of-doing-hill-repeats#:~:text=Even%20for%20those%20who%20race,an%20explosive%20level%20of%20power.',
    },
    {
      text: 'High-Intensity Interval Training (HIIT)',
      reference: 'source',
      sourceUrl:
        'https://www.hsph.harvard.edu/nutritionsource/high-intensity-interval-training/#:~:text=HIIT%20is%20a%20type%20of,periods%20of%20lower%20intensity%20movements.',
    },
    {
      text: 'improves anaerobic capacity',
      reference: 'source',
      sourceUrl:
        'https://www.evoq.bike/blog/anaerobic-capacity-cycling#:~:text=You%20can%20improve%20anaerobic%20capacity,minimum%20of%20three%20minutes%20rest.',
    },
  ]; // This should be an array of objects containing text and sourceUrl
  const actions = [
    {
      text: 'Incorporating these types of interval training',
      actionType: 'action',
    },
    {text: 'good warm-up routine', actionType: 'action'},
  ]; // This should be an array of objects containing text and actionType
  const graphType = [
    {
      type: 'graphType',
      graphType: 'bar',
      graphHeader: 'Aerobic building',
      graphLabel: 'mL/kg/min',
      graphScore: '46',
      text: 'foundational aerobic building',
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
  ]; // This should be an array of objects containing text and graph-related properties

  const animatedBodyText = useMemo(() => {
    if (animate) {
      // Use renderBodyText when animation is complete and animate is true
      return renderBodyText(
        animatedText,
        highlightedSections,
        actions,
        graphType,
        setSelectedGraphIndex,
        selectedGraphIndex,
      );
    } else {
      // Use renderBodyText directly with MessageContent when not animating
      return renderBodyText(
        MessageContent,
        highlightedSections,
        actions,
        graphType,
        setSelectedGraphIndex,
        selectedGraphIndex,
      );
    }
  }, [
    animate,
    animatedText,
    MessageContent,
    highlightedSections,
    actions,
    graphType,
    renderBodyText,
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
            color="white"
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

  return (
    <View>
      {activity ? (
        <MessageContainer>
          <MessageText>{MessageContent}</MessageText>
        </MessageContainer>
      ) : (
        <>
          <HeaderContainer>
            {renderBotIcon()}
            <IconContainer>
              <TouchableOpacity onPress={hideModal}>
                <MessageIcon
                  name="ok"
                  size={2.5}
                  color="white"
                  marginright={8}
                  onPress={hideModal}
                />
              </TouchableOpacity>
              <MessageIcon
                name="comment"
                size={2.5}
                color="white"
                onPress={handleNavigateToResponsePage}
              />
            </IconContainer>
          </HeaderContainer>
          {animate ? (
            <MessageContainer>
              <MessageText>{animatedBodyText}</MessageText>
            </MessageContainer>
          ) : (
            <MessageContainer>
              <MessageText>{MessageContent}</MessageText>
            </MessageContainer>
          )}
        </>
      )}
    </View>
  );
};

export default CommentCompWhite;
