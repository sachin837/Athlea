import {TrainingTypes} from '../../../_constants'
import {useCallback, useState} from 'react'
import {LayoutChangeEvent} from 'react-native'

export enum TrainTabs {
  phases = 'phases',
  calendar = 'calendar'
}

export const useTrain = () => {

  const data = Array.from({length: 10}).map((_, index) => (
    {
      title: `Week ${index}`,
      data: [
        {category: TrainingTypes.endurance, date: 'Mon, 22 Apr 2024', measurements: [{label: 'Distance', value: 10, measure: 'km'}, {label: 'Time', value: '58:24'}, {label: 'Avg. Pace', value: '6`23``', measure: '/km'}], complete: true},
        {category: TrainingTypes.strength, date: 'We, 24 Apr 2024', measurements: [{label: 'Distance', value: 10, measure: 'km'}, {label: 'Time', value: '58:24'}, {label: 'Avg. Pace', value: '6`23``', measure: '/km'}], complete: true},
        {category: TrainingTypes.endurance, date: 'Fri, 26 Apr 2024', measurements: [{label: 'Distance', value: 10, measure: 'km'}, {label: 'Time', value: '58:24'}, {label: 'Avg. Pace', value: '6`23``', measure: '/km'}], complete: true},
      ],
    }
  ))

  const [tabsHeight, setTabsHeight] = useState([200, 300])
  const [selectedTab, setSelectedTab] = useState(0)
  const [routes] = useState([
    {title: 'Phases', key: TrainTabs.phases},
    {title: 'Calendar', key: TrainTabs.calendar},
  ])

  const onLayout = useCallback((tab: number) => (event: LayoutChangeEvent) => {
    setTabsHeight(prev => {
      const updated = [...prev]
      updated[tab] = event.nativeEvent?.layout.height
      return updated
    })
  }, [])

  return {
    data,
    selectedTab,
    setSelectedTab,
    routes,
    onLayout,
    tabsHeight,
  }
}
