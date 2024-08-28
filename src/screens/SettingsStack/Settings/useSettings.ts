import {useCallback, useRef, useState} from 'react'
import type BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'


export const useSettings = () => {

  const profileSheetRef = useRef<BottomSheet>(null)

  const [snapPoints] = useState(['100%'])

  const openProfileSheet = useCallback(() => profileSheetRef.current?.expand(), [])

  const closeProfileSheet = useCallback(() => profileSheetRef.current?.close(), [])

  const navigation = useNavigation();

  const backToHome = () => navigation.goBack();


  return {
    profileSheetRef,
    snapPoints,
    openProfileSheet,
    closeProfileSheet,
    backToHome,
  }
}
