import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useFilter} from '../../../../contexts/FilterContext.tsx'; // Removed direct FilterContext import
import {useDispatch, useSelector} from 'react-redux';
const TimeSelector = ({
  options,
  paddingHorizontal = 28, // Overrides defaultProps
  marginHorizontal = 20, // Overrides defaultProps
}) => {
  const dispatch = useDispatch();
  // const filterType = useSelector(state => state.filters.filterType);

  // useEffect(() => {
  //   // Check if the current filterType is not within options, then reset it to the first option.
  //   // This is useful for cases where the filterType might be set to a value not present in the current options.
  //   if (!options.includes(filterType)) {
  //     setFilterType(options[0]);
  //   }
  // }, [options, filterType, setFilterType]);

  // const handleSelect = option => {
  //   dispatch(setFilterType(option));
  // };

  const containerStyle = [
    styles.segmentedControlContainer,
    {marginHorizontal}, // Use the passed marginHorizontal value
  ];

  // const getOptionStyle = option => [
  //   styles.option,
  //   {paddingHorizontal}, // Use the passed paddingHorizontal value
  //   filterType === option && styles.selectedOption,
  // ];

  return (
    <View style={containerStyle}>
      {options.map(option => (
        <View key={option}>
          <TouchableOpacity
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}>
            {/* <Text
              style={[
                styles.optionText,
                filterType === option && styles.selectedOptionText,
              ]}>
              {option}
            </Text> */}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TimeSelector;

// Styles remain unchanged

const styles = StyleSheet.create({
  segmentedControlContainer: {
    flexGrow: 1, // Take up all available space
    flexDirection: 'row',
    justifyContent: 'space-evenly', // This will distribute the options evenly
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 20,
  },
  option: {
    flex: 1, // Take equal space
    paddingVertical: 8,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  selectedOption: {
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  optionText: {
    color: '#000000',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  separator: {
    width: 1,
    backgroundColor: '#000000', // Color of the separator line
  },
});
