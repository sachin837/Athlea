import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, Image} from 'react-native';
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
  UserMessageContainer,
} from './responseMessage.style.tsx';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import useAnimateTextWithCompletion from '../../../../utils/animateTextWithCompletion.tsx';
import {imageMap} from '../../content/addPersonContent';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';

const MessageComp = ({
  TimeTextContent,
  MessageContent,
  animate = false,
  activity,
  speed = 1, // Default speed value
  highlightedSections = [], // Default to an empty array if undefined
  actions = [], // Default to an empty array if undefined
  graphType = [], // Default to an empty object if undefined
  messageType,
  onAnimationComplete,
  handleActionPress,
  personName = '',
  personImageName = '',
}) => {
  const theme = useTheme();
  const {animatedSections, isComplete} = useAnimateTextWithCompletion(
    MessageContent,
    speed,
  ); // Updated to use the new hook output
  const [aiActive, setAiActive] = useState(false);

  const renderBodyText = useRenderBodyText({
    aiActive,
    size,
  });
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  console.log('actions:', actions);
  useEffect(() => {
    if (isComplete) {
      onAnimationComplete(true); // Call the callback with true when the animation completes
    } else {
      onAnimationComplete(false); // Call the callback with false when the animation is not complete
    }
  }, [isComplete, onAnimationComplete]); // Add onAnimationComplete to the dependency array
  // This ref and useEffect hook setup is no longer needed since we handle the animation completion inside the hook

  const animatedText = animatedSections.join('');

  // Determine bot details and container type based on botType
  const {botIconName, botText, gradientColors, iconSize, isDefault, size} =
    useMemo(() => {
      if (messageType === 'person') {
        return {
          botIconName: personImageName ? imageMap[personImageName] : 'person', // Fallback to 'person' if no image
          botText: personName, // Use the person's name
          isDefault: true, // To control the rendering logic
        };
      } else {
        const botDetails = {
          recovery: {
            botIconName: 'recoveryicon',
            botText: 'Recovery',
            gradientColors: theme.gradients.recovery.colors,
            iconSize: 1.75,
            size: 5.5,
          },
          wellbeing: {
            botIconName: 'wellbeingicon',
            botText: 'Wellbeing',
            gradientColors: theme.gradients.wellbeing.colors,
            iconSize: 1.25,
            size: 5.5,
          },
          strength: {
            botIconName: 'strengthicon',
            botText: 'Strength',
            gradientColors: theme.gradients.strength.colors,
            iconSize: 1,
            size: 5.5,
          },
          endurance: {
            botIconName: 'enduranceicon',
            botText: 'Endurance',
            gradientColors: theme.gradients.endurance.colors,
            iconSize: 1.5,
            size: 5.5,
          },
          nutrition: {
            botIconName: 'nutritionicon',
            botText: 'Nutrition',
            gradientColors: theme.gradients.nutrition.colors,
            iconSize: 1.25,
            size: 5.5,
          },
        }[messageType];

        return (
          botDetails || {
            botIconName: 'athleaiconsvg',
            botText: 'Athlea',
            iconSize: 1.7,
            isDefault: true,
          }
        );
      }
    }, [messageType, theme, personName, personImageName]);

  const renderBotIconOrImage = () => {
    if (!isDefault && gradientColors) {
      return (
        <GradientContainer
          size={size}
          gradientColors={gradientColors}
          marginRight={6}>
          <MessageIcon size={iconSize} name={botIconName} color="white" />
        </GradientContainer>
      );
    } else if (personImageName && imageMap[personImageName]) {
      return (
        <Image
          source={imageMap[personImageName]}
          style={{width: 26, height: 26, marginRight: 6}}
        />
      );
    } else {
      return (
        <MessageIcon
          name={botIconName}
          size={1.7}
          color={theme.black}
          marginRight={6}
        />
      );
    }
  };

  const bodyText = useMemo(() => {
    if (animate) {
      // Use renderBodyText when animation is complete and animate is true
      return renderBodyText(
        animatedText,
        highlightedSections,
        actions,
        graphType,
        setSelectedGraphIndex,
        selectedGraphIndex,
        handleActionPress,
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
        handleActionPress,
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
    handleActionPress,
  ]);

  const renderedContent = () => {
    switch (messageType) {
      case 'activity':
        return <MessageText>{bodyText}</MessageText>;
      case 'text':
        return <MessageText>{bodyText}</MessageText>;
      case 'source':
        return (
          <MessageText>
            {'The source '}
            <Text style={{color: theme.secondary}}>{bodyText}</Text>
            {' was added'}
          </MessageText>
        );

      case 'data':
        return (
          <MessageText>
            {'The data '}
            <Text style={{color: theme.fourth}}>{bodyText}</Text>
            {' was added'}
          </MessageText>
        );
      case 'person':
        return <MessageText>{bodyText}</MessageText>;
      case 'user':
        return <MessageText>{bodyText}</MessageText>;
      case 'userdata':
        return <MessageText>{bodyText}</MessageText>;
      case 'usersource':
        return <MessageText>{bodyText}</MessageText>;
      default:
        return <MessageText>{bodyText}</MessageText>; // Default fallback
    }
  };

  const getIconName = messageType => {
    switch (messageType) {
      case 'activity':
        return 'athleaiconsvg'; // Replace 'activityicon' with the actual icon name for activity messages
      case 'text':
        return 'athleaiconsvg'; // Replace 'texticon' with the actual icon name for text messages
      case 'source':
        return 'athleaiconsvg'; // Replace 'sourceicon' with the actual icon name for source messages
      case 'data':
        return 'athleaiconsvg'; // Replace 'dataicon' with the actual icon name for data messages
      case 'person':
        return 'person'; // Replace 'personicon' with the actual icon name for person messages
      default:
        return 'athleaiconsvg'; // Replace 'defaulticon' with a default icon name
    }
  };

  return (
    <View style={{paddingBottom: 30}}>
      {messageType === 'user' ||
      messageType === 'userdata' ||
      messageType === 'usersource' ? (
        <UserMessageContainer>{renderedContent()}</UserMessageContainer>
      ) : (
        <>
          <MessageContainer>{renderedContent()}</MessageContainer>
          <HeaderContainer>
            <BotContainer>
              {renderBotIconOrImage()}
              <BotText>{botText}</BotText>
              <Dot />
              <TimeText>{TimeTextContent}</TimeText>
            </BotContainer>
          </HeaderContainer>
        </>
      )}
    </View>
  );
};

export default MessageComp;
