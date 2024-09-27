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
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);

  const openPermissioSheet = () => setIsVisible(true)

  const closePermissioSheet = () => setIsVisible(false)

  const onSend = useCallback((newMessages:CustomMessage[] = []) => {
    
    const { text } = newMessages[0];

    // If there's no text but there's an attachment, create a message with the attachment
    if (!text.trim() && selectedAttachment) {
      const messageWithAttachment = {
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        user: { _id: 1 },
        image: selectedAttachment.uri,
        text: '',
        file: selectedAttachment?.uri ? {
          uri: selectedAttachment?.uri,
          name: selectedAttachment?.name,
          type: selectedAttachment?.type,
        } : {},
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [messageWithAttachment])
      );
      setSelectedAttachment(null); // Clear attachment after sending
    }
    
    // If there's text (with or without an attachment), handle accordingly
    else if (text.trim()) {
      const messageWithTextAndAttachment = {
        ...newMessages[0],
        image: selectedAttachment?.uri || null,
        file: selectedAttachment?.uri ? {
          uri: selectedAttachment?.uri,
          name: selectedAttachment?.name,
          type: selectedAttachment?.type,
        } : {},
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [messageWithTextAndAttachment])
      );
      setSelectedAttachment(null); // Clear attachment after sending
    }
  }, [selectedAttachment])

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
      Keyboard.dismiss()
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })

      let fileUri = res[0].uri
      if (Platform.OS === 'ios') {
        // Convert file path for iOS
        fileUri = decodeURIComponent(fileUri).replace('file://', '');
      }
      setSelectedAttachment({uri: fileUri,
        name: res[0].name,
        type: res[0].type,})
      

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
    selectedAttachment,
    setSelectedAttachment,
  }
}

export type UseChatLayoutType = ReturnType<typeof useChatLayout>
