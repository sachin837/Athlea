import {useCallback, useRef, useState} from 'react'
import type BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'


export const useSettings = () => {

  const profileSheetRef = useRef<BottomSheet>(null)
  const notificationSheetRef = useRef<BottomSheet>(null)
  const deviceSheetRef = useRef<BottomSheet>(null)

  const [snapPoints] = useState(['100%'])

  const openProfileSheet = useCallback(() => profileSheetRef.current?.expand(), [])

  const closeProfileSheet = useCallback(() => profileSheetRef.current?.close(), [])

  const openNotificationSheet = useCallback(() => notificationSheetRef.current?.expand(), [])

  const closeNotificationSheet = useCallback(() => notificationSheetRef.current?.close(), [])
  
  const openDeviceSheet = useCallback(() => deviceSheetRef.current?.expand(), [])

  const closeDeviceSheet = useCallback(() => deviceSheetRef.current?.close(), [])

  const navigation = useNavigation();

  const backToHome = () => navigation.goBack();


  return {
    snapPoints,
    profileSheetRef,
    openProfileSheet,
    closeProfileSheet,
    notificationSheetRef,
    openNotificationSheet,
    closeNotificationSheet,
    deviceSheetRef,
    openDeviceSheet,
    closeDeviceSheet,
    backToHome,
  }
}
