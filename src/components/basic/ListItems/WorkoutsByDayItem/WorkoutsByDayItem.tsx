import {FC, useState} from 'react'
import {format} from 'date-fns'
import {TrainingTypes} from '_constants'
import {Text} from '../../../primitives/Text'
import {WorkoutItem} from '../WorkoutItem/WorkoutItem'
import {Container, WorkoutContainer} from './WorkoutsByDayItem.styles'
import {GestureUpdateEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import Animated, {DerivedValue, useAnimatedStyle} from 'react-native-reanimated'
import {PositionList, PositionListShared} from '../../../../hooks/useAnimatedDraggable'


interface Props {
  date: Date
  workouts: any[]
  onGestureUpdate: (position: number) => (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
  onGestureEnd: (position: number) => (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
  hovered?: DerivedValue<{ j: number | null, i: number | null}>
  position: number
  positionList: PositionListShared
}


const AnimatedWorkoutContainer = Animated.createAnimatedComponent(WorkoutContainer)

export const WorkoutsByDayItem:FC<Props> = (props) => {

  const [isAnimated, setIsAnimated] = useState(false)
  const displayDate = format(props.date, 'E')

  const animatedStyle = useAnimatedStyle(() => ({
    height: props.positionList.value[props.position]?.height,
  }))

  return (
    <Container isAnimated={isAnimated}>
      <Text themeColor={'subtitle'}>{displayDate}</Text>
      <AnimatedWorkoutContainer style={animatedStyle}>
        {props.workouts.map((item, index) => (
          <WorkoutItem
            id={item.key}
            key={item.key}
            position={index}
            title={item.value}
            hovered={props.hovered}
            setIsAnimated={setIsAnimated}
            positionList={props.positionList}
            containerPosition={props.position}
            trainingType={TrainingTypes.strength}
            onGestureUpdate={props.onGestureUpdate(index)}
            onGestureEnd={props.onGestureEnd(index)}
          />
        ))}
      </AnimatedWorkoutContainer>
    </Container>
  )
}
