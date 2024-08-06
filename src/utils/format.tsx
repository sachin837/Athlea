// utils.js
import {parseISO, formatDistanceToNow} from 'date-fns'
import {ReportBodyText} from '../components/legacy/report/report.style'
import {Text, View} from 'react-native'

export const formatThreadDate = dateString => {
  if (!dateString) {
    console.warn('No date provided, using current date as fallback')
    return formatDistanceToNow(new Date(), {addSuffix: true})
  }

  try {
    const date = parseISO(dateString)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    return formatDistanceToNow(date, {addSuffix: true})
  } catch (error) {
    console.error(error)
    return formatDistanceToNow(new Date(), {addSuffix: true})
  }
}

export const BulletPointText = ({items}) => {
  return items.map((item, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
      <Text style={{fontWeight: 'bold'}}>{'\u2022' + ' '}</Text>
      <Text>{item}</Text>
    </View>
  ))
}
