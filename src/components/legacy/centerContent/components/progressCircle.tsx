import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {Svg, Circle} from 'react-native-svg';
import {CategoryIcon} from './progressBlock.style.tsx';
import {Easing} from 'react-native-reanimated';
import {Text} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Icon} from '../../response/response.style.tsx';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({
  progress,
  size,
  ringColor = '#9746FF',
  iconLeft = '33%',
  iconTop = '39%',
  iconName = 'strengthicon',
  iconSize = 16,
}) => {
  const theme = useTheme();
  const iconColor = progress > 0 ? theme.primaryscale[9] : '#dedede';

  const radius = 40; // This is the outer radius of the entire component
  const strokeWidth = 6; // This is the thickness of the progress bar

  // The normalized radius accounts for the stroke on each side
  const normalizedRadius = radius - strokeWidth;

  // The circumference of the circle will be used to create the progress effect
  const circumference = normalizedRadius * 2 * Math.PI;

  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation with a delay
    Animated.timing(progressAnimation, {
      toValue: progress, // Animate to the progress value
      duration: 700, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
      easing: Easing.inOut(Easing.ease), // Use the easing function
      delay: 200, // Delay in milliseconds before starting the animation
    }).start();
  }, [progress, progressAnimation]);

  const strokeDashoffset = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });
  // The strokeDashoffset will create the effect of a progress bar
  scale = 0.83;

  const containerStyle = {
    position: 'relative',
    width: radius * 2 * scale, // Apply scaling to the width
    height: radius * 2 * scale, // Apply scaling to the height
    transform: [{scale: scale}], // Scale down the entire container
  };

  return (
    <View style={containerStyle}>
      <Svg height="100%" width="100%" viewBox="0 0 80 80">
        {/* Background Circle */}
        <Circle
          cx="40"
          cy="40"
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          stroke="#e6e7e8"
          fill="none"
        />
        {/* Progress Circle */}
        <AnimatedCircle
          cx="40"
          cy="40"
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          stroke={ringColor}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${radius}, ${radius})`}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          top: iconTop, // Use the iconTop prop
          left: iconLeft, // Use the iconLeft prop
          transform: [{translateX: -size / 2}, {translateY: -size / 2}],
          zIndex: 1,
        }}>
        {/* <Text
          style={{
            fontSize: 20,
            color: theme.primaryscale[8],
          }}>
          {`${progress}%`}
        </Text> */}
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </View>
    </View>
  );
};

export default ProgressRing;
