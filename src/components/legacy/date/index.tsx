import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {format, addDays, startOfWeek} from 'date-fns';

const DateNavigator = ({selectedDate, onSelect, phaseColor}) => {
  const startOfWeekDate = startOfWeek(selectedDate, {weekStartsOn: 1});
  const days = Array.from({length: 7}).map((_, i) =>
    addDays(startOfWeekDate, i),
  );

  const handleSelectDate = date => {
    onSelect(date); // Callback to the parent component to handle date change
  };

  return (
    <View style={styles.container}>
      {days.map((date, index) => {
        const isSelected =
          format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              isSelected
                ? {...styles.selectedDay, backgroundColor: phaseColor}
                : null, // Use phaseColor for the background
            ]}
            onPress={() => handleSelectDate(date)}>
            <Text
              style={[
                styles.dayOfWeek,
                isSelected ? styles.selectedText : null,
              ]}>
              {format(date, 'EEE')}
            </Text>
            <Text
              style={[styles.date, isSelected ? styles.selectedText : null]}>
              {format(date, 'dd')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayOfWeek: {
    fontSize: 16,
    color: 'black',
  },
  date: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedDay: {
    borderRadius: 14,
    padding: 10,
  },
  selectedText: {
    color: 'white', // This will change the text color to white
  },
});

export default DateNavigator;
