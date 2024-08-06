import React, {useEffect, useMemo, useState} from 'react';
import {Animated} from 'react-native';
import {
  BotContainer,
  BotText,
  Container,
  Dot,
  MessageText,
} from './suggestion.style.tsx';
import useAnimateText from '../../../../utils/animateText.tsx';
import {useTheme} from 'styled-components/native';
import {MessageIcon, TimeText} from '../comment/comment.style.tsx';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';

interface NotificationProps {
  BotTextContent: string;
  TimeTextContent: string;
  MessageTextContent: string;
  TimeTextColor?: string;
}

const SuggestionComp: FunctionComponent<NotificationProps> = ({
  BotTextContent = 'Athlea',
  TimeTextContent,
  MessageTextContent,
  TimeTextColor = 'black',
  botType = 'default',
}) => {
  const theme = useTheme();
  const [colorAnim] = useState(new Animated.Value(0)); // Initialize animation value

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.secondary, TimeTextColor], // Start with theme.secondary, end with TimeTextColor
  });

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
          iconSize: 1.25,
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
          iconSize: 1.25,
          size: 5.5,
        };
      default:
        // Return values for default botType with an additional flag to indicate default rendering
        return {
          botIconName: 'athleaiconsvg',
          BotTextContent: 'Athlea',
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
          <BotText>{BotTextContent}</BotText>
          <Dot />
          <Animated.Text style={{color: textColor, fontSize: 16}}>
            {TimeTextContent}
          </Animated.Text>
        </BotContainer>
      );
    } else {
      return (
        <BotContainer>
          <GradientContainer size={size} gradientColors={gradientColors}>
            <MessageIcon
              theme={theme}
              size={iconSize}
              name={botIconName}
              color="white"
            />
          </GradientContainer>
          <BotText
            style={{
              marginLeft: 8,
            }}>
            {botText}
          </BotText>
          <Dot />
          <Animated.Text style={{color: textColor, fontSize: 16}}>
            {TimeTextContent}
          </Animated.Text>
        </BotContainer>
      );
    }
  };

  return (
    <Container>
      {renderBotIcon()}
      <MessageText>{useAnimateText(MessageTextContent, 5)}</MessageText>
    </Container>
  );
};

export default SuggestionComp;
