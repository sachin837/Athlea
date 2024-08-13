import {FC, useCallback, useLayoutEffect} from 'react'
import {View} from 'react-native'
import {MessageProps, Message as DefaultMessage, BubbleProps} from 'react-native-gifted-chat'
import {MessageBubble} from './MessageBubble'
import {MessageWithOptions} from './MessageWithOptions'
import type {Message as CustomMessage, MessageOption} from '../../../../model/chat'
import {CustomViewsContainer} from './Message.styled'
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'


interface Props extends MessageProps<CustomMessage>{
  onSelectOption?: (option: MessageOption) => void
}

export const Message:FC<Props> = (props) => {

  const showOptions = !!props.currentMessage?.options?.length
  const position = useSharedValue(100)

  const renderBubble = useCallback((messageProps: BubbleProps<CustomMessage>) => (
    <MessageBubble {...messageProps} />
  ), [])

  useLayoutEffect(() => {
    appearAnimation()
  }, [])

  const appearAnimation = () => {
    'worklet'
    position.value = withSpring(0)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    // transform: [{translateY: position.value}],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <DefaultMessage
        {...props}
        renderBubble={renderBubble}
      />
      <CustomViewsContainer>
        {showOptions && (
          <MessageWithOptions
            {...props.currentMessage}
            onSelect={props.onSelectOption}
          />
        )}
      </CustomViewsContainer>
    </Animated.View>
  )
}
