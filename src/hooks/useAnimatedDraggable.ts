import {useCallback, useEffect, useRef, useState} from 'react'
import {SharedValue, withSpring} from 'react-native-reanimated'
import {
  GestureStateChangeEvent,
  GestureUpdateEvent, PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

export interface Position {x: number, y: number, id: string}


interface DraggableDescription {
  height: number;
  children: {position: number, y: number, id: string}[];
}

export type PositionList = DraggableDescription[]
export type PositionListShared = SharedValue<PositionList>

interface DraggableItem {
  y?: SharedValue<number>
  order: number
  tempOrder: number
  position: number
  tempPosition: number
  parent: number
  key: string
}

interface ContainerItem {
  height: number
  animatedHeight?: SharedValue<number>
  children: any[]
  position: number
  positionEnd: number
  animatedPosition?: SharedValue<number>
  order: number
  data: any
}

type InputData = {children: {key: string}[]}[]

export const useAnimatedDraggable = (data: InputData) => {

  const ITEM_SIZE = 56
  const ITEM_GAP = 8
  const CONTAINER_GAP = 12
  const CONTAINER_PADDING = 12

  const getItemPosition = (index: number, parentStart = 0) => {
    return index * (ITEM_SIZE + ITEM_GAP) + parentStart + CONTAINER_PADDING
  }

  const getContainerHeight = (numberOfChildren: number) => {
    return (numberOfChildren * ITEM_SIZE) + ((numberOfChildren - 1) * ITEM_GAP) + (CONTAINER_PADDING * 2)
  }

  const [draggableHeight, setDraggableHeight] = useState(0)

  const containerItems = useRef<ContainerItem[]>(getContainers(data))
  console.log('containerItems: ', containerItems);
  const draggableItems = useRef<DraggableItem[]>(getDraggableItems(containerItems.current))

  const [containers, setContainers] = useState(containerItems.current)
  const [items, setItems] = useState(draggableItems.current)

  useEffect(() => {
    setDraggableHeight(containerItems.current[containerItems.current.length - 1].positionEnd)
  }, [])

  function getDraggableItems(data: ContainerItem[]):DraggableItem[] {
    const items:DraggableItem[] = []
    data.forEach((parent, parentIndex) => {
      parent.children.map((child, childIndex) => {
        const startPosition = getItemPosition(childIndex, parent.position)
        child.order = childIndex
        // child.tempOrder = childIndex
        child.position = startPosition
        child.tempPosition = startPosition
        child.parent = parentIndex
        items.push(child)
      })
    })
    return items
  }

  function getContainers(data: InputData):ContainerItem[] {
    let start = 0
    let lastContainerHeight = 0
    return data.map((item, i) => {
      const containerHeight = getContainerHeight(item.children.length)
      const containerStart = start
      const containerPositionEnd = containerStart + containerHeight
      lastContainerHeight = containerHeight
      start += lastContainerHeight + CONTAINER_GAP
      return {
        order: i,
        height: containerHeight,
        children: item.children,
        position: containerStart,
        positionEnd: containerPositionEnd,
        data: item,
      }
    })
  }

  const onGestureUpdate = (index: number) => (event: GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) => {
    'worklet'
    const currentItem = draggableItems.current[index]
    let parent = containerItems.current[currentItem.parent]
    const currentPosition = event.translationY + currentItem.position
    const movingDown = event.changeY > 0
    const nextParentIndex = movingDown ? currentItem.parent + 1 : currentItem.parent - 1
    const nextParent = containerItems.current[nextParentIndex]
    const stillInsideParent = currentPosition > parent.position && currentPosition < parent.positionEnd
    currentItem.y.value = currentPosition

    if (!stillInsideParent && nextParent) {
      parent.children = parent.children.filter(el => el.key !== currentItem.key)
      parent.height = getContainerHeight(parent.children.length)
      parent.animatedHeight.value = withSpring(parent.height)
      currentItem.parent = nextParentIndex
      if (movingDown) {
        parent.positionEnd = parent.position + parent.height

        currentItem.order = 0
        nextParent.children.forEach((child, i) => {
          child.order = child.order + 1
        })
        nextParent.children.unshift(currentItem)
        nextParent.height = getContainerHeight(nextParent.children.length)
        nextParent.position = parent.positionEnd + CONTAINER_GAP
        nextParent.animatedPosition.value = withSpring(nextParent.position)
        nextParent.animatedHeight.value = withSpring(nextParent.height)
        currentItem.tempPosition = nextParent.position + CONTAINER_PADDING
      } else {
        parent.position = parent.position + ITEM_SIZE + ITEM_GAP
        parent.animatedPosition.value = withSpring(parent.position)

        currentItem.order = nextParent.children.length
        nextParent.children.push(currentItem)
        nextParent.height = getContainerHeight(nextParent.children.length)
        nextParent.positionEnd = nextParent.position + nextParent.height
        nextParent.animatedHeight.value = withSpring(nextParent.height)
        currentItem.tempPosition = nextParent.positionEnd - CONTAINER_PADDING - ITEM_SIZE

        parent.children.forEach((child) => {
          child.order = child.order - 1
        })
      }
    }

    for (let i = 0; i < draggableItems.current.length; i++) {
      const operatedItem = draggableItems.current[i]
      if (operatedItem.parent !== currentItem.parent) {continue}

      const exchangeValues = () => {
        const tOrder = operatedItem.order
        operatedItem.order = currentItem.order
        currentItem.order = tOrder
        const tPosition = operatedItem.position
        operatedItem.position = currentItem.tempPosition
        operatedItem.tempPosition = currentItem.tempPosition
        currentItem.tempPosition = tPosition
        operatedItem.y.value = withSpring(operatedItem.position)
      }

      if (movingDown) {
        if (operatedItem.position < currentPosition && operatedItem.order > currentItem.order) {
          exchangeValues()
        }
      } else {
        if (operatedItem.position > currentPosition && operatedItem.order < currentItem.order) {
          exchangeValues()
        }
      }
    }
  }

  const onGestureEnd = (index: number) => (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    'worklet'
    const currentItem = draggableItems.current[index]
    currentItem.position = currentItem.tempPosition
    currentItem.y.value = withSpring(currentItem.position)
  }

  const setAnimatedDraggable = useCallback((index: number) => (value: SharedValue<number>) => {
    console.log(index, value, draggableItems.current, draggableItems.current[index], 'value')
    draggableItems.current[index].y = value
  }, [])

  const setAnimatedContainer = useCallback((index: number) => (height?: SharedValue<number>, position: SharedValue<number>) => {
    containerItems.current[index].animatedHeight = height
    containerItems.current[index].animatedPosition = position
  }, [])

  return {
    onGestureEnd,
    onGestureUpdate,
    draggableItems,
    setAnimatedDraggable,
    containerItems,
    setAnimatedContainer,
    containers,
    items,
    draggableHeight,
  }
}
