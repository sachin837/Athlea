import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  ProgressContainer,
  SubHeaderContainer,
  SubHeaderTitle,
  SummaryContainer,
  SummaryText,
} from './progressBlock.style.tsx';
import ProgressRing from './progressCircle.tsx';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';

const CategoryBlock = ({
  ringColor,
  size,
  iconName,
  progress,
  headerText,
  subheaderText,
  summaryText,
  iconLeft,
  iconTop,
  animateTrigger,
}) => {
  const renderBodyText = useRenderBodyText();
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);

  const handleActionPress = text => {
    console.log('Action pressed:', text);
    // Handle action (e.g., open a graph based on the text)
  };

  // Example data, adjust according to your actual data structure
  const graphType = [
    {
      text: '50% Progress',
      type: 'graphType',
      graphType: 'line',
      data: [
        {date: '2024-01-01', highlight: false, load: 7},
        {date: '2024-02-01', highlight: false, load: 7},
        {date: '2024-03-01', highlight: false, load: 8},
        {date: '2024-04-01', highlight: false, load: 8},
        {date: '2024-05-01', highlight: false, load: 9},
        {date: '2024-06-01', highlight: true, load: 8},
        {date: '2024-07-01', highlight: false, load: 7},
        {date: '2024-08-01', highlight: false, load: 6},
        {date: '2024-09-01', highlight: false, load: 5},
        {date: '2024-10-01', highlight: false, load: 5},
        {date: '2024-11-01', highlight: false, load: 6},
        {date: '2024-12-01', highlight: false, load: 7},
      ],
      graphHeader: 'Progress Over Time',
      graphScore: 50,
      graphLabel: 'Completion',
    },
    {
      text: '92%',
      type: 'graphType',
      graphType: 'bar',
      data: [
        {date: '2024-01-01', highlight: false, load: 7},
        {date: '2024-02-01', highlight: false, load: 7},
        {date: '2024-03-01', highlight: false, load: 8},
        {date: '2024-04-01', highlight: false, load: 8},
        {date: '2024-05-01', highlight: false, load: 9},
        {date: '2024-06-01', highlight: true, load: 8},
        {date: '2024-07-01', highlight: false, load: 7},
        {date: '2024-08-01', highlight: false, load: 6},
        {date: '2024-09-01', highlight: false, load: 5},
        {date: '2024-10-01', highlight: false, load: 5},
        {date: '2024-11-01', highlight: false, load: 6},
        {date: '2024-12-01', highlight: false, load: 7},
      ],
      graphHeader: 'Progress Over Time',
      graphScore: 50,
      graphLabel: 'Completion',
    },
  ];
  const highlightedSections = []; // Fill as needed
  const actions = []; // Fill as needed

  // Assuming 'summaryText' should link to graphType data
  const summaryTextElements = renderBodyText(
    summaryText,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
    handleActionPress,
  );
  return (
    <Container>
      <HeaderContainer>
        <ProgressContainer>
          <ProgressRing
            ringColor={ringColor}
            progress={progress}
            name={iconName}
            size={size}
            iconLeft={iconLeft}
            iconTop={iconTop}
            key={animateTrigger}
          />
        </ProgressContainer>
        <SubHeaderContainer>
          <HeaderTitle>{headerText}</HeaderTitle>
          <SubHeaderTitle>{subheaderText}</SubHeaderTitle>
        </SubHeaderContainer>
      </HeaderContainer>
      <SummaryContainer>
        <SummaryText>{summaryTextElements}</SummaryText>
      </SummaryContainer>
    </Container>
  );
};

export default CategoryBlock;
