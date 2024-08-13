import {View} from 'react-native';
import React from 'react';
import {PageButton} from '../pageButton';
import {useTheme} from 'styled-components/native';
import {Container} from './categoryPersonRow.style.tsx';

interface CategoryPersonRowProps {
  iconNames: string[];
}

const CategoryPersonRow = ({iconNames}: CategoryPersonRowProps) => {
  const theme = useTheme();

  // Function to determine icon properties based on the icon name
  const getIconProps = iconName => {
    switch (iconName) {
      case 'strengthicon':
        return {
          iconSize: 1,
          gradientColors: theme.gradients.strength.colors,
        };
      case 'enduranceicon':
        return {
          iconSize: 1.5,
          gradientColors: theme.gradients.endurance.colors,
        };
      case 'nutritionicon':
        return {
          iconSize: 1.5,
          gradientColors: theme.gradients.nutrition.colors,
        };
      case 'recoveryicon':
        return {
          iconSize: 1.5,
          gradientColors: theme.gradients.recovery.colors,
        };
      case 'wellbeingicon':
        return {
          iconSize: 1.5,
          gradientColors: theme.gradients.wellbeing.colors,
        };
      // Add cases for other icons as needed
      default:
        return {
          iconSize: 1, // Default size
          gradientColors: theme.gradients.default.colors, // Default gradient
        };
    }
  };
  return (
    <Container>
      {iconNames.map((iconName, index) => {
        const {iconSize, gradientColors} = getIconProps(iconName);
        return (
          <PageButton
            key={index}
            onPress={() => {}}
            size={5.5}
            name={iconName}
            iconSize={iconSize}
            disable={false}
            gradientColors={gradientColors}
            marginSize={0.5}
          />
        );
      })}
    </Container>
  );
};

export default CategoryPersonRow;
