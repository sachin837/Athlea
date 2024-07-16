import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {
  Container,
  Icon,
  LoadingField,
  SubheaderText,
} from '../responseLoader/reponseLoader.style.tsx';
// Assume Container, Icon, LoadingField, SubheaderText are defined elsewhere.

const loadingFieldsData = [
  {
    iconName: 'info-circled',
    iconSize: 18,
    text: 'setting up your threads',
    blinkTimes: 2,
  },
  {
    iconName: 'sources-1',
    iconSize: 17,
    text: 'loading your supporting sources',
    blinkTimes: 3,
  },
  {
    iconName: 'stats',
    iconSize: 16,
    text: 'figuring out your data sources',
    blinkTimes: 2,
  },
  {
    iconName: 'menu',
    iconSize: 22,
    text: 'finishing the set up',
    blinkTimes: 5,
  },
  {
    iconName: 'ok',
    iconSize: 16,
    text: 'home set up succesfully',
    blinkTimes: 5,
  },
];

const OnboardingLoader = () => {
  const [opacityValues, setOpacityValues] = useState(
    loadingFieldsData.map(() => new Animated.Value(0.4)),
  );
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);
  const animationStarted = useRef(
    new Array(loadingFieldsData.length).fill(false),
  );
  const currentAnimationRef = useRef(null);

  useEffect(() => {
    const animateField = index => {
      if (index >= loadingFieldsData.length) return;
      if (animationStarted.current[index]) return;

      animationStarted.current[index] = true;

      const sequenceAnimations = loadingFieldsData[index].blinkTimes * 2;
      const animations = [];

      for (let i = 0; i < sequenceAnimations; i++) {
        animations.push(
          Animated.timing(opacityValues[index], {
            toValue: i % 2 === 0 ? 1 : 0.4,
            duration: 500,
            useNativeDriver: true,
          }),
        );
      }

      animations.push(
        Animated.timing(opacityValues[index], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      );

      const currentAnimation = Animated.sequence(animations);
      currentAnimation.start(() => {
        if (index + 1 < loadingFieldsData.length) {
          setActiveFieldIndex(index + 1);
        }
      });

      currentAnimationRef.current = currentAnimation;
    };

    animateField(activeFieldIndex);
  }, [activeFieldIndex, opacityValues]);

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

export default OnboardingLoader;
