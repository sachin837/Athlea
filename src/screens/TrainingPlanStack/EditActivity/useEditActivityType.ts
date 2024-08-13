import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'

export const useEditActivityType = () => {
  const [valueRepetition, setValueRepetition] = useState(0);
  const [valueSets, setValueSets] = useState(30);
  const [valueWeight, setValueWeight] = useState(30);

  const navigation = useNavigation()

  const handleSets = (val: any) => {
    setValueSets(val)
  }

  const handleRepetition = (val: any) => {
    setValueRepetition(val)
  }
  const handleWeight = (val: any) => {
    setValueWeight(val)
  }

  return {
    handleSets,
    valueSets,
    handleRepetition,
    valueRepetition,
    handleWeight,
    valueWeight
  }
}
