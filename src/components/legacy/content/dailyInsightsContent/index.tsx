import React, {useState} from 'react';
import {
  BoldText,
  Container,
  DescriptorContainer,
  DescriptorText,
  HeaderContainer,
  SubDescriptorText,
  SubheaderText,
  ValueDescriptionText,
} from './insightsContent.style.tsx';
import InsightsComp from '../../message/insights';
import DetachedModal from '../../modals/detached';
import ActionModal from '../../modals/action';
import AdviceModal from '../../modals/advice';
import GraphPlusHeaderGraph from '../../graphs/graphPlusHeader';

const data = [
  {
    type: 'linetrend',
    graphType: 'line',
    graphHeader: 'Thresholds',
    graphLabel: 'VT1 & VT2',
    graphScore: '',
    data: [
      {date: '2024-02-29', highlight: 'False', load: 45.65},
      {date: '2024-03-01', highlight: 'False', load: 46.03},
      {date: '2024-03-02', highlight: 'False', load: 45.8},
      {date: '2024-03-03', highlight: 'True', load: 58.35},
      {date: '2024-03-04', highlight: 'False', load: 44.05},
      {date: '2024-03-05', highlight: 'False', load: 47.63},
      {date: '2024-03-06', highlight: 'False', load: 50.17},
      {date: '2024-03-07', highlight: 'False', load: 46.33},
      {date: '2024-03-08', highlight: 'False', load: 41.59},
      {date: '2024-03-09', highlight: 'False', load: 56.81},
      {date: '2024-03-10', highlight: 'True', load: 59.37},
      {date: '2024-03-11', highlight: 'False', load: 47.45},
      {date: '2024-03-12', highlight: 'False', load: 44.15},
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
];

const DailyInsightsContent = ({formattedDate}) => {
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
          <SubheaderText>Daily Insights</SubheaderText>
          <ValueDescriptionText>{formattedDate}</ValueDescriptionText>
        </HeaderContainer>
        <DescriptorContainer>
          <DescriptorText>
            Gain a deeper understanding of your fitness journey and training
            regimen with these valuable insights:
          </DescriptorText>
          <InsightsComp
            header="1. Nutrition: "
            MessageContent="Your maximal fat oxidation rate of 1.1 g/min indicates a superior ability to utilize fat as a fuel source during exercise, far exceeding the typical range for recreational athletes (0.3-0.5 g/min). This efficient fat metabolism is a significant advantage for endurance sports, suggesting that you can effectively draw on fat stores for energy, sparing glycogen and delaying fatigue. To further optimize this ability, consider a diet that supports fat oxidation, incorporating healthy fats and timing carbohydrate intake to enhance fat utilization during prolonged activities."
            handleActionPress={handleActionPress}
          />
          <InsightsComp
            header="2. Endurance: "
            MessageContent="Your VO2max is impressively above average for your age group, with normative data suggesting that males aged 25-30 typically exhibit an average VO2max around 30-40 ml/kg/min. Your aerobic capacity positions you exceptionally well for endurance sports like triathlons, reflecting a high level of cardiovascular fitness. Emphasizing both steady-state and interval training can help maintain or even improve this vital endurance marker."
          />
          <InsightsComp
            header="3. Strength: "
            MessageContent="While the focus of the report is primarily on aerobic capacity and metabolic efficiency, it’s essential to recognize the role of muscular strength in supporting endurance activities. Strength training can enhance your overall performance by improving economy of movement, delaying muscle fatigue, and preventing injuries. Integrating strength workouts focusing on core, leg, and upper body muscles will complement your endurance training, creating a well-rounded athletic profile."
          />

          <InsightsComp
            header="4. Mental Well-being: "
            MessageContent="Endurance sports demand not only physical but also mental resilience. Your ability to sustain high intensities for extended periods, as indicated by your high ventilatory thresholds (VT1 and VT2), also points to mental toughness. Developing strategies for mental endurance, such as visualization, goal setting, and mindfulness, can further enhance your capacity to handle the psychological demands of long-distance events."
          />
          <InsightsComp
            header="5. Recovery: "
            MessageContent="Efficient fat oxidation and a strong aerobic base suggest that your body is well-adapted to endurance training. However, recovery plays a crucial role in sustaining performance and preventing overtraining. Focus on recovery strategies such as adequate sleep, nutrition, hydration, and active recovery sessions. Monitoring markers of recovery, like heart rate variability, can also provide insights into your body’s readiness for training and help optimize your training schedule for continued improvement."
          />
          <DescriptorText paddingTop={20}>
            These insights not only help users make informed decisions about
            their fitness and training but also enable trainers and coaches to
            tailor programs that are personalized, safe, and optimized for
            individual goals and needs.
          </DescriptorText>
        </DescriptorContainer>
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

export default DailyInsightsContent;
