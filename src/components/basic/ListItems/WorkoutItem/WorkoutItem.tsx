import {FC} from 'react'
import {Dimensions, View} from 'react-native'
import Animated, {DerivedValue, withSpring} from 'react-native-reanimated'
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {Gesture, GestureDetector, GestureUpdateEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import {Colors} from 'theme'
import {TrainingTypes} from '_constants'
import {Text} from '../../../primitives/Text'
import {Bar, Container, Row, RowSpace} from './WorkoutItem.styles'
import {PositionListShared} from '../../../../hooks/useAnimatedDraggable'

interface Props {
  title: string
  trainingType: TrainingTypes
  setIsAnimated?: (value: boolean) => void
  onGestureUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
  hovered?: DerivedValue<{i: number | null, j: number | null}>
  position: number
  containerPosition: number
  id?: string
  positionList: PositionListShared
  onGestureEnd?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
}

const AnimatedContainer = Animated.createAnimatedComponent(Container)

export const WorkoutItem:FC<Props> = (props) => {

  const translationY = useSharedValue(0)
  const isAnimated = useSharedValue(false)

  const pan = Gesture.Pan()
    .onBegin(() => {
      isAnimated.value = true
      props.setIsAnimated?.(true)
    })
    .onUpdate((event) => {
      translationY.value = event.translationY
      props.onGestureUpdate?.(event)
    })
    .onEnd((event) => {
      translationY.value = withSpring(0)
      isAnimated.value = false
      props.setIsAnimated?.(false)
      props.onGestureEnd?.(event)

    })
    .runOnJS(true)

  const animatedStyles = useAnimatedStyle(() => {
    const translateY = props.positionList.value[props.containerPosition]?.children?.[props.position]?.y || 0
    return ({
      transform: [{translateY}],
      zIndex: isAnimated.value ? 1000 : 1,
    })
  })

  return (
    <AnimatedContainer style={animatedStyles} trainingType={props.trainingType}>
      <RowSpace>
        <View>
          <Row>
            <Icons name={'stars'} size={20} color={Colors.white} />
            <Text color={Colors.white}>{props.title}</Text>
          </Row>
          <Row>
            <Text color={Colors.white}>Strength training</Text>
            <Text color={Colors.white}>•</Text>
            <Text color={Colors.white}>10km</Text>
          </Row>
        </View>
        <GestureDetector gesture={pan}>
          <Bar />
        </GestureDetector>
      </RowSpace>
    </AnimatedContainer>
  )
}
