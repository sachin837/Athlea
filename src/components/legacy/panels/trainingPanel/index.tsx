import {Text, View} from 'react-native';
import React from 'react';
import {
  ActivityLoadContainer,
  ActivityText,
  Container,
  DailyActivityLoadContainer,
  GraphContainer,
  HeaderContainer,
  HeaderTitle,
  ScoreContainer,
  ScoreHeader,
  ScoreLabel,
  ScoreText,
  ScoreTextContainer,
  SubHeader,
  TrainingPhaseContainer,
  TrainingStressScoreContainer,
} from './trainingPanel.style.tsx';
import PageButtonRow from '../../pageButtonRow';
import {useTheme} from 'styled-components/native';
import {GradientContainer} from '../../pageButton/pageButton.style.tsx';
import TrainingPhaseGraph from '../../graphs/trainingPhases';
import HalfGraph from '../../graphs/halfGraph';
import ActivityGraph from '../../graphs/activityGraph';
import HalfLoadGraph from '../../graphs/halfGraph/halfLoadGraph.tsx';

const TrainingPanel = ({
  openBottomSheet,
  selectedDate,
  content,
  activitiesData,
}) => {
  const theme = useTheme();
  // Function to check if the selected date is today or before today
  const isTodayOrBefore = dateString => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day for comparison
    const selected = new Date(dateString);
    const formattedToday = today.toISOString().split('T')[0];
    const formattedSelected = selected.toISOString().split('T')[0];

    return formattedSelected <= formattedToday; // Compare based on formatted strings
  };

  // Use isTodayOrBefore to determine if selectedDate is today or before
  const showScoreContainer = isTodayOrBefore(selectedDate);

  const convertHoursToHoursAndMinutes = decimalHours => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return {hours, minutes};
  };

  const {hours, minutes} = convertHoursToHoursAndMinutes(
    content?.ActivityLoadHour || 0,
  );

  return (
    <Container onPress={() => openBottomSheet()}>
      <ActivityLoadContainer>
        <HeaderContainer>
          <HeaderTitle>Daily Load</HeaderTitle>
          <SubHeader>
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(selectedDate))}
          </SubHeader>
        </HeaderContainer>
      </ActivityLoadContainer>
      {showScoreContainer && (
        <TrainingStressScoreContainer>
          <ScoreContainer>
            <ScoreHeader>Activity Tracker</ScoreHeader>
            <ScoreTextContainer>
              <ActivityText>{content.Activities}</ActivityText>
              <ScoreLabel>Activities</ScoreLabel>
            </ScoreTextContainer>
          </ScoreContainer>
          <GraphContainer>
            <ActivityGraph
              selectedDate={selectedDate}
              activitiesData={activitiesData}
            />
          </GraphContainer>
        </TrainingStressScoreContainer>
      )}
      <TrainingStressScoreContainer>
        <ScoreContainer>
          <ScoreHeader>Training Stress Score</ScoreHeader>
          <ScoreTextContainer>
            <ScoreText>{content.TSS}</ScoreText>
            <ScoreLabel>TSS</ScoreLabel>
          </ScoreTextContainer>
        </ScoreContainer>
        <GraphContainer>
          <HalfGraph selectedDate={selectedDate} />
        </GraphContainer>
      </TrainingStressScoreContainer>
      <DailyActivityLoadContainer>
        <ScoreContainer>
          <ScoreHeader>Daily Activity Load</ScoreHeader>
          <ScoreTextContainer>
            <ScoreText>{hours}</ScoreText>
            <ScoreLabel paddingLeft={0}>hr</ScoreLabel>
            <ScoreText>{minutes}</ScoreText>
            <ScoreLabel paddingLeft={0}>min</ScoreLabel>
          </ScoreTextContainer>
        </ScoreContainer>
        <GraphContainer>
          <HalfLoadGraph selectedDate={selectedDate} />
        </GraphContainer>
      </DailyActivityLoadContainer>
    </Container>
  );
};

export default TrainingPanel;
