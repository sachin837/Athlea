import {View} from 'react-native';
import React from 'react';
import {PageButton} from '../pageButton';
import {Container} from './categoryButtonSelector.style.tsx';
import {useTheme} from 'styled-components/native';

interface CategoryButtonRowProps {
  IconName1?: string;
  iconSize1?: number;
  gradientColors1?: string[];
  IconName2?: string;
  iconSize2?: number;
  gradientColors2?: string[];
  IconName3?: string;
  iconSize3?: number;
  gradientColors3?: string[];
  IconName4?: string;
  iconSize4?: number;
  gradientColors4?: string[];
}

const CategoryButtonSelector = ({
  IconName1,
  IconName2,
  IconName3,
  IconName4,
  IconName5,
  onPress1, // for strength
  onPress2, // for endurance
  onPress3, // for recovery
  onPress4, // for wellbeing
  onPress5, // for nutrition
}: CategoryButtonRowProps) => {
  const theme = useTheme();
  return (
    <Container>
      {IconName1 && (
        <PageButton
          onPress={onPress1}
          size={12}
          name={IconName1}
          iconSize={2}
          disable={false}
          gradientColors={theme.gradients.strength.colors}
          marginSize={1.5}
        />
      )}
      {IconName2 && (
        <PageButton
          onPress={onPress2}
          size={12}
          name={IconName2}
          iconSize={2.5}
          disable={false}
          gradientColors={theme.gradients.endurance.colors}
          marginSize={1.5}
        />
      )}
      {IconName3 && (
        <PageButton
          onPress={onPress3}
          size={12}
          name={IconName3}
          iconSize={3}
          disable={false}
          gradientColors={theme.gradients.recovery.colors}
          marginSize={1.5}
        />
      )}
      {IconName4 && (
        <PageButton
          onPress={onPress4}
          size={12}
          name={IconName4}
          iconSize={2.5}
          disable={false}
          gradientColors={theme.gradients.wellbeing.colors}
          marginSize={1.5}
        />
      )}
      {IconName5 && (
        <PageButton
          onPress={onPress5}
          size={12}
          name={IconName5}
          iconSize={2.5}
          disable={false}
          gradientColors={theme.gradients.nutrition.colors}
          marginSize={1.5}
        />
      )}
    </Container>
  );
};

export default CategoryButtonSelector;
