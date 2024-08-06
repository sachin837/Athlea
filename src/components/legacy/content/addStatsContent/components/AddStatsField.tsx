import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {useTheme} from 'styled-components/native'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'

// Assuming your styling is handled elsewhere and correctly applies
const AddStatsField = ({
  StatsHeader,
  StatsDescription,
  onAddRemoveStat,
  isRemove = false, // Default to false to show "Add Stat" by default
}) => {
  const theme = useTheme()
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.addStatsContainer}>
            <Text style={styles.addStatsHeader}>{StatsHeader}</Text>
            <Text style={styles.addStatsText}>{StatsDescription}</Text>
          </View>
          <TouchableOpacity onPress={onAddRemoveStat}>
            <Text
              style={[
                styles.addStatsButton,
                {backgroundColor: isRemove ? 'black' : theme.secondary},
              ]}>
              {isRemove ? 'Remove' : 'Add Stat'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default AddStatsField

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  addStatsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
