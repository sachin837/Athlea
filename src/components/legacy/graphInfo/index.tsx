import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const GraphInfo = ({
  AverageValue,
  MaxValue,
  MinValue,
  TotalDuration,
  ActivityCount,
  MostFrequentActivity,
  filterType,
}) => {
  // Determine the unit based on the filter type
  const unit = filterType === 'Day' ? 'min' : 'hrs';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Average:</Text>
          <Text style={styles.ValueText}>{`${AverageValue} ${unit}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Max:</Text>
          <Text style={styles.ValueText}>{`${MaxValue} ${unit}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Min:</Text>
          <Text style={styles.ValueText}>{`${MinValue} ${unit}`}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.LabelText}>Total:</Text>
          <Text style={styles.ValueText}>{`${TotalDuration} ${unit}`}</Text>
        </View>
        {/* New row for Activity Count */}
        <View style={styles.column}>
          <Text style={styles.LabelText}>Count:</Text>
          <Text style={styles.ValueText}>{ActivityCount}</Text>
        </View>

        {/* New row for Most Frequent Activity */}
        <View style={styles.column}>
          <Text style={styles.LabelText}>Most Freq:</Text>
          <Text style={styles.ValueText}>{MostFrequentActivity}</Text>
        </View>
      </View>
    </View>
  );
};

export default GraphInfo;

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
