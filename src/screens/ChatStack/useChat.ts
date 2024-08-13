import {useCallback, useEffect, useRef, useState} from 'react'
import type BottomSheet from '@gorhom/bottom-sheet'
import {useChatLayout} from '../../layouts'
import avatar from '../../assets/images/ChatLogo.png'
import { useNavigation } from '@react-navigation/native'


export const useChat = () => {

  const chatSheetRef = useRef<BottomSheet>(null)

  const [snapPoints] = useState(['100%'])

  const chatLayoutProps = useChatLayout()

  const openMicSheet = useCallback(() => chatSheetRef.current?.expand(), [])

  const closeMicSheet = useCallback(() => chatSheetRef.current?.close(), [])

  const navigation = useNavigation();

  const backToHome = () => navigation.goBack();

  useEffect(() => {
    chatLayoutProps.setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar,
        },
      },
      {
        _id: 2,
        text: 'Choose your current fitness level',
        createdAt: new Date(),
        user: {
          _id: 'athlea',
          name: 'Athlea',
          avatar,
        },
        options: [
          {label: 'Running', value: 'r', icon: 'running'},
          {label: 'Cycling', value: 'c', icon: 'cycling'},
          {label: 'Gym', value: 'g', icon: 'strength'},
          {label: 'Skiing', value: 's', icon: 'skiing'},
          {label: 'Swimming', value: 'sw', icon: 'swimming'},
          {label: 'Table Tennis', value: 't', icon: 'tennis'},
        ],
        multiselect: true,
      },
      {
        _id: 3,
        text: 'Whats your training goal?',
        createdAt: new Date(),
        user: {
          _id: 'athlea',
          name: 'Athlea',
          avatar,
        },
        options: [
          {label: 'Run longer distances', value: 'r'},
          {label: 'Hike without fatigue', value: 'c'},
          {label: 'Muscle relief techniques', value: 'g'},
          {label: 'Master pull-ups', value: 's'},
          {label: 'Mindfulness practice', value: 'sw'},
          {label: 'Finish a triathlon', value: 't'},
        ],
        fontType: 'subBody',
      },
      {
        _id: 4,
        text: 'What`s your prefered sport type?',
        createdAt: new Date(),
        user: {
          _id: 'athlea',
          name: 'Athlea',
          avatar,
        },
      },
    ])
  }, [])


  return {
    chatSheetRef,
    snapPoints,
    openMicSheet,
    closeMicSheet,
    chatLayoutProps,
    backToHome,
  }
}
