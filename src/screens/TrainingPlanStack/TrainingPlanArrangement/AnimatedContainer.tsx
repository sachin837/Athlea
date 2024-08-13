import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {Text} from '../../../components'
import {FC, useEffect} from 'react'
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import {StyleSheet, View} from 'react-native'
import Icons from '../../../assets/icons/Icons'
import {Colors} from '../../../theme'
import {TrainingTypes} from '../../../_constants'

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
  setAnimatedPosition: (value: SharedValue<number>) => void;
}

export const AnimatedContainer:FC<Props> = (props) => {
  const { position, onUpdate, onEnd, title } = props

  const isAnimated = useSharedValue(false)
  const animatedPosition = useSharedValue(position)

  useEffect(() => {
    props.setAnimatedPosition(animatedPosition)
  }, [])

  const pan = Gesture.Pan()
    .onBegin(() => {
      isAnimated.value = true
    })
    .onChange((event) => {
      onUpdate(event)
    })
    .onEnd((event) => {
      onEnd(event)
      isAnimated.value = false
    })
    .runOnJS(true)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animatedPosition?.value || 0}, {scale: isAnimated.value ? 1.04 : 1}],
      zIndex: isAnimated.value ? 1000 : 1,
    }
  })

  return (
    <Animated.View style={[styles.main, animatedStyle]}>
      <View style={styles.container}>
        <View style={{gap: 4}}>
          <View style={styles.row}>
            <Icons name={'ai'} size={16} color={'white'} />
            <Text type={'small'} color={'white'}>Strength</Text>
          </View>
          <Text type={'small'} color={'white'}>Long Run 10km</Text>
        </View>
        <GestureDetector gesture={pan}>
          <View style={styles.draggable} />
        </GestureDetector>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: 56,
    position: 'absolute',
    left: 32 + 48,
    right: 32,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors[TrainingTypes.strength],
    height: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  draggable: {
    width: 30,
    height: '100%',
    backgroundColor: 'yellow',
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
})
