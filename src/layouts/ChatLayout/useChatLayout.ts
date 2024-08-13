import {useCallback, useEffect, useState} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import uuid from 'react-native-uuid'
import type {Message as CustomMessage} from '../../model/chat'
import avatar from '../../assets/images/ChatLogo.png'


export enum InputTypes {
  text,
  confirm,
  skip,
  microphone
}

export const useChatLayout = () => {

  const [inputType, setInputType] = useState<InputTypes>(InputTypes.text)
  const [messages, setMessages] = useState<CustomMessage[]>([])

  const onSend = useCallback((newMessages:CustomMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    )
  }, [])

  const addAthleaMessage = useCallback((newMessage: {text: string,}) => {
    const athleaMessage: CustomMessage[] = [
      {
        text: newMessage.text,
        _id: uuid.v4() as string,
        createdAt: new Date(),
        user: {
          _id: 'athlea',
          name: 'Athlea',
          avatar,
        },
      },
    ]
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, athleaMessage),
    )
  }, [])

  return {
    messages,
    setMessages,
    onSend,
    addAthleaMessage,
    inputType,
    setInputType,
  }
}

export type UseChatLayoutType = ReturnType<typeof useChatLayout>
