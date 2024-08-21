import {FC, useEffect, useLayoutEffect} from 'react'
import {View} from 'react-native'
import {Bubble, BubbleProps} from 'react-native-gifted-chat'
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Text} from '../../../primitives'
import {Message} from '../../../../model/chat'


interface Props extends BubbleProps<Message> {

}

export const MessageBubble:FC<Props> = (props) => {
  const theme = useTheme()

  const showUsername = () => {
    return (
      props.currentMessage?.user._id !== props.user?._id &&
        props.previousMessage?.user?._id !== props.currentMessage?.user._id
    )
  }

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          borderRadius: 8,
          borderBottomLeftRadius: 4,
          backgroundColor: theme.messageLeftBubble,
          borderWidth: 1,
          borderColor: theme.messageLeftBorder,
          margin: -6,
          padding:2,
          marginLeft:2,
        },
        right: {
          borderRadius: 8,
          borderBottomRightRadius: 4,
          backgroundColor: theme.messageRightBubble,
          borderWidth: 1,
          borderColor: theme.messageRightBubble,
          padding:4,
        },
      }}
      renderTime={() => null}
      renderCustomView={(props) => showUsername() && (
        <View style={{marginLeft: 8}}>
          <Text type={'small'} weight={'700'}>Athlea</Text>
        </View>
      )}
    />
  )
}
