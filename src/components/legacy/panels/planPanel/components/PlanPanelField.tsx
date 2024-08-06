import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {Icon} from '../../sourcePanel/sourcePanel.style'

const PlanPanelField = ({PlanIcon, PlanScore, PlanMetric}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <Icon name={PlanIcon} size={14} color="black" /> */}
        <Text style={styles.addStatsText}>{PlanMetric}</Text>
      </View>
      <Text style={styles.addStatsHeader}>{PlanScore}</Text>
    </View>
  )
}

export default PlanPanelField

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
  },
  addStatsContainer: {
    width: '80%',
  },
  addStatsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addStatsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 3,
  },
  addStatsText: {
    fontSize: 14,
    color: 'white',
    paddingLeft: 3,
  },
  phaseGraphContainer: {
    marginTop: 5,
  },
  addStatsButton: {
    padding: 10,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seperator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 10,
  },
})
