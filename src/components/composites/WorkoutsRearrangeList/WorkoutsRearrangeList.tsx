import { useAnimatedDraggable } from '../../../hooks/useAnimatedDraggable'
import { FC } from 'react'
import { MainContainer } from './WorkoutsRearrangeList.styles'
import { AnimatedMainContainer } from './components/AnimatedMainContainer'
import { AnimatedContainer } from './components/AnimatedContainer'
import { format } from 'date-fns'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


interface Props {
  data: any[]
}

export const WorkoutsRearrangeList: FC<Props> = (props) => {

  const {
    draggableHeight,
    items,
    containers,
    setAnimatedContainer,
    setAnimatedDraggable,
    onGestureEnd,
    onGestureUpdate,
  } = useAnimatedDraggable(props.data)

  const getDisplayDate = (date) => format(date, 'eee')

  return (
    <GestureHandlerRootView>
      <MainContainer height={draggableHeight}>
        {containers.map((item, index) => (
          <AnimatedMainContainer
            title={getDisplayDate(item.data.date)}
            height={item.height}
            position={item.position}
            setAnimatedValues={setAnimatedContainer(index)}
          />
        ))}
        {items.map((item, index) => (
          <AnimatedContainer
            title={item.value}
            Icon={item?.icon}
            subTitle={item.subTitle}
            distanceTime={item.distanceTime}
            color={item.color}
            position={item.position}
            onEnd={onGestureEnd(index)}
            onUpdate={onGestureUpdate(index)}
            setAnimatedPosition={setAnimatedDraggable(index)}
          />
        ))}
      </MainContainer>
    </GestureHandlerRootView>
  )
}
