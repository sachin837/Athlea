import {FC, useCallback} from 'react'
import {FlatList, LayoutChangeEvent, View} from 'react-native'
import {TimelineDash, TimelineItem} from './components/TimelineItem'


interface Props {
  onLayout?: (event: LayoutChangeEvent) => void
}

export const Timeline:FC<Props> = (props) => {

  const data =  Array.from({length: 10}).map((item, index) => ({title: `Week ${index + 1}`}))

  const renderItem = useCallback(({item, index}) => (
    <TimelineItem
      title={item.title}
      first={index === 0}
    />
  ),[])

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        onLayout={props.onLayout}
        contentContainerStyle={{paddingHorizontal: 16}}
      />
    </View>
  )
}
