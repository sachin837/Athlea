import {useCallback, useEffect, useState} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import uuid from 'react-native-uuid'
import type {Message as CustomMessage, FileMessage} from '../../model/chat'
import avatar from '../../assets/images/Logo.png'
import DocumentPicker from 'react-native-document-picker';
import { Keyboard, Platform } from 'react-native';

export enum InputTypes {
  text,
  confirm,
  skip,
  microphone
}

export const useChatLayout = () => {

  const [inputType, setInputType] = useState<InputTypes>(InputTypes.text)
  const [messages, setMessages] = useState<CustomMessage[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  

  const openPermissioSheet = () => setIsVisible(true)

  const closePermissioSheet = () => setIsVisible(false)

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

  const handleAttachment = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })

      let fileUri = res[0].uri
      if (Platform.OS === 'ios') {
        // Convert file path for iOS
        fileUri = decodeURIComponent(fileUri).replace('file://', '');
      }

      const message: FileMessage = {
        _id: Math.random().toString(36).substring(7),
        text: '', // or you can set a default text, like the file name
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
        },
        file: {
          uri: fileUri,
          name: res.name,
          type: res.type,
        },
        image:fileUri,
      };

      onSend([message])
      Keyboard.dismiss()
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  }

  return {
    messages,
    setMessages,
    onSend,
    addAthleaMessage,
    inputType,
    setInputType,
    handleAttachment,
    isVisible,
    openPermissioSheet,
    closePermissioSheet,
    isTyping,
  }
}

export type UseChatLayoutType = ReturnType<typeof useChatLayout>
