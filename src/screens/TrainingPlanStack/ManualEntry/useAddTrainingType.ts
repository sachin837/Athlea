import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'


export const useAddTrainingType = () => {

  const navigation = useNavigation()

  const onCreateNew = useCallback(() => {
    navigation.navigate(RouteNames.createTrainingType)
  }, [])

  const ManualEntry = useCallback(() => {
    navigation.navigate(RouteNames.manualEntry)
  }, [])


  const onSelectTraining = useCallback(() => {
    navigation.navigate(RouteNames.selectActivityDate)
  }, [])

  const data = [
    { id: '1', name: 'Strength training' },
    { id: '2', name: 'Strength training' },
    { id: '3', name: 'Strength training' },
    { id: '4', name: 'Strength training' },
    { id: '5', name: 'Strength training' },
    { id: '6', name: 'Strength training' },
    { id: '7', name: 'Strength training' },
    { id: '8', name: 'Strength training' },
    { id: '9', name: 'Strength training' },
    { id: '10', name: 'Strength training' },
    { id: '11', name: 'Strength training' },
    { id: '12', name: 'Strength training' },
  ];

  return {
    onCreateNew,
    onSelectTraining,
    data,
    ManualEntry
  }
}
