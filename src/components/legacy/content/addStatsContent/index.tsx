import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AddStatsField from './components/AddStatsField.tsx';

const StatsPanels = [
  {
    StatsHeader: 'Activities',
    StatsDescription:
      'Activities measures the number of physical activities completed, important for tracking progress.',
    statType: 'activities', // This should match a key in your statConfigs object
  },
  {
    StatsHeader: 'VO2 Max',
    StatsDescription:
      'VO2 Max measures maximum oxygen utilization during intense exercise, indicating cardiovascular fitness.',
    statType: 'vo2', // This should match a key in your statConfigs object
  },
  {
    StatsHeader: 'Resting Heart Rate',
    StatsDescription:
      'Resting Heart Rate is heart beats per minute at rest, reflecting heart efficiency.',
    statType: 'heartRate', // Ensuring this matches a key in your statConfigs object
    iconName: 'heartRateIcon', // Assuming icons are mapped by name
    metricText: 'Heart Rate',
    metricLabel1: 'BPM',
    metricLabel2: 'BPM',
  },

  {
    StatsHeader: 'Distance',
    StatsDescription:
      'Distance measures the length of physical activity, important for endurance and tracking progress.',
    statType: 'distance', // Ensuring this matches a key in your statConfigs object
    iconName: 'distanceIcon', // Assuming icons are mapped by name
    metricText: 'Distance',
    metricLabel1: 'KM',
    metricLabel2: 'KM',
  },

  {
    StatsHeader: 'Resting Heart Rate',
    StatsDescription:
      'Resting Heart Rate is heart beats per minute at rest, reflecting heart efficiency.',
  },
  {
    StatsHeader: 'Lactate Threshold',
    StatsDescription:
      'Lactate Threshold indicates intensity at which lactate accumulates, critical for endurance.',
    statType: 'lactate', // This should match a key in your statConfigs object
    iconName: 'lactateIcon', // Assuming you have icons mapped by name
    metricText: 'Lactate',
    metricLabel1: 'ML/KG/MIN',
    metricLabel2: 'ML/KG/MIN',
  },
  {
    StatsHeader: 'Functional Threshold Power',
    StatsDescription:
      'Highest power sustain for an hour, essential for measuring cycling performance.',
  },
  {
    StatsHeader: 'Maximal Strength',
    StatsDescription:
      'Maximum force exerted in a single effort, fundamental for strength training.',
  },
  {
    StatsHeader: 'Sprint Speed',
    StatsDescription:
      'Measures how fast you can run over a short distance, evaluating acceleration.',
  },
  {
    StatsHeader: 'Agility',
    StatsDescription:
      'Reflects ability to change direction quickly, vital for performance in sports.',
  },
  {
    StatsHeader: 'Flexibility',
    StatsDescription:
      'Range of motion at a joint, important for injury prevention and performance.',
  },
  {
    StatsHeader: 'Body Composition',
    StatsDescription:
      'Assesses fat to lean mass ratio, providing insights into fitness level.',
  },
  {
    StatsHeader: 'Recovery Rate',
    StatsDescription:
      'Tracks heart rate return to normal after exercise, indicating cardiovascular recovery.',
  },
];

const AddStatsContent = ({addStatPanel, removeStatPanel, activeStatTypes}) => {
  // Sort the panels so active ones are first
  // Forcefully include 'activities' in the active panels list
  const updatedActiveStatTypes = [...activeStatTypes, 'activities'];

  // Ensure 'activities' is unique in case it's already there
  const uniqueActiveStatTypes = Array.from(new Set(updatedActiveStatTypes));

  // Sort the panels so active ones are first
  const sortedStatsPanels = StatsPanels.sort((a, b) => {
    const aIsActive = uniqueActiveStatTypes.includes(a.statType);
    const bIsActive = uniqueActiveStatTypes.includes(b.statType);
    return bIsActive - aIsActive; // True values (active) will be converted to 1, moving them to the beginning
  });

  return (
    <View style={styles.container}>
      {sortedStatsPanels.map((item, index) => {
        const isActive = uniqueActiveStatTypes.includes(item.statType);

        return (
          <AddStatsField
            key={index}
            StatsHeader={item.StatsHeader}
            StatsDescription={item.StatsDescription}
            onAddRemoveStat={() => {
              if (isActive) {
                removeStatPanel(item.statType);
              } else {
                addStatPanel({
                  statType: item.statType,
                  iconName: item.iconName,
                  metricText: item.metricText,
                  metricLabel1: item.metricLabel1,
                  metricLabel2: item.metricLabel2,
                  StatsDescription: item.StatsDescription,
                });
              }
            }}
            isRemove={isActive} // This indicates if the button should show "Remove" instead of "Add"
          />
        );
      })}
    </View>
  );
};

export default AddStatsContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
