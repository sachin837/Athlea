import {View} from 'react-native';
import React from 'react';
import {PageButton} from '../pageButton';
import {Container} from './pageButtonRow.style.tsx';
import {useTheme} from 'styled-components/native';

interface PageButtonRowProps {
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

const PageButtonRow = ({
  IconName1,
  IconName2,
  IconName3,
  IconName4,
  IconName5,
}: PageButtonRowProps) => {
  const theme = useTheme();
  return (
    <Container>
      {IconName1 && (
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={5.5}
          name={IconName1}
          iconSize={1}
          disable={false}
          gradientColors={theme.gradients.strength.colors}
          marginSize={0.5}
        />
      )}
      {IconName2 && (
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={5.5}
          name={IconName2}
          iconSize={1.5}
          disable={false}
          gradientColors={theme.gradients.endurance.colors}
          marginSize={0.5}
        />
      )}
      {IconName3 && (
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={5.5}
          name={IconName3}
          iconSize={1}
          disable={false}
          gradientColors={theme.gradients.recovery.colors}
          marginSize={0.5}
        />
      )}
      {IconName4 && (
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={5.5}
          name={IconName4}
          iconSize={1.25}
          disable={false}
          gradientColors={theme.gradients.wellbeing.colors}
          marginSize={0.5}
        />
      )}
      {IconName5 && (
        <PageButton
          onPress={() => {} /* Do something when the button is pressed */}
          size={5.5}
          name={IconName5}
          iconSize={1.25}
          disable={false}
          gradientColors={theme.gradients.nutrition.colors}
          marginSize={0.5}
        />
      )}
    </Container>
  );
};

export default PageButtonRow;
