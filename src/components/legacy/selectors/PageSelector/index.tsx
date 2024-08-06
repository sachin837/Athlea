import React from 'react';
import {
  Container,
  GradientContainer,
  PageIcon,
  PageText,
} from './pageSelector.style.tsx';
import {IconButton} from '../../iconButton';
import {StyleSheet} from 'react-native';
import {Animated} from 'react-native';

interface PageSelectorProps {
  onPress: () => void;
  gradientColors: string[];
  name: string;
  size: number;
  text: string;
  showGradient: boolean;
  pageSelectorTranslateY: Animated.Value;
}

const PageSelector = ({
  onPress,
  gradientColors,
  name,
  size,
  text,
  pageSelectorTranslateY,
}: PageSelectorProps) => {
  const containerStyle = {
    transform: [{translateY: pageSelectorTranslateY}],
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <IconButton
        type="left-open"
        size={14}
        borderColor="black"
        iconSize={7}
        accessibilityLabel="Go back"
        onPress={onPress}
      />
      <GradientContainer
        gradientColors={gradientColors}
        width={65}
        height={10}
        borderRadius={20}>
        <PageIcon name={name} size={size} />
        <PageText>{text}</PageText>
      </GradientContainer>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
});

export default PageSelector;
