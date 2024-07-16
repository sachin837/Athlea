import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PlanPanelField from './components/PlanPanelField.tsx';

const PlanPanel = () => {
  return (
    <View style={styles.container}>
      <PlanPanelField
        PlanIcon="ai"
        PlanScore="195.4 km"
        PlanMetric="Distance"
      />
      <PlanPanelField
        PlanIcon="ai"
        PlanScore="23:57:33"
        PlanMetric="Duration"
      />
      <PlanPanelField
        PlanIcon="ai"
        PlanScore="16482 kcals"
        PlanMetric="Energy"
      />
    </View>
  );
};

export default PlanPanel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
});
