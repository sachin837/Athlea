import Animated, {SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {StyleSheet, View} from 'react-native'
import {FC, useEffect} from 'react'
import {Colors} from '../../../theme'
import {Text} from '../../../components'


interface Props {
  title: string
  height: number
  position: number
  setAnimatedValues: (height: SharedValue<number>, position: SharedValue<number>) => void
}

export const AnimatedMainContainer:FC<Props> = (props) => {

  const { height, position, title } = props

  const animatedHeight = useSharedValue(height)
  const animatedPosition = useSharedValue(position)

  useEffect(() => {
    console.log('something here?')
    props.setAnimatedValues(animatedHeight, animatedPosition)
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight?.value || 0,
      transform: [{translateY: animatedPosition?.value || 0}],
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
      <Text style={styles.textStyle}>{title}</Text>
      <Animated.View style={[styles.container, containerStyle]} />
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
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 16,
  },
  textStyle: {
    width: 48,
  },
})
