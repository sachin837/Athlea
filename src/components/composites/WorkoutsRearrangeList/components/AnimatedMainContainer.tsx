import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { FC, useEffect } from 'react'
import { Colors } from '../../../../theme'
import { Text } from '../../../primitives/Text'
import { useTheme } from 'styled-components/native'


interface Props {
  title: string
  height: number
  position: number
  setAnimatedValues: (height: SharedValue<number>, position: SharedValue<number>) => void
}

export const AnimatedMainContainer: FC<Props> = (props) => {
  const theme = useTheme()
  const { height, position, title } = props

  const animatedHeight = useSharedValue(height)
  const animatedPosition = useSharedValue(position)

  useEffect(() => {
    props.setAnimatedValues(animatedHeight, animatedPosition)
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight?.value || 0,
      transform: [{ translateY: animatedPosition?.value || 0 }],
      borderRadius: 8,
    }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    }
  })

  return (
    <Animated.View
      style={[styles.main, animatedStyle]}
    >
      <Text style={styles.textStyle} themeColor={'subtitle'}>{title}</Text>
      <Animated.View style={[styles.container, containerStyle, { backgroundColor: theme.background }]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    borderRadius: 16,
  },
  textStyle: {
    width: 48,
  },
})
