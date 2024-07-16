import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useFilter} from '../../../../contexts/FilterContext.tsx'; // Removed direct FilterContext import

const LoadSelector = ({
  options,
  paddingHorizontal = 28, // Overrides defaultProps
  marginHorizontal = 20, // Overrides defaultProps
  onSelect, // Use the passed onSelect function instead of setFilterType from context
  selectedTab, // New prop to indicate the currently selected tab
}) => {
  const handleSelect = option => {
    onSelect(option); // Call the passed onSelect function with the selected option
  };
  const containerStyle = [
    styles.segmentedControlContainer,
    {marginHorizontal}, // Use the passed marginHorizontal value
  ];

  const getOptionStyle = option => [
    styles.option,
    {paddingHorizontal},
    selectedTab === option && styles.selectedOption, // Use selectedTab to determine the selected option
  ];

  return (
    <View style={containerStyle}>
      {options.map(option => (
        <View key={option}>
          <TouchableOpacity
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}>
            <Text
              style={[
                styles.optionText,
                selectedTab === option && styles.selectedOptionText,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default LoadSelector;

// Styles remain unchanged

const styles = StyleSheet.create({
  segmentedControlContainer: {
    flexGrow: 1, // Take up all available space
    flexDirection: 'row',
    justifyContent: 'space-evenly', // This will distribute the options evenly
    backgroundColor: '#F3F3F3',
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
