import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {
  Container,
  Icon,
  LoadingField,
  SubheaderText,
} from './reponseLoader.style.tsx';
// Assume Container, Icon, LoadingField, SubheaderText are defined elsewhere.

const loadingFieldsData = [
  {
    iconName: 'athleaiconsvg',
    iconSize: 18,
    text: 'breaking down the question',
    blinkTimes: 1,
  },
  {
    iconName: 'sources',
    iconSize: 18,
    text: 'finding supporting sources',
    blinkTimes: 15,
  },
  {iconName: 'stats', iconSize: 18, text: 'connecting to data', blinkTimes: 14},
  {
    iconName: 'response',
    iconSize: 12,
    text: 'finishing the response',
    blinkTimes: 30,
  },
];

const ResponseLoader = ({
  onLoadingComplete,
  onLoadingProgress,
  dataCompleted,
  sourcesCompleted,
  lastMessageCompleted,
}) => {
  console.log('sourcesCompleted', sourcesCompleted);
  console.log('dataCompleted', dataCompleted);
  const [opacityValues, setOpacityValues] = useState(
    loadingFieldsData.map(() => new Animated.Value(0.4)),
  );
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);

  // Track whether the animation for a specific field has started to prevent repeats
  const animationStarted = useRef(
    new Array(loadingFieldsData.length).fill(false),
  );

  const currentAnimationRef = useRef(null);

  useEffect(() => {
    // This effect is solely for running animations and is triggered once on mount and then only by activeFieldIndex changes.
    const animateField = index => {
      if (index >= loadingFieldsData.length) return;

      if (animationStarted.current[index]) return; // Prevent restarting animation

      animationStarted.current[index] = true; // Mark as started
      onLoadingProgress(index); // Notify progress

      const sequenceAnimations = [];
      for (let i = 0; i < loadingFieldsData[index].blinkTimes * 2; i++) {
        sequenceAnimations.push(
          Animated.timing(opacityValues[index], {
            toValue: i % 2 === 0 ? 1 : 0.4,
            duration: 400,
            useNativeDriver: true,
          }),
        );
      }

      // Ensure it ends at full opacity
      sequenceAnimations.push(
        Animated.timing(opacityValues[index], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      );

      const currentAnimation = Animated.sequence(sequenceAnimations);
      currentAnimation.start(() => {
        if (index + 1 < loadingFieldsData.length) {
          setActiveFieldIndex(index + 1); // Automatically move to the next field
        } else {
          onLoadingComplete(); // Complete the animation sequence
        }
      });

      // Store the current animation in a ref for potential cancellation
      currentAnimationRef.current = currentAnimation;
    };

    animateField(activeFieldIndex);
  }, [activeFieldIndex, opacityValues, onLoadingComplete, onLoadingProgress]);

  useEffect(() => {
    // Check and adjust for sources completion
    if (sourcesCompleted && activeFieldIndex === 1) {
      currentAnimationRef.current?.stop(); // Stop current animation
      opacityValues[1].setValue(1); // Set opacity to full
      setActiveFieldIndex(2); // Skip to the next field
    }
  }, [sourcesCompleted, activeFieldIndex, opacityValues]);

  useEffect(() => {
    // Check and adjust for data completion
    if (dataCompleted && activeFieldIndex === 2) {
      currentAnimationRef.current?.stop(); // Stop current animation
      opacityValues[2].setValue(1); // Set opacity to full
      setActiveFieldIndex(3); // Skip to the next field
    }
  }, [dataCompleted, activeFieldIndex, opacityValues]);

  useEffect(() => {
    // Check and adjust for last message completion
    if (lastMessageCompleted && activeFieldIndex === 3) {
      currentAnimationRef.current?.stop(); // Stop current animation
      opacityValues[3].setValue(1); // Set opacity to full
      setActiveFieldIndex(4); // Skip to the next field
    }
  }, [lastMessageCompleted, activeFieldIndex, opacityValues]);

  return (
    <Container>
      {loadingFieldsData.map((field, index) => (
        <Animated.View key={index} style={{opacity: opacityValues[index]}}>
          <LoadingField>
            <Icon
              name={field.iconName}
              size={field.iconSize}
              color="#000"
              paddingRight={20}
            />
            <SubheaderText>{field.text}</SubheaderText>
          </LoadingField>
        </Animated.View>
      ))}
    </Container>
  );
};

export default ResponseLoader;
