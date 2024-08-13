import React from 'react';
import {
  Container,
  ItemCategoryTitle,
  ItemContainer,
  ItemDate,
  ItemIcon,
  ItemTitle,
  ItemTitleContainer,
  SeparatorLine,
  TrainingContainer,
} from './trainingItem.style.tsx';
import {PageButton, RightPageButton} from '../pageButton';
import {useTheme} from 'styled-components/native';

interface TrainingItemProps {
  CategoryTitleText: string;
  TitleText: string;
  DateText: string;
  IconName: string;
  gradientColors: string[];
  iconSize: number;
}
const TrainingItem = ({
  CategoryTitleText,
  TitleText,
  DateText,
  IconName,
  gradientColors,
  iconSize,
}: TrainingItemProps) => {
  return (
    <Container>
      <TrainingContainer>
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={10}
          name={IconName}
          iconSize={iconSize}
          disable={false}
          gradientColors={gradientColors}
        />
        <ItemContainer>
          <ItemCategoryTitle size={12}>{CategoryTitleText}</ItemCategoryTitle>
          <ItemTitleContainer>
            <ItemTitle size={18}>{TitleText}</ItemTitle>
            <ItemDate size={12}>{DateText}</ItemDate>
          </ItemTitleContainer>
        </ItemContainer>
        <ItemIcon name="right-open-mini" size={24} />
      </TrainingContainer>
    </Container>
  );
};

export default TrainingItem;
