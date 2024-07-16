import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'
import {TouchableOpacity} from 'react-native'
import {useTheme} from 'styled-components/native'
import HalfGraph from '../../../graphs/halfGraph'
import FullGraph from '../../../graphs/fullGraph'
import PhaseGraph from '../../../graphs/phaseGraph'
import {Icon} from '../../metricContent/metricContent.style'
import DeviceList from '../../../devices'

const AddPlanField = ({
  PlanHeader,
  PlanDescription,
  isAdded = false, // Default to false to show "Add Stat" by default
  openBottomSheet,
  toggleAdded,
  data,
}) => {
  const theme = useTheme()
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.addStatsContainer}>
            <DeviceList />
            <View style={styles.addDtatsHeaderContainer}>
              <Text style={styles.addStatsHeader}>{PlanHeader}</Text>
              <TouchableOpacity onPress={openBottomSheet}>
                <Icon
                  name="info-circled"
                  size={18}
                  color="black"
                  marginBottom={2}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.addStatsText}>{PlanDescription}</Text>
            <View style={styles.phaseGraphContainer}>
              <PhaseGraph data={data} />
            </View>
          </View>
          <TouchableOpacity onPress={toggleAdded}>
            <Text
              style={[
                styles.addStatsButton,
                {backgroundColor: isAdded ? 'black' : theme.secondary},
              ]}>
              {isAdded ? 'Added' : 'Add Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default AddPlanField

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addStatsContainer: {
    alignItems: 'flex-start',
    width: widthPercentageToDP(74),
  },
  phaseGraphContainer: {
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  addDtatsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addStatsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 5,
    paddingRight: 5,
  },
  addStatsText: {
    fontSize: 14,
    color: 'black',
    width: widthPercentageToDP(70),
  },
  addStatsButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: 'white',
    width: widthPercentageToDP(19),
    textAlign: 'center',
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
})
