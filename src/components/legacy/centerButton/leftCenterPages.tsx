import {View} from 'react-native';
import {LeftPageButton} from '../pageButton';
import React from 'react';
import {useTheme} from 'styled-components/native';
import styled from 'styled-components';
import {CircleContainer, LeftCircleContainer} from './centerButton.style.tsx';
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

  return styled(LeftPageButton).attrs({})`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
  `;
};

const LeftCenterPages = () => {
  const theme = useTheme();
  const radius = 200; // This is the radius of your circle container

  // Create a styled component for each button
  const TrainingPlanButton = createStyledPageButton(-50, radius);
  const StatisticsButton = createStyledPageButton(-15, radius);
  const ReportsButton = createStyledPageButton(20, radius);
  const NetworkButton = createStyledPageButton(55, radius);
  const navigation = useNavigation();
  return (
    <LeftCircleContainer>
      <TrainingPlanButton
        onPress={() => navigation.navigate('TrainingPlan')}
        size={13}
        disable={false}
        name="clock"
        textSize={16}
        iconSize={2.75}>
        Training Plan
      </TrainingPlanButton>
      <StatisticsButton
        onPress={() => navigation.navigate('StatisticsPage')}
        size={13}
        disable={false}
        name="stats"
        textSize={16}
        iconSize={2.75}>
        Statistics
      </StatisticsButton>
      <ReportsButton
        onPress={() => navigation.navigate('ReportPage')}
        size={13}
        disable={false}
        name="report"
        textSize={16}
        iconSize={2.75}>
        Reports
      </ReportsButton>
      <NetworkButton
        onPress={() => navigation.navigate('NetworkPage')}
        size={13}
        disable={false}
        name="person"
        textSize={16}
        iconSize={2.75}>
        Network
      </NetworkButton>
    </LeftCircleContainer>
  );
};

export default LeftCenterPages;
