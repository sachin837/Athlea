import {View} from 'react-native';
import React from 'react';
import {PageButton} from '../pageButton';
import {useTheme} from 'styled-components/native';
import ProgressRing from '../centerContent/components/progressCircle.tsx';
import {Container} from '../pageButton/pageButton.style.tsx';

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

const PageRingRow = ({
  IconName1,
  IconName2,
  IconName3,
  IconName4,
  IconName5,
  strengthProgress,
  enduranceProgress,
  recoveryProgress,
  wellbeingProgress,
  nutritionProgress,
}: PageButtonRowProps) => {
  const theme = useTheme();

  return (
    <Container>
      {IconName1 && (
        <ProgressRing
          iconName={IconName1}
          progress={strengthProgress}
          size={2}
          ringColor="#6580F4"
        />
      )}
      {IconName2 && (
        <ProgressRing
          iconName={IconName2}
          iconSize={23}
          iconLeft="36%"
          iconTop="33%"
          progress={enduranceProgress}
          size={2}
          ringColor="#37C6C4"
        />
      )}
      {IconName3 && (
        <ProgressRing
          iconName={IconName3}
          progress={recoveryProgress}
          iconSize={27}
          iconLeft="43%"
          iconTop="30%"
          size={2}
          ringColor="#D343DB"
        />
      )}
      {IconName4 && (
        <ProgressRing
          iconName={IconName4}
          iconSize={22}
          iconLeft="38%"
          iconTop="32%"
          progress={wellbeingProgress}
          size={2}
          ringColor="#FD8C5B"
        />
      )}
      {IconName5 && (
        <ProgressRing
          iconName={IconName5}
          iconSize={22}
          iconLeft="36%"
          iconTop="35%"
          progress={nutritionProgress}
          size={2}
          ringColor="#63D571"
        />
      )}
    </Container>
  );
};

export default PageRingRow;
