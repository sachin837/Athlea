import React from 'react';
import {Text} from 'react-native';
import {
  ActivitiesContainer,
  ActivityLoadContainer,
  Container,
  DescriptorContainer,
  DescriptorText,
  HeaderContainer,
  HeaderTitle,
} from './suggested.style.tsx';
import {useTheme} from 'styled-components/native';
import TrainingItem from '../../trainingItem';

const SuggestedActivitiesPanel = ({openBottomSheet, selectedDate}) => {
  const theme = useTheme();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(selectedDate));

  return (
    <Container onPress={() => openBottomSheet()}>
      <ActivityLoadContainer>
        <HeaderContainer>
          <HeaderTitle>Daily Plan</HeaderTitle>
        </HeaderContainer>
      </ActivityLoadContainer>
      <ActivitiesContainer>
        <TrainingItem
          CategoryTitleText="Strength"
          TitleText="Strength Training"
          DateText={formattedDate}
          IconName="strengthicon"
          gradientColors={theme.gradients.strength.colors}
          iconSize={1.75}
        />
        <TrainingItem
          CategoryTitleText="Recovery"
          TitleText="Stretching Session"
          DateText={formattedDate}
          IconName="recoveryicon"
          gradientColors={theme.gradients.recovery.colors}
          iconSize={2.5}
        />
        <TrainingItem
          CategoryTitleText="Endurance"
          TitleText="Cycling Session"
          DateText={formattedDate}
          IconName="enduranceicon"
          gradientColors={theme.gradients.endurance.colors}
          iconSize={2.5}
        />
        <TrainingItem
          CategoryTitleText="Wellbeing"
          TitleText="Mindfulness Session"
          DateText={formattedDate}
          IconName="wellbeingicon"
          gradientColors={theme.gradients.wellbeing.colors}
          iconSize={2.4}
        />
      </ActivitiesContainer>
    </Container>
  );
};

export default SuggestedActivitiesPanel;
