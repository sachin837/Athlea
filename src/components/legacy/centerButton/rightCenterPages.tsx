import {View} from 'react-native';
import {RightPageButton} from '../pageButton';
import React from 'react';
import {useTheme} from 'styled-components/native';
import styled from 'styled-components';
import {CircleContainer, RightCircleContainer} from './centerButton.style.tsx';
import {useNavigation} from '@react-navigation/native';

const calculatePosition = (angle, radius) => {
  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;

  // Calculate the x and y position
  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);

  return {
    left: radius - x, // Adjust x to position on the left semi-circle
    top: radius + y, // Adjust y because the top of the container is the 0,0 point
  };
};

// This function returns a styled component for a PageButton with the right position
const createStyledPageButton = (angle: number, radius: number) => {
  const {left, top} = calculatePosition(angle, radius);

  return styled(RightPageButton).attrs({})`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
  `;
};

const RightCenterPages = () => {
  const theme = useTheme();
  const radius = 200; // This is the radius of your circle container
  const navigation = useNavigation();

  // Create a styled component for each button
  const StrengthButton = createStyledPageButton(118, radius);
  const EnduranceButton = createStyledPageButton(150, radius);
  const RecoveryButton = createStyledPageButton(180, radius);
  const NutritionButton = createStyledPageButton(210, radius);
  const WellbeingButton = createStyledPageButton(242, radius);
  return (
    <RightCircleContainer>
      <StrengthButton
        onPress={() => navigation.navigate('StrengthPage')}
        size={13}
        disable={false}
        gradientColors={theme.gradients.strength.colors}
        name="strengthicon"
        textSize={16}
        iconSize={2}>
        Strength
      </StrengthButton>
      <EnduranceButton
        onPress={() => navigation.navigate('EndurancePage')}
        size={13}
        disable={false}
        gradientColors={theme.gradients.endurance.colors}
        name="enduranceicon"
        textSize={16}
        iconSize={3}>
        Endurance
      </EnduranceButton>
      <RecoveryButton
        onPress={() => navigation.navigate('RecoveryPage')}
        size={13}
        disable={false}
        gradientColors={theme.gradients.recovery.colors}
        name="recoveryicon"
        textSize={16}
        iconSize={3.5}>
        Recovery
      </RecoveryButton>
      <NutritionButton
        onPress={() => navigation.navigate('NutritionPage')}
        size={13}
        disable={false}
        gradientColors={theme.gradients.nutrition.colors}
        name="nutritionicon"
        textSize={16}
        iconSize={2.75}>
        Nutrition
      </NutritionButton>
      <WellbeingButton
        onPress={() => navigation.navigate('WellbeingPage')}
        size={13}
        disable={false}
        gradientColors={theme.gradients.wellbeing.colors}
        name="wellbeingicon"
        textSize={16}
        iconSize={2.75}>
        Wellbeing
      </WellbeingButton>
    </RightCircleContainer>
  );
};

export default RightCenterPages;
