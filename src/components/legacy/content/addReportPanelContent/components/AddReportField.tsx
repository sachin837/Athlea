import {View, Text} from 'react-native'
import React from 'react'
import {useTheme} from 'styled-components/native'
import {TouchableOpacity} from 'react-native'
import {StyleSheet} from 'react-native'
import BarGraph from '../../../graphs/reportGraphs/BarGraph'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'
import LineGraph from '../../../graphs/reportGraphs/LineGraph'
import TextGraph from '../../../graphs/reportGraphs/TextGraph'
import RectGraph from '../../../graphs/reportGraphs/RectGraph'
import {Icon} from '../../metricContent/metricContent.style'

const AddReportField = ({
  PanelHeader,
  PanelDescription,
  type,
  isAdded,
  onAddRemovePanel,
}) => {
  const theme = useTheme()

  const typeGraph = () => {
    switch (type) {
    case 'bar':
      return (
        <View>
          <BarGraph />
        </View>
      )
    case 'line':
      return (
        <View>
          <LineGraph />
        </View>
      )
    case 'text':
      return (
        <View>
          <TextGraph />
        </View>
      )
    case 'rectangle':
      return (
        <View>
          <RectGraph />
        </View>
      )
    default:
      return (
        <View>
          <BarGraph />
        </View>
      )
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.graphContainer}>{typeGraph()}</View>
          <View style={styles.addStatsContainer}>
            <Text style={styles.addStatsHeader}>{PanelHeader}</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.addStatsText}>{PanelDescription}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onAddRemovePanel}>
            <Text
              style={[
                styles.addStatsButton,
                {backgroundColor: isAdded ? 'black' : theme.fourth},
              ]}>
              {isAdded ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default AddReportField

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  graphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addStatsContainer: {
    alignItems: 'flex-start',
    width: widthPercentageToDP(64),
  },
  addStatsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  addStatsText: {
    fontSize: 14,
    color: 'black',
    width: widthPercentageToDP(58),
  },
  addStatsButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: 'white',
    width: widthPercentageToDP(18),
    textAlign: 'center',
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
})
