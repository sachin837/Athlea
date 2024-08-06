import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PhaseSelector = ({
  options,
  onSelect,
  scrollViewRef,
  selectedCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = option => {
    setSelectedOption(option); // Update local state
    onSelect(option); // Pass the selected option to the parent component
  };

  useEffect(() => {
    if (scrollViewRef.current && selectedCategory) {
      let position = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === selectedCategory) {
          position = i * 120; // Adjust width as necessary
          break;
        }
      }
      scrollViewRef.current.scrollTo({x: position, animated: true});
    }
  }, [selectedCategory, options]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}>
      <View style={styles.segmentedControlContainer}>
        {options.map((option, index) => (
          <View style={styles.optionContainer} key={option}>
            <TouchableOpacity
              style={[
                styles.option,
                selectedCategory === option && styles.selectedOption, // Use selectedCategory prop directly
              ]}
              onPress={() => onSelect(option)}>
              <Text
                style={[
                  styles.optionText,
                  selectedCategory === option && styles.selectedOptionText, // Use selectedCategory prop directly
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PhaseSelector;

const styles = StyleSheet.create({
  segmentedControlContainer: {
    flexGrow: 1, // Encourage the container to grow to accommodate its children
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align to the start, not center
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  optionContainer: {
    // Make sure these are wide enough to require scrolling
    minWidth: 100, // Set a minimum width or use actual widths if known
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  selectedOption: {},
  optionText: {
    color: '#000000',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  separator: {
    height: '60%', // Full height of the option
    width: 1,
    backgroundColor: '#000000', // Color of the separator line
  },
});
