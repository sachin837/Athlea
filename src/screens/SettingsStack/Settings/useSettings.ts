import {useCallback, useRef, useState} from 'react'
import type BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'


export const useSettings = () => {

  const profileSheetRef = useRef<BottomSheet>(null)
  const notificationSheetRef = useRef<BottomSheet>(null)

  const [snapPoints] = useState(['100%'])
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [generalNotifications, setGeneralNotifications] = useState({
    n1: true,
    n2: false,
    n3: false,
    n4: false,
  });
  const [workoutsNotifications, setWorkoutsNotifications] = useState({
    n1: true,
    n2: false,
    n3: true,
    n4: false,
  });
  const [feedNotifications, setFeedNotifications] = useState({
    n1: true,
    n2: false,
    n3: true,
  });

  const openProfileSheet = useCallback(() => profileSheetRef.current?.expand(), [])

  const closeProfileSheet = useCallback(() => profileSheetRef.current?.close(), [])

  const openNotificationSheet = useCallback(() => notificationSheetRef.current?.expand(), [])

  const closeNotificationSheet = useCallback(() => notificationSheetRef.current?.close(), [])

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
    backToHome,
  }
}
