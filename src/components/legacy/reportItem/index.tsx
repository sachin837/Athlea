import React from 'react';
import {
  Container,
  ItemCategoryTitle,
  ItemContainer,
  ItemDate,
  ItemIcon,
  ItemTitle,
  ItemTitleContainer,
  PageRingContainer,
  SeparatorLine,
  TrainingContainer,
} from './reportItem.style.tsx';
import {PageButton, RightPageButton} from '../pageButton';
import {useTheme} from 'styled-components/native';
import PageButtonRow from '../pageButtonRow';
import PageRingRow from '../pageRingRow';

interface ReportItemProps {
  CategoryTitleText: string;
  TitleText: string;
  StrengthIcon?: string;
  EnduranceIcon?: string;
  RecoveryIcon?: string;
  WellbeingIcon?: string;
}
const ReportItem = ({
  CategoryTitleText,
  TitleText,
  StrengthIcon,
  EnduranceIcon,
  RecoveryIcon,
  WellbeingIcon,
  NutritionIcon,
  strengthProgress,
  enduranceProgress,
  recoveryProgress,
  wellbeingProgress,
  nutritionProgress,
  onPress,
}: ReportItemProps) => {
  return (
    <Container onPress={onPress}>
      <TrainingContainer>
        <ItemContainer>
          <ItemTitleContainer>
            <ItemTitle size={18}>{TitleText}</ItemTitle>
            <ItemCategoryTitle size={12}>{CategoryTitleText}</ItemCategoryTitle>
          </ItemTitleContainer>
          <PageRingContainer>
            <PageRingRow
              IconName1={StrengthIcon}
              IconName2={EnduranceIcon}
              IconName3={RecoveryIcon}
              IconName4={WellbeingIcon}
              IconName5={NutritionIcon}
              strengthProgress={strengthProgress}
              enduranceProgress={enduranceProgress}
              recoveryProgress={recoveryProgress}
              wellbeingProgress={wellbeingProgress}
              nutritionProgress={nutritionProgress}
            />
          </PageRingContainer>
        </ItemContainer>
      </TrainingContainer>
    </Container>
  );
};

export default ReportItem;
