import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import AddReportField from './components/AddReportField.tsx';

const initialReportPanels = [
  {
    PanelHeader: 'Overview',
    PanelDescription: 'Overview of the report',
    type: 'text',
    isAdded: true,
  },
  {
    PanelHeader: 'Strength Insights',
    PanelDescription: 'Strength insights on your strength exercises',
    type: 'bar',
    isAdded: true,
  },
  {
    PanelHeader: 'Endurance Insights',
    PanelDescription: 'Endurance insights on your endurance exercises',
    type: 'bar',
    isAdded: true,
  },
  {
    PanelHeader: 'Wellbeing Insights',
    PanelDescription: 'Wellbeing insights on your wellbeing activities',
    type: 'bar',
    isAdded: true,
  },
  {
    PanelHeader: 'Recovery Insights',
    PanelDescription: 'Recovery insights on your Recovery activities',
    type: 'line',
    isAdded: true,
  },
  {
    PanelHeader: 'Nutrition Insights',
    PanelDescription: 'Nutrition insights on your nutrition activities',
    type: 'rectangle',
    isAdded: true,
  },
  {
    PanelHeader: 'Calories by Time Period',
    PanelDescription: 'Analysis of calories burned over different time periods',
    type: 'line',
  },
  {
    PanelHeader: 'Distance by Week/Day',
    PanelDescription: 'Distance covered per week or day',
    type: 'bar',
  },
  {
    PanelHeader: 'Duration by Week/Day',
    PanelDescription: 'Total duration of activities per week or day',
    type: 'line',
  },
  {
    PanelHeader: 'Elevation Gain by Day/Week',
    PanelDescription: 'Total elevation gain over days or weeks',
    type: 'area',
  },
  {
    PanelHeader: 'Fitness History',
    PanelDescription: 'Historical fitness activity records',
    type: 'timeline',
  },
  {
    PanelHeader: 'Fitness Summary',
    PanelDescription: 'Summary of recent fitness achievements and patterns',
    type: 'summary',
  },
  {
    PanelHeader: 'Kilojoules by Week/Day',
    PanelDescription:
      'Energy expenditure measured in kilojoules per day or week',
    type: 'line',
  },
  {
    PanelHeader: 'Longest Workout (Distance)',
    PanelDescription: 'Record of the longest workout by distance',
    type: 'record',
  },
  {
    PanelHeader: 'Longest Workout (Duration)',
    PanelDescription: 'Record of the longest workout by duration',
    type: 'record',
  },
];

const AddReportPage = () => {
  const [reportPanels, setReportPanels] = useState(initialReportPanels);

  const removeReportPanel = panelHeader => {
    const updatedReportPanels = reportPanels.map(item => {
      if (item.PanelHeader === panelHeader) {
        return {...item, isAdded: false};
      }
      return item;
    });
    setReportPanels(updatedReportPanels); // Update state
  };

  const addReportPanel = panelHeader => {
    const updatedReportPanels = reportPanels.map(item => {
      if (item.PanelHeader === panelHeader) {
        return {...item, isAdded: true};
      }
      return item;
    });
    setReportPanels(updatedReportPanels); // Update state
  };

  const onAddRemovePanel = (panelHeader, isAdded) => {
    if (isAdded) {
      removeReportPanel(panelHeader);
    } else {
      addReportPanel(panelHeader);
    }
  };

  return (
    <View style={styles.container}>
      {reportPanels.map((item, index) => {
        return (
          <AddReportField
            key={index}
            PanelHeader={item.PanelHeader}
            PanelDescription={item.PanelDescription}
            type={item.type}
            onAddRemovePanel={() =>
              onAddRemovePanel(item.PanelHeader, item.isAdded)
            }
            isAdded={item.isAdded}
          />
        );
      })}
    </View>
  );
};

export default AddReportPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
