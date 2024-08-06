import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  Touchable,
  View,
  Image,
} from 'react-native';
import {
  Circle,
  CircleContainer,
  HeaderText,
  PagesContainer,
  Ring,
  SubHeaderText,
  TextContainer,
} from './centerButton.style.tsx';
import RightCenterPages from './rightCenterPages.tsx';
import {TouchableOpacity} from 'react-native';

const CenterButton = ({scrollX, currentPage}) => {
  // Create animated values for rings
  const rotations = useRef(
    new Array(4).fill(null).map(() => new Animated.Value(0)),
  ).current;

  // Start rotating animation for each ring
  const startRotating = () => {
    rotations.forEach((anim, index) => {
      anim.setValue(0);
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 10000, // Each ring rotates slower
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    });
  };

  useEffect(() => {
    startRotating();
  }, []);

  const ringSizes = [270, 305, 400, 430]; // Replace with your desired sizes

  const topOffset = 150; // Center the ring in the CircleContainer
  const leftOffset = 50; // Center the ring in the CircleContainer

  const ringOffsets = [
    {top: -50 + topOffset, left: -50 + leftOffset, radius: 260},
    {top: -60 + topOffset, left: -25 + leftOffset, radius: 300},
    {top: -140 + topOffset, left: -100 + leftOffset, radius: 380},
    {top: -115 + topOffset, left: -125 + leftOffset, radius: 400},
  ];

  const screenWidth = Dimensions.get('window').width;

  const transform = currentPage === 1 ? -150 : -150; // Example values, adjust accordingly
  // Combine the animated translation with the transform for the current page
  const animatedStyle = {
    transform: [
      {
        translateX: scrollX.interpolate({
          inputRange: [0, screenWidth],
          outputRange: [transform, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <CircleContainer currentPage={currentPage}>
        {ringSizes.map((size, index) => {
          // Calculate the offset based on the ring size

          const {top, left, radius} = ringOffsets[index];

          const rotation = rotations[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${360 * (index % 2 === 0 ? 1 : -1)}deg`], // Alternate directions
          });

          return (
            <Ring
              key={`ring-${index}`}
              style={[
                {
                  width: size,
                  height: size,
                  borderRadius: radius / 2, // Half of size to make it circular
                  top: top,
                  left: left,
                },
                {
                  transform: [{rotate: rotation}], // Apply the rotation transform
                },
              ]}
            />
          );
        })}
        <Circle>
          <Image
            source={require('../../../assets/images/AthleaPersonTemplateTransparent.png')}
            style={{
              width: 130,
              height: 240,
              resizeMode: 'cover',
              alignSelf: 'center',
              zIndex: 5000,
              marginTop: 10,
            }}
          />
        </Circle>
      </CircleContainer>
    </Animated.View>
  );
};

export default CenterButton;
