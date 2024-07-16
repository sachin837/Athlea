import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Text } from '../../../primitives/Text';
import { FC, useEffect } from 'react';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Icons from '../../../../assets/icons/Icons';
import { Colors } from '../../../../theme';
import { TrainingTypes } from '../../../../_constants';

interface Props {
  onUpdate: (
    event: GestureUpdateEvent<
      PanGestureHandlerEventPayload & PanGestureChangeEventPayload
    >,
  ) => void;
  onEnd: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => void;
  animatedPosition?: SharedValue<number>;
  position: number;
  title: string;
  Icon: string;
  subTitle: string;
  distanceTime: string;
  color: string;
  setAnimatedPosition: (value: SharedValue<number>) => void;
}

export const AnimatedContainer: FC<Props> = (props) => {
  const { position, onUpdate, onEnd, title, Icon, subTitle, distanceTime, color } = props;
  const isAnimated = useSharedValue(false);
  const animatedPosition = useSharedValue(position);

  useEffect(() => {
    props.setAnimatedPosition(animatedPosition);
  }, []);

  const pan = Gesture.Pan()
    .onBegin(() => {
      isAnimated.value = true;
    })
    .onChange((event) => {
      onUpdate(event);
    })
    .onEnd((event) => {
      onEnd(event);
      isAnimated.value = false;
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedPosition?.value || 0 }, { scale: isAnimated.value ? 1.04 : 1 }],
      zIndex: isAnimated.value ? 1000 : 1,
    };
  });

  const showSubtitle = !!subTitle;
  const showDistanceTime = !!distanceTime;
  const isRecovery = color === 'recovery';

  return (
    <Animated.View style={[styles.main, animatedStyle]}>
      <View style={[
        styles.container,
        isRecovery
          ? [styles.recoveryContainer, styles.recoveryBorder]
          : { backgroundColor: Colors[color] },
      ]}>
        <GestureDetector gesture={pan}>
          <View style={showSubtitle || showDistanceTime ? styles.content : styles.centeredContent}>
            <View style={styles.row}>
              <Icons name={Icon} size={16} color={isRecovery ? '#D343DB' : 'white'} />
              <Text type={'small'} style={{fontSize:15}} color={isRecovery ? '#D343DB' : 'white'}>{title}</Text>
            </View>
            {(showSubtitle || showDistanceTime) && (
              <Text type={'small'} color={isRecovery ? '#D343DB' : 'white'} style={{fontSize:13}}>
                {subTitle ? subTitle : ''} {distanceTime ? ' • ' : ''} {distanceTime ? distanceTime : ''}
              </Text>
            )}
          </View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 58,
    position: 'absolute',
    left: 32 + 48,
    right: 32,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    height: 58,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  recoveryContainer: {
    backgroundColor: 'white',
  },
  recoveryBorder: {
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  content: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    gap: 4,
  },
  centeredContent: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
});
