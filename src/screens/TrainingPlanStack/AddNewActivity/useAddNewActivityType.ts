import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'
import User from "../../../assets/images/exercise.svg";


export const useAddTrainingType = () => {

  const navigation = useNavigation()

  const onCreateNew = useCallback(() => {
    navigation.navigate(RouteNames.createTrainingType)
  }, [])

  const ManualEntry = useCallback(() => {
    navigation.navigate(RouteNames.manualEntry)
  }, [])


  const EditActivity = useCallback(() => {
    navigation.navigate(RouteNames.editActivity)
  }, [])

  const BodyPart = [
    { id: '1', name: 'Back' },
    { id: '2', name: 'Chest' },
    { id: '3', name: 'Legs' },
  ];

  const activities = [
    { id: 1, title: 'Warm Up', description: '3x8 reps', dis: '24 kg', duration: '10 min', userImage: User, },
    { id: 2, title: 'Warm Up', description: '3x8 reps', dis: '12 kg', duration: '10 min', userImage: User, },
    { id: 3, title: 'Warm Up', description: '3x8 reps', dis: '4 kg', duration: '10 min', userImage: User, },
    { id: 4, title: 'Warm Up', description: '3x8 reps', dis: '22 kg', duration: '10 min', userImage: User, },
    { id: 5, title: 'Warm Up', description: '3x8 reps', dis: '23 kg', duration: '10 min', userImage: User, },
  ];
  return {
    onCreateNew,
    EditActivity,
    BodyPart,
    ManualEntry,
    activities
  }
}
