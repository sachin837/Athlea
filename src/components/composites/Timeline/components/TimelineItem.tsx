import {View} from 'react-native'
import DashedLine from 'react-native-dashed-line'
import {Text} from '../../../primitives'
import {Day, DaysContainer} from '../Timeline.styles'
import {Colors} from '../../../../theme'


export const TimelineItem = ({title, days, first}) => {
  return (
    <View style={{minWidth: 56, alignItems: 'center', gap: 6}}>
      <Text type={'tiny'} color={Colors.black4} style={{paddingHorizontal: 4}}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        {first && <TimelineDash />}
        <DaysContainer>
          <DayItem active time={'1h'} />
          <DayItem active={false} time={'4h'} />
          <DayItem active={false} time={'2h'} />
          <DayItem active time={'1h'} />
          <DayItem active time={'5h'} />
          <DayItem active={false} time={'2h'} />
          <DayItem active time={'1h'} />
        </DaysContainer>
        <TimelineDash />
      </View>
    </View>
  )
}

const DayItem = ({active, time}) => {
  return (
    <Day active={active}>
      {active && (
        <Text type={'small'} color={Colors.green} bold>
          {time}
        </Text>
      )}
    </Day>
  )
}

export const TimelineDash = () => {
  return (
    <DashedLine
      axis={'vertical'}
      dashLength={10}
      dashThickness={1}
      dashColor={Colors.black4}
    />
  )
}
