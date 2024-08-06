import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  BodyContainer,
  ComponentContainer,
  ComponentTitle,
  Container,
  GraphContainer,
  HeaderContainer,
  HeaderIcon,
  HeaderSubText,
  HeaderText,
  HeaderTitleContainer,
  NutritionContainer,
  OverviewContainer,
  OverviewText,
  OverviewTitle,
  RecommendationText,
  RecommendedContainer,
  ReportBodyText,
} from './report.style.tsx';
import GraphPlusHeaderGraph from '../graphs/graphPlusHeader';
import ReportCompMessage from '../message/report';
import AdviceModal from '../modals/advice';

const section = [
  {
    type: 'graphType',
    graphType: 'bar',
    graphHeader: 'Sleep Duration',
    graphLabel: 'Hours',
    graphScore: '8',
    data: [
      {date: '2024-02-26', highlight: false, load: 7},
      {date: '2024-02-27', highlight: false, load: 8},
      {date: '2024-02-28', highlight: false, load: 7.5},
      {date: '2024-02-29', highlight: false, load: 8.5},
      {date: '2024-03-01', highlight: false, load: 8},
      {date: '2024-03-02', highlight: true, load: 9},
      {date: '2024-03-03', highlight: false, load: 7},
      {date: '2024-03-04', highlight: false, load: 7.5},
    ],
  },
  {
    type: 'graphType',
    graphChart: 'linetrend',
    graphType: 'linetrend',
    graphHeader: 'VO2 Max ',
    graphLabel: 'ml/kg/min',
    graphScore: '', // VO2 max doesn't have a "score" in the same sense as heart rate, so this might be left empty or filled with the highest VO2 max value recorded
    deviceType: 'VO2MeasurementDevice', // Replace with the actual device type if known
    text: 'Daily VO2 max readings',
    data: [
      {date: '2024-02-26', highlight: false, load: 45},
      {date: '2024-02-27', highlight: false, load: 46},
      {date: '2024-02-28', highlight: true, load: 47},
      {date: '2024-02-29', highlight: false, load: 48},
      {date: '2024-03-01', highlight: false, load: 49},
      {date: '2024-03-02', highlight: false, load: 50},
      {date: '2024-03-03', highlight: false, load: 51},
      {date: '2024-03-04', highlight: false, load: 52},
      {date: '2024-03-05', highlight: false, load: 53},
    ],
  },
  {
    type: 'graphType',
    graphType: 'bar',
    graphHeader: 'Fat Oxidation Rate',
    graphLabel: 'g/min',
    graphScore: '1.1',
    text: '1.1 g/min',
    data: [
      {date: '2024-02-29', highlight: true, load: 1.05},
      {date: '2024-03-01', highlight: true, load: 1.1},
      {date: '2024-03-02', highlight: true, load: 1.15},
      {date: '2024-03-03', highlight: true, load: 1.2},
      {date: '2024-03-04', highlight: true, load: 1.0},
      {date: '2024-03-05', highlight: true, load: 1.1},
      {date: '2024-03-06', highlight: true, load: 1.05},
      {date: '2024-03-07', highlight: true, load: 1.1},
    ],
  },
];

const ReportComp = ({CategoryTitleText, TitleText}) => {
  const firstSection = section[0]; // Access the first object in the array
  const secondSection = section[1]; // Access the second object in the array
  const thirdSection = section[2]; // Access the third object in the array
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleActionPress = action => {
    // Show the action sheet
    // Destructure the needed properties
    console.log('Setting modal content with:', action); // Ensure action contains what you expect
    setModalContent({
      text: action.text,
      bodyPart: action.bodyPart,
      category: action.category,
    });
    setModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Container>
        <HeaderContainer>
          <HeaderTitleContainer>
            <HeaderText size={22}>{TitleText}</HeaderText>
            <HeaderSubText size={16}>{CategoryTitleText}</HeaderSubText>
          </HeaderTitleContainer>
          <HeaderIcon size={28} name="share" />
        </HeaderContainer>
        <BodyContainer>
          <OverviewContainer>
            <ComponentTitle>Overview:</ComponentTitle>
            <ReportBodyText>
              This past week, you've focused on strengthening your foundational
              aerobic capabilities, complemented by high-intensity intervals.
              The goal was to enhance your endurance, anaerobic threshold, and
              adaptability across various workout intensities, building a robust
              aerobic base while pushing the limits of your physiological
              adaptability and endurance.
            </ReportBodyText>
          </OverviewContainer>
          <ComponentContainer>
            <ReportCompMessage
              botType="strength"
              header="Strength Training Insights:"
              MessageContent="Your dedication to building aerobic capacity has notably improved your muscular strength, particularly within endurance-focused parameters. Targeted strength training on your core, legs, and upper body has led to improved movement efficiency, delayed muscle fatigue, and reduced injury risk. Achieving an average of 8.25 hours of sleep per night has been crucial, highlighting the importance of rest in your physical development and muscle recovery."
              handleActionPress={handleActionPress}
            />
          </ComponentContainer>
          <GraphContainer>
            <GraphPlusHeaderGraph
              HeaderText={firstSection.graphHeader}
              ScoreValue={firstSection.graphScore}
              ScoreLabelText={firstSection.graphLabel}
              graphType={firstSection.graphType}
              data={firstSection.data}
            />
          </GraphContainer>
          <ComponentContainer>
            <ReportCompMessage
              botType="endurance"
              header="Endurance Training Insights:"
              MessageContent="Your VO2max has shown a remarkable increase, reaching around 60 ml/kg/min, which indicates a superior aerobic capacity compared to the average for your age group. This is especially advantageous for endurance events like triathlons. A mix of steady-state runs and high-intensity interval training has effectively boosted your performance in higher intensity zones, critical for enhancing overall endurance and sustaining effort during competitions."
              handleActionPress={handleActionPress}
            />
          </ComponentContainer>
          <GraphContainer>
            <GraphPlusHeaderGraph
              HeaderText={secondSection.graphHeader}
              ScoreValue={secondSection.graphScore}
              ScoreLabelText={secondSection.graphLabel}
              graphType={secondSection.graphType}
              data={secondSection.data}
            />
          </GraphContainer>
          <ComponentContainer>
            <ReportCompMessage
              botType="wellbeing"
              header="Mental Resilience and Well-being:"
              MessageContent="Sustaining high-intensity effort over long periods is as much a mental challenge as it is a physical one. Incorporating mental endurance strategies such as visualization, goal setting, and mindfulness has provided you with significant psychological support. These practices are crucial for facing the mental demands of endurance competitions."
              handleActionPress={handleActionPress}
            />
          </ComponentContainer>
          <NutritionContainer>
            <ReportCompMessage
              botType="nutrition"
              header="Nutrition Overview:"
              MessageContent="Your maximal fat oxidation rate was observed at 1.1 g/min, highlighting your body's efficiency in using fat as a primary fuel source during extended activities. This rate significantly surpasses that of average recreational athletes. Optimizing your nutrition with a focus on healthy fats and strategic carbohydrate intake will support continued improvement in fat metabolism, endurance, and recovery."
              handleActionPress={handleActionPress}
            />
          </NutritionContainer>
          <GraphContainer>
            <GraphPlusHeaderGraph
              HeaderText={thirdSection.graphHeader}
              ScoreValue={thirdSection.graphScore}
              ScoreLabelText={thirdSection.graphLabel}
              graphType={thirdSection.graphType}
              data={thirdSection.data}
            />
          </GraphContainer>
          <ComponentContainer>
            <ReportCompMessage
              botType="recovery"
              header="Recovery and Adaptation:"
              MessageContent="Despite your excellent adaptation to the training, recovery remains a priority. Implementing comprehensive recovery strategies, including proper nutrition, adequate rest, active recovery sessions, and monitoring recovery indicators like heart rate variability (HRV), is essential. These measures provide insights into your readiness for training and help tailor training adjustments effectively."
              handleActionPress={handleActionPress}
            />
          </ComponentContainer>
          <RecommendedContainer>
            <ComponentTitle>Recommendations:</ComponentTitle>
            <ReportCompMessage
              MessageContent="Ensure a consistent pre-sleep routine to further enhance sleep
          quality and potentially elevate the sleep score."
              bulletPoint={true}
              handleActionPress={handleActionPress}
            />
            <ReportCompMessage
              MessageContent="Incorporate a 5-minute breathing exercise into your daily routine
            to potentially elevate the HRV score."
              bulletPoint={true}
              handleActionPress={handleActionPress}
            />
            <ReportCompMessage
              MessageContent="Consider introducing a brief cool-down phase post-training to aid
            in a more immediate heart rate recovery."
              bulletPoint={true}
              handleActionPress={handleActionPress}
            />
            <ReportCompMessage
              MessageContent="Consume a balanced meal 2-3 hours before bedtime to potentially
            enhance sleep quality."
              bulletPoint={true}
              handleActionPress={handleActionPress}
            />
          </RecommendedContainer>
          <ComponentContainer>
            <ComponentTitle>Summary:</ComponentTitle>
            <ReportBodyText>
              The past week's training regimen was characterized by a focus on
              foundational aerobic building while also incorporating short,
              high-intensity intervals on Wednesday. The systematic approach
              aimed to gradually bolster endurance, anaerobic capacity, and
              physiological adaptability to varied workout intensities. The week
              was capped off with a long run on Sunday, which was a great
              opportunity to practice fueling and hydration strategies in
              preparation for the upcoming marathon.
            </ReportBodyText>
          </ComponentContainer>
        </BodyContainer>
      </Container>
      {modalVisible && (
        <AdviceModal
          isVisible={modalVisible}
          onClose={handleCloseModal}
          actions={modalContent}
        />
      )}
    </>
  );
};

export default ReportComp;
