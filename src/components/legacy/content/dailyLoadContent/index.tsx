import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  HeaderContainer,
  SubheaderText,
  ValueDescriptionText,
} from './dailyLoadContent.style.tsx';
import GraphPlusTextComponent from './component/GraphPlusText.tsx';
import {useTheme} from 'styled-components/native';

const ActivityData = [
  {date: '2024-02-28', value: 4, phase: 'Transition'},
  {date: '2024-02-29', value: 3, phase: 'Transition'},
  {date: '2024-03-01', value: 2, phase: 'Transition'},
  {date: '2024-03-02', value: 3, phase: 'Transition'},
  {date: '2024-03-03', value: 1, phase: 'Transition'},
  {date: '2024-03-04', value: 4, phase: 'Prep'},
  {date: '2024-03-05', value: 4, phase: 'Prep'},
  {date: '2024-03-06', value: 5, phase: 'Prep'},
  {date: '2024-03-07', value: 2, phase: 'Prep'},
  {date: '2024-03-08', value: 1, phase: 'Prep'},
  {date: '2024-03-09', value: 1, phase: 'Prep'},
  {date: '2024-03-10', value: 1, phase: 'Prep'},
  {date: '2024-03-11', value: 1, phase: 'General'},
  {date: '2024-03-12', value: 1, phase: 'General'},
  {date: '2024-03-13', value: 1, phase: 'General'},
  {date: '2024-03-14', value: 1, phase: 'General'},
  {date: '2024-03-15', value: 1, phase: 'General'},
  {date: '2024-03-16', value: 1, phase: 'General'},
  {date: '2024-03-17', value: 1, phase: 'General'},
  {date: '2024-03-18', value: 1, phase: 'General'},
  {date: '2024-03-19', value: 1, phase: 'General'},
  {date: '2024-03-20', value: 1, phase: 'General'},
  {date: '2024-03-21', value: 1, phase: 'Specific 1'},
  {date: '2024-03-22', value: 1, phase: 'Specific 1'},
  {date: '2024-03-23', value: 1, phase: 'Specific 1'},
  {date: '2024-03-24', value: 1, phase: 'Specific 1'},
  {date: '2024-03-25', value: 1, phase: 'Specific 1'},
  {date: '2024-03-26', value: 1, phase: 'Specific 1'},
  {date: '2024-03-27', value: 1, phase: 'Specific 1'},
  {date: '2024-03-28', value: 1, phase: 'Specific 1'},
  {date: '2024-03-29', value: 1, phase: 'Specific 2'},
  {date: '2024-03-30', value: 1, phase: 'Specific 2'},
  {date: '2024-03-31', value: 1, phase: 'Specific 2'},
  {date: '2024-04-01', value: 1, phase: 'Specific 2'},
  {date: '2024-04-02', value: 1, phase: 'Specific 2'},
  {date: '2024-04-03', value: 1, phase: 'Specific 2'},
  {date: '2024-04-04', value: 1, phase: 'Specific 3'},
  {date: '2024-04-05', value: 1, phase: 'Specific 3'},
  {date: '2024-04-06', value: 1, phase: 'Specific 3'},
];

const TrainingStressScore = [
  {date: '2024-02-28', value: 90, phase: 'Transition'},
  {date: '2024-02-29', value: 90, phase: 'Transition'},
  {date: '2024-03-01', value: 90, phase: 'Transition'},
  {date: '2024-03-02', value: 91, phase: 'Transition'},
  {date: '2024-03-03', value: 92, phase: 'Transition'},
  {date: '2024-03-04', value: 91, phase: 'Transition'},
  {date: '2024-03-05', value: 92, phase: 'Prep'},
  {date: '2024-03-06', value: 120, phase: 'Prep'},
  {date: '2024-03-07', value: 120, phase: 'Prep'},
  {date: '2024-03-08', value: 118, phase: 'Prep'},
  {date: '2024-03-09', value: 117, phase: 'Prep'},
  {date: '2024-03-10', value: 120, phase: 'Prep'},
  {date: '2024-03-11', value: 145, phase: 'Prep'},
  {date: '2024-03-12', value: 146, phase: 'General'},
  {date: '2024-03-13', value: 143, phase: 'General'},
  {date: '2024-03-14', value: 145, phase: 'General'},
  {date: '2024-03-15', value: 142, phase: 'General'},
  {date: '2024-03-16', value: 148, phase: 'General'},
  {date: '2024-03-17', value: 142, phase: 'General'},
  {date: '2024-03-18', value: 140, phase: 'General'},
  {date: '2024-03-19', value: 142, phase: 'General'},
  {date: '2024-03-20', value: 190, phase: 'General'},
  {date: '2024-03-21', value: 192, phase: 'General'},
  {date: '2024-03-22', value: 189, phase: 'Specific 1'},
  {date: '2024-03-23', value: 190, phase: 'Specific 1'},
  {date: '2024-03-24', value: 191, phase: 'Specific 1'},
  {date: '2024-03-25', value: 122, phase: 'Specific 1'},
  {date: '2024-03-26', value: 124, phase: 'Specific 1'},
  {date: '2024-03-27', value: 126, phase: 'Specific 1'},
  {date: '2024-03-28', value: 121, phase: 'Specific 1'},
  {date: '2024-03-29', value: 120, phase: 'Specific 1'},
  {date: '2024-03-30', value: 141, phase: 'Specific 2'},
  {date: '2024-03-31', value: 140, phase: 'Specific 2'},
  {date: '2024-04-01', value: 139, phase: 'Specific 2'},
  {date: '2024-04-02', value: 143, phase: 'Specific 2'},
  {date: '2024-04-03', value: 144, phase: 'Specific 2'},
  {date: '2024-04-04', value: 146, phase: 'Specific 2'},
  {date: '2024-04-05', value: 91, phase: 'Specific 3'},
  {date: '2024-04-06', value: 92, phase: 'Specific 3'},
  {date: '2024-04-07', value: 90, phase: 'Specific 3'},
];

const DailyActivityLoad = [
  {date: '2024-02-28', value: 4.909090909090909, phase: 'Transition'},
  {date: '2024-02-29', value: 3.5064935064935066, phase: 'Transition'},
  {date: '2024-03-01', value: 2.7272727272727275, phase: 'Transition'},
  {date: '2024-03-02', value: 3.74025974025974, phase: 'Transition'},
  {date: '2024-03-03', value: 1.2987012987012987, phase: 'Transition'},
  {date: '2024-03-04', value: 4.025974025974026, phase: 'Prep'},
  {date: '2024-03-05', value: 3.501082251082251, phase: 'Prep'},
  {date: '2024-03-06', value: 2.083333333333333, phase: 'Prep'},
  {date: '2024-03-07', value: 3.4305555555555554, phase: 'Prep'},
  {date: '2024-03-08', value: 1.2951388888888888, phase: 'Prep'},
  {date: '2024-03-09', value: 1.784722222222222, phase: 'Prep'},
  {date: '2024-03-10', value: 3.685763888888889, phase: 'Prep'},
  {date: '2024-03-11', value: 2.3680555555555554, phase: 'General'},
  {date: '2024-03-12', value: 1.5949074074074074, phase: 'General'},
  {date: '2024-03-13', value: 3.1018518518518516, phase: 'General'},
  {date: '2024-03-14', value: 4.027777777777778, phase: 'General'},
  {date: '2024-03-15', value: 1.5277777777777777, phase: 'General'},
  {date: '2024-03-16', value: 3.1435185185185186, phase: 'General'},
  {date: '2024-03-17', value: 2.2916666666666665, phase: 'General'},
  {date: '2024-03-18', value: 4.166666666666667, phase: 'General'},
  {date: '2024-03-19', value: 5, phase: 'General'},
  {date: '2024-03-20', value: 2.013888888888889, phase: 'General'},
  {date: '2024-03-21', value: 1.0763888888888888, phase: 'Specific 1'},
  {date: '2024-03-22', value: 2.3055555555555554, phase: 'Specific 1'},
  {date: '2024-03-23', value: 4.010416666666667, phase: 'Specific 1'},
  {date: '2024-03-24', value: 3.1064814814814814, phase: 'Specific 1'},
  {date: '2024-03-25', value: 1.5416666666666667, phase: 'Specific 1'},
  {date: '2024-03-26', value: 3.548611111111111, phase: 'Specific 1'},
  {date: '2024-03-27', value: 2.2916666666666665, phase: 'Specific 1'},
  {date: '2024-03-28', value: 4.097222222222222, phase: 'Specific 1'},
  {date: '2024-03-29', value: 2.326388888888889, phase: 'Specific 2'},
  {date: '2024-03-30', value: 4.097222222222222, phase: 'Specific 2'},
  {date: '2024-03-31', value: 3.2430555555555554, phase: 'Specific 2'},
  {date: '2024-04-01', value: 1.5277777777777777, phase: 'Specific 2'},
  {date: '2024-04-02', value: 4.375, phase: 'Specific 2'},
  {date: '2024-04-03', value: 1.4236111111111112, phase: 'Specific 2'},
  {date: '2024-04-04', value: 4.861111111111111, phase: 'Specific 3'},
  {date: '2024-04-05', value: 2.326388888888889, phase: 'Specific 3'},
  {date: '2024-04-06', value: 3.0902777777777777, phase: 'Specific 3'},
  {date: '2024-04-07', value: 1.4236111111111112, phase: 'Specific 3'},
];

const DailyLoadContent = ({}) => {
  const theme = useTheme();

  // Keywords for each graph
  const activityKeywords = ['Activity', 'Tracker'];
  const tssKeywords = ['Training', 'Stress', 'Score', '(TSS)'];
  const dailyLoadKeywords = ['Daily', 'Activity', 'Load'];

  // Current date state
  const [currentDate, setCurrentDate] = useState('2024-03-07');
  const currentActivityScore =
    ActivityData.find(item => item.date === currentDate)?.value || 0;

  // State for selected score
  const [selectedActivityScore, setSelectedActivityScore] = useState({
    value: currentActivityScore,
    date: currentDate,
  });

  // Find the current scores for each dataset

  const currentTssScore =
    TrainingStressScore.find(item => item.date === currentDate)?.value || 0;

  const [selectedTssScore, setSelectedTssScore] = useState({
    value: currentTssScore,
    date: currentDate,
  });

  // Update the selected score
  useEffect(() => {
    setSelectedActivityScore({value: currentActivityScore, date: currentDate});
  }, [currentActivityScore, currentDate]);

  useEffect(() => {
    setSelectedTssScore({value: currentTssScore, date: currentDate});
  }, [currentTssScore, currentDate]);

  // Callback for when a bar is selected in the graph
  const handleActivityScoreSelect = (value, date) => {
    setSelectedActivityScore({value, date});
  };

  const handleTssScoreSelect = (value, date) => {
    setSelectedTssScore({value, date});
  };

  const currentDailyLoadScore =
    DailyActivityLoad.find(item => item.date === currentDate)?.value || 0;

  const [selectedDailyLoadScore, setSelectedDailyLoadScore] = useState({
    value: currentDailyLoadScore,
    date: currentDate,
  });

  useEffect(() => {
    setSelectedDailyLoadScore({
      value: currentDailyLoadScore,
      date: currentDate,
    });
  }, [currentDailyLoadScore, currentDate]);

  const handleDailyLoadScoreSelect = (value, date) => {
    setSelectedDailyLoadScore({
      value: value,
      date: date,
    });
  };

  // Function to convert value to hours and minutes for display

  return (
    <Container>
      <HeaderContainer>
        <SubheaderText>Daily Load</SubheaderText>
        <ValueDescriptionText>March 7th, 2024</ValueDescriptionText>
      </HeaderContainer>
      <View>
        <GraphPlusTextComponent
          data={ActivityData}
          color={theme.third}
          HeaderText="Activity Tracker"
          ScoreValue={selectedActivityScore.value}
          selectedScore={selectedActivityScore}
          onScoreSelect={handleActivityScoreSelect}
          ScoreLabelText="Activities"
          keywords={activityKeywords}
          currentData={currentDate}
          activity={true}
          DescriptionText="The Activity Tracker graph provides valuable insights into your daily physical activities. It tracks the number of activities you engage in and helps you monitor your progress over time. Whether you're looking to increase your activity level or maintain a consistent routine, this graph is a useful tool for tracking your daily accomplishments."
        />
        <GraphPlusTextComponent
          data={TrainingStressScore}
          HeaderText="Training Stress Score"
          ScoreValue={selectedTssScore.value}
          selectedScore={selectedTssScore}
          onScoreSelect={handleTssScoreSelect}
          ScoreLabelText="TSS"
          keywords={tssKeywords}
          currentData={currentDate}
          DescriptionText="Recently, your TSS indicates a commendable commitment to your training regimen, with a consistent upward trend in your scores, suggesting an increase in both workout intensity and overall endurance. As we move forward, the upcoming phase of your training will focus on elevating your performance to new heights, targeting specific areas for improvement. The goal is to ensure a balanced approach that continues to challenge your physical capabilities while avoiding overtraining. Your progress thus far sets a solid foundation for the next level of training, where we will introduce more specialized workouts to enhance your strength, speed, and stamina. Keep up the great work; your dedication is clearly reflected in your TSS progression, and we're excited to see how much further you can go."
        />

        <GraphPlusTextComponent
          data={DailyActivityLoad}
          paddingLeft={0}
          HeaderText="Daily Activity Load"
          ScoreValue={selectedDailyLoadScore.value}
          selectedScore={selectedDailyLoadScore}
          onScoreSelect={handleDailyLoadScoreSelect}
          ScoreLabelText="Duration"
          keywords={dailyLoadKeywords}
          currentData={currentDate}
          time={true}
          DescriptionText="Your recent trends highlight an impressive commitment to enhancing your fitness regime, with an increase in both the diversity and intensity of your daily exercises. As we progress, expect to see the graph reflect a more targeted approach towards optimizing your activity load for peak performance and recovery balance. This strategic adjustment aims to fine-tune your daily routines, ensuring that each session contributes effectively towards achieving your overarching health and fitness objectives. "
        />
      </View>
    </Container>
  );
};

export default DailyLoadContent;
