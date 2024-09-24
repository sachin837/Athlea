import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

// Define the props interface
interface TypingIndicatorProps {
  backgroundColor?: string; // backgroundColor is optional
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ backgroundColor = 'gray' }) => {
  // Create animated values for each dot
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  // Animate each dot with a delay to simulate a "bouncing" effect
  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.stagger(300, [
          Animated.sequence([
            Animated.timing(dot1Anim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dot1Anim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(dot2Anim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dot2Anim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(dot3Anim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dot3Anim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateDots();
  }, [dot1Anim, dot2Anim, dot3Anim]);

  const getDotStyle = (animation: Animated.Value) => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5], // Bounce up by 5 pixels
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, getDotStyle(dot1Anim), { backgroundColor }]} />
      <Animated.View style={[styles.dot, getDotStyle(dot2Anim), { backgroundColor }]} />
      <Animated.View style={[styles.dot, getDotStyle(dot3Anim), { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default TypingIndicator;
