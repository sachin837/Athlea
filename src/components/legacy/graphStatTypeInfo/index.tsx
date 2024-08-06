import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const GraphStatTypeInfo = ({
  AverageValue,
  MaxValue,
  MinValue,
  StatTypeUnit,
}) => {
  // Determine the unit based on the filter type

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Average:</Text>
          <Text
            style={styles.ValueText}>{`${AverageValue} ${StatTypeUnit}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Max:</Text>
          <Text style={styles.ValueText}>{`${MaxValue} ${StatTypeUnit}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Min:</Text>
          <Text style={styles.ValueText}>{`${MinValue} ${StatTypeUnit}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default GraphStatTypeInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20, // Add vertical padding to container
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This will distribute space evenly
    alignItems: 'center',
    width: '100%', // Ensure the row takes full width of the container
  },
  column: {
    flex: 1, // Give each column an equal flex value
    alignItems: 'center', // Center-align items horizontally in the column
    padding: 10, // Add padding to space out the text
  },
  LabelText: {
    fontSize: 16, // Adjust font size if necessary
    color: 'black',
    fontWeight: 'bold', // Make label text bold
  },
  ValueText: {
    fontSize: 16, // Adjust font size if necessary
    color: 'black',
    paddingTop: 5, // Add a little space between label and value
  },
});
