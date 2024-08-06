import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'
import Loading from '../../../assets/images/loading.svg';
import User from '../../../assets/images/user.svg';

export const useAddTrainingType = () => {

  const navigation = useNavigation()

  const onCreateNew = useCallback(() => {
    navigation.navigate(RouteNames.createTrainingType)
  }, [])

  const ManualEntry = useCallback(() => {
    navigation.navigate(RouteNames.manualEntry)
  }, [])

  const addNewActivity = useCallback(() => {
    navigation.navigate(RouteNames.addNewActivity)
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

  const activities = [
    { id: 1, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
    { id: 2, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
    { id: 3, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
    { id: 4, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
    { id: 5, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
  ];
  return {
    onCreateNew,
    onSelectTraining,
    data,
    ManualEntry,
    addNewActivity,
    activities
  }
}
