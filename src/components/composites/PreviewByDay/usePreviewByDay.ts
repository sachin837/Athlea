import {useCallback, useState} from 'react'
import {LayoutChangeEvent} from 'react-native'
import {format} from 'date-fns/index'


export const usePreviewByDay = ({onLayout}) => {

  const numberOfCells = 7
  const cellGap = 4
  const [cellSize, setCellSize] = useState(24)

  const onContainerLayout = useCallback((layout: LayoutChangeEvent) => {
    const containerWidth = layout.nativeEvent.layout.width - 64
    const size = Math.floor((containerWidth - (cellGap * (numberOfCells - 1))) / numberOfCells)
    setCellSize(size)
    onLayout?.(layout)
  }, [])

  const getRingSize = useCallback((totalSeconds: number) => {
    const maxSize = cellSize - 8
    const minSize = 20
    return Math.floor(Math.max(Math.min(1, totalSeconds / 3600) * maxSize, minSize))
  }, [cellSize])

  const getTime = useCallback((totalSeconds: number) => {
    if (totalSeconds < 2400) {return ''}
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const date = new Date().setSeconds(seconds)
    const formattedSeconds = format(date, 'ss')
    return `${minutes}:${formattedSeconds}`
  }, [])

  return {
    cellSize,
    onContainerLayout,
    getRingSize,
    getTime,
  }
}
