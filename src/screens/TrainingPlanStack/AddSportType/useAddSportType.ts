import { useCallback, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'
import Running from "../../../assets/images/Running.svg";
import Cycling from "../../../assets/images/Cycling.svg";
import Gym from "../../../assets/images/Gym.svg";
import Skiing from "../../../assets/images/Skiing.svg";
import Swimming from "../../../assets/images/Swimming.svg";
import Table_tennis from "../../../assets/images/Table_tennis.svg";


export const useAddSportType = () => {

  const navigation = useNavigation()

  const [selectedSportType, setSelectedSportType] = useState('')

  const sportData = [
    { name: 'Running', icon: Running },
    { name: 'Cycling', icon: Cycling },
    { name: 'Gym', icon: Gym },
    { name: 'Skiing', icon: Skiing },
    { name: 'Swimming', icon: Swimming },
    { name: 'Table tennis', icon: Table_tennis },
  ]

  const sectionData = useMemo(() => ([
    { title: 'Favourites', data: sportData },
    { title: 'Recommended', data: sportData },
    { title: 'Other', data: sportData },
  ]), [])

  const isSelected = useCallback((type: string) => {
    return selectedSportType === type
  }, [selectedSportType])

  const handleSelect = useCallback((type: string) => () => {
    setSelectedSportType(type)
  }, [])

  const onContinue = useCallback(() => {
    navigation.navigate(RouteNames.addTrainingType)
  }, [])

  return {
    sectionData,
    isSelected,
    handleSelect,
    onContinue,
  }
}
