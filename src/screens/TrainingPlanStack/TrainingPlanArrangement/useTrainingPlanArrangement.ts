import { useCallback, useState } from 'react'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { RouteNames } from '../../../_constants'
// import {useAnimatedDraggable} from '../../../hooks/useAnimatedDraggable'

const v4 = uuid.v4

export const useTrainingPlanArrangement = () => {

  const navigation = useNavigation()

  // const [data] = useState([
  //   {
  //     date: new Date(),
  //     children: [
  //       {key: (v4() as string), value: '1'},
  //       {key: (v4() as string), value: '2'},
  //       {key: (v4() as string), value: '3'},
  //       {key: (v4() as string), value: '4'},
  //       {key: (v4() as string), value: '5'},
  //       {key: (v4() as string), value: '6'},
  //       {key: (v4() as string), value: '7'},
  //       {key: (v4() as string), value: '8'},
  //     ],
  //     key: (v4() as string),
  //   },
  //   {
  //     date: new Date(),
  //     children: [
  //       {key: (v4() as string), value: '4'},
  //       {key: (v4() as string), value: '5'},
  //       {key: (v4() as string), value: '6'}],
  //     key: (v4() as string),
  //   },
  //   {
  //     date: new Date(),
  //     children: [
  //       {key: (v4() as string), value: '7'},
  //       {key: (v4() as string), value: '8'},
  //       {key: (v4() as string), value: '9'}],
  //     key: (v4() as string),
  //   },
  //   {
  //     date: new Date(),
  //     children: [
  //       {key: (v4() as string), value: '10'},
  //       {key: (v4() as string), value: '11'},
  //       {key: (v4() as string), value: '12'}],
  //     key: (v4() as string),
  //   },
  // ])
  const getWeekDates = (startDate: any) => {
    const startOfWeek = new Date(startDate)
    const dayOfWeek = startDate.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    startOfWeek.setDate(startDate.getDate() + diff)
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDates.push(date)
    }
    return weekDates
  }

  const initializeData = () => {
    const weekDates = getWeekDates(new Date())

    const childrenTemplates = [
      [
        { key: (v4() as string), value: 'Strength', subTitle: 'Strength Training', distanceTime: '60min', icon: 'ai', color: 'strength' },
        { key: (v4() as string), value: 'Endurance', subTitle: 'Long Run', distanceTime: '16km', icon: 'ai', color: 'endurance' },
      ],
      [
        { key: (v4() as string), value: 'Recovery', subTitle: '', distanceTime: '', icon: 'ai', color: 'recovery' },
      ],
      [
        { key: (v4() as string), value: 'Endurance', subTitle: 'Long Run', distanceTime: '16km', icon: 'ai', color: 'endurance' },
        { key: (v4() as string), value: 'Recovery', subTitle: '', distanceTime: '', icon: 'ai', color: 'recovery' },
      ],
      [
        { key: (v4() as string), value: 'Recovery', subTitle: '', icon: 'ai', color: 'recovery' },
      ],
      [
        { key: (v4() as string), value: 'Strength', subTitle: 'Strength Training', distanceTime: '40min', icon: 'ai', color: 'strength' },
        { key: (v4() as string), value: 'Endurance', subTitle: 'Long Run', distanceTime: '14km', icon: 'ai', color: 'endurance' },
        { key: (v4() as string), value: 'Recovery', subTitle: '', distanceTime: '', icon: 'ai', color: 'recovery' },
      ],
      [
        { key: (v4() as string), value: 'Strength', subTitle: 'Strength Training', distanceTime: '90min', icon: 'ai', color: 'strength' },
        { key: (v4() as string), value: 'Endurance', subTitle: 'Long Run', distanceTime: '18km', icon: 'ai', color: 'endurance' },
        { key: (v4() as string), value: 'Recovery', subTitle: '', distanceTime: '', icon: 'ai', color: 'recovery' },
      ],
      [
        { key: (v4() as string), value: 'Strength', subTitle: 'Strength Training', distanceTime: '70min', icon: 'ai', color: 'strength' },
        { key: (v4() as string), value: 'Endurance', subTitle: 'Long Run', icon: 'ai', color: 'endurance', distanceTime: '70min' },
      ],
    ]

    // Generate data for each day of the week
    return weekDates.map((date, index) => ({
      date,
      children: childrenTemplates[index % childrenTemplates.length],
      key: (v4() as string),
    }))
  }

  const [data] = useState(initializeData())

  const onCreateNew = useCallback(() => {
    navigation.navigate(RouteNames.trainingStack)
  }, [])

  return {
    data,
    onCreateNew,
  }
}
