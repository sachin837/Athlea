import {GestureStateChangeEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import {withSpring} from 'react-native-reanimated'

const onGestureUpdate = (index: number) => (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
  'worklet'
  const currentItem = draggableItems.current[index]
  const currentPosition = event.translationY + currentItem.position
  const movingDown = event.translationY > 0
  draggableItems.current[index].y.value = currentPosition
  for (let i = 0; i < draggableItems.current.length; i++) {
    if (movingDown) {
      draggableItems.current[index].tempOrder = Math.floor(currentPosition / (ITEM_GAP + ITEM_SIZE))
      if (draggableItems.current[i].order >= currentItem.order && currentPosition >= draggableItems.current[i].position) {
        const newTempOrder = draggableItems.current[i].order - 1
        if (newTempOrder !== draggableItems.current[i].tempOrder) {
          draggableItems.current[i].tempOrder = newTempOrder
        }
      } else {
        if (draggableItems.current[i].tempOrder !== draggableItems.current[i].order) {
          draggableItems.current[i].tempOrder = draggableItems.current[i].order
        }
      }
    } else {
      draggableItems.current[index].tempOrder = Math.ceil(currentPosition / (ITEM_GAP + ITEM_SIZE))
      if (draggableItems.current[i].order <= currentItem.order && currentPosition <= draggableItems.current[i].position) {
        const newTempOrder = draggableItems.current[i].order + 1
        if (newTempOrder !== draggableItems.current[i].tempOrder) {
          draggableItems.current[i].tempOrder = newTempOrder
        }
      } else {
        if (draggableItems.current[i].tempOrder !== draggableItems.current[i].order) {
          draggableItems.current[i].tempOrder = draggableItems.current[i].order
        }
      }
    }
    if (i !== index) {
      if (draggableItems.current[i].y) {
        draggableItems.current[i].y.value = withSpring(getItemPosition(draggableItems.current[i].tempOrder))
      }
    }
  }
  console.log(currentPosition, draggableItems.current[index].tempOrder, draggableItems.current, 'order')
}

const onGestureEnd = (index: number) => (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
  'worklet'
  console.log('on end')
  const currentItem  = draggableItems.current[index]
  draggableItems.current[index].y.value = withSpring(currentItem.position)
  for (let i = 0; i < draggableItems.current.length; i++) {
    draggableItems.current[i].order = draggableItems.current[i].tempOrder
    draggableItems.current[i].position = getItemPosition(draggableItems.current[i].order)
  }
  draggableItems.current[index].y.value = withSpring(draggableItems.current[index].position)
  console.log(draggableItems.current, 'items')
}
