import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'
import {Icon} from '../../metricContent/metricContent.style'
import {useTheme} from 'styled-components/native'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'
import PageButtonRow from '../../../pageButtonRow'
import CategoryPersonRow from '../../../categoryPersonRow'

const AddPersonField = ({
  PersonName,
  PersonImageSource,
  PersonImageName,
  Recommended,
  Specialization,
  onAddPerson,
  addStatsText = 'Add',
}) => {
  const theme = useTheme()

  // Function to determine which icons to display based on specialization
  const determineIcons = specialization => {
    switch (specialization) {
    case 'strength':
      return ['strengthicon', 'enduranceicon']
    case 'endurance':
      return ['enduranceicon', 'recoveryicon']
    case 'wellbeing':
      return ['wellbeingicon', 'nutritionicon']
    case 'recovery':
      return ['recoveryicon', 'strengthicon']
    case 'nutrition':
      return ['nutritionicon', 'wellbeingicon']
    default:
      return [] // Return an empty array or default icons as fallback
    }
  }

  const iconsToShow = determineIcons(Specialization)
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          {PersonImageSource ? (
            <Image
              source={PersonImageSource}
              style={{
                width: 33,
                height: 33,
                marginRight: 10,
              }}
            />
          ) : (
            <Icon
              name="person"
              size={28}
              style={{
                marginRight: 10,
              }}
            />
          )}
          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.personName}>{PersonName}</Text>
              <CategoryPersonRow iconNames={iconsToShow} />
            </View>
            {Recommended && <Text>Recommended</Text>}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAddPerson(PersonName, PersonImageName)}>
          <Text style={[styles.addStatsButton]}>{addStatsText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.seperator} />
    </>
  )
}

export default AddPersonField

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 10,
  },
  addStatsButton: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 5,
    color: 'white',
    width: widthPercentageToDP(16),
    textAlign: 'center',
    backgroundColor: 'black',
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
})
