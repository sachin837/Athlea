import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {Icon} from '../response/response.style.tsx';
import {useLoading} from '../../../contexts/LoadingContext.tsx';
const LoadingIndicator = () => {
  // Create an animated value
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation as a sequence of movements
    Animated.loop(
      Animated.sequence([
        // Move up
        Animated.timing(moveAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        // Move down
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [moveAnim]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: moveAnim,
            },
          ],
        }}>
        <Icon name="athleaiconsvg" size={30} color="#000" />
      </Animated.View>
    </View>
  );
};

export default LoadingIndicator;
