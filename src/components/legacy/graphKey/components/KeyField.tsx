import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const KeyField = ({KeyText, KeyColor}) => {
  // Inline style for the circle to dynamically set the background color
  const circleStyle = {
    ...styles.circle,
    backgroundColor: KeyColor, // Use the KeyColor prop for background color
  };

  return (
    <View style={styles.container}>
      <View style={circleStyle}>
        {/* You can add a smaller View inside for the dot if needed */}
      </View>
      <Text style={styles.text}>{KeyText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align circle and text horizontally
    alignItems: 'center', // Center items vertically
    padding: 10, // Add some padding around the container
  },
  circle: {
    height: 10, // Height of the circle
    width: 10, // Width of the circle
    borderRadius: 10, // Half of the height/width to make it a perfect circle
    marginRight: 10, // Margin between circle and text
    justifyContent: 'center', // Center the dot vertically inside the circle
    alignItems: 'center', // Center the dot horizontally inside the circle
  },
  text: {
    // Style for the text
  },
  // Add styles for the dot if needed
});

export default KeyField;
