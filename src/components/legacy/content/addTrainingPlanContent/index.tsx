import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Container} from './addPlanContent.style.tsx';
import AddPlanField from './components/AddPlanField.tsx';
import FilterComponent from '../../filters';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import TrainingPlanContent from '../trainingPlanContent';
import AddTrainingPlanContent from './components/AddTrainingPlanContent.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native-gesture-handler';

export const TrainingPlans = [
  {
    id: 1,
    title: 'Comprehensive Athletic Development',
    description:
      'The plan is a targeted 12-week regimen designed to optimize cardiovascular health and enhance performance in endurance sports for 27-year-old athletes. The plan is designed to be used with a heart rate monitor and smart watch.',
    data: [
      {date: '2024-01-05', load: 1, phase: 'Transition'},
      {date: '2024-01-06', load: 1, phase: 'Transition'},
      {date: '2024-01-07', load: 1, phase: 'Transition'},
      {date: '2024-01-08', load: 1, phase: 'Transition'},
      {date: '2024-01-09', load: 1, phase: 'Transition'},
      {date: '2024-01-10', load: 1, phase: 'Prep'},
      {date: '2024-01-11', load: 2, phase: 'Prep'},
      {date: '2024-01-12', load: 2, phase: 'Prep'},
      {date: '2024-01-13', load: 2, phase: 'Prep'},
      {date: '2024-01-14', load: 2, phase: 'Prep'},
      {date: '2024-01-15', load: 2, phase: 'Prep'},
      {date: '2024-01-16', load: 3, phase: 'Prep'},
      {date: '2024-01-17', load: 3, phase: 'General'},
      {date: '2024-01-18', load: 3, phase: 'General'},
      {date: '2024-01-19', load: 3, phase: 'General'},
      {date: '2024-01-20', load: 3, phase: 'General'},
      {date: '2024-01-21', load: 3, phase: 'General'},
      {date: '2024-01-22', load: 3, phase: 'General'},
      {date: '2024-01-23', load: 3, phase: 'General'},
      {date: '2024-01-24', load: 3, phase: 'General'},
      {date: '2024-01-25', load: 4, phase: 'General'},
      {date: '2024-01-26', load: 4, phase: 'General'},
      {date: '2024-01-27', load: 4, phase: 'Specific 1'},
      {date: '2024-01-28', load: 4, phase: 'Specific 1'},
      {date: '2024-01-29', load: 4, phase: 'Specific 1'},
      {date: '2024-01-30', load: 2, phase: 'Specific 1'},
      {date: '2024-01-31', load: 2, phase: 'Specific 1'},
      {date: '2024-02-01', load: 2, phase: 'Specific 1'},
      {date: '2024-02-02', load: 2, phase: 'Specific 1'},
      {date: '2024-02-03', load: 2, phase: 'Specific 1'},
      {date: '2024-02-04', load: 3, phase: 'Specific 2'},
      {date: '2024-02-05', load: 3, phase: 'Specific 2'},
      {date: '2024-02-06', load: 3, phase: 'Specific 2'},
      {date: '2024-02-07', load: 3, phase: 'Specific 2'},
      {date: '2024-02-08', load: 3, phase: 'Specific 2'},
      {date: '2024-02-09', load: 3, phase: 'Specific 2'},
      {date: '2024-02-10', load: 1, phase: 'Specific 3'},
      {date: '2024-02-11', load: 1, phase: 'Specific 3'},
      {date: '2024-02-12', load: 1, phase: 'Specific 3'},
    ],
  },
  {
    id: 2,
    title: 'Power Flow Fusion',
    description:
      'Combines the muscle-building power of strength training with the fluidity and core strengthening of pilates, topped off with yoga to enhance flexibility and recovery.',
    data: [
      {date: '2024-01-05', load: 1, phase: 'Transition'},
      {date: '2024-01-06', load: 1, phase: 'Transition'},
      {date: '2024-01-07', load: 1.5, phase: 'Transition'},
      {date: '2024-01-08', load: 1.5, phase: 'Transition'},
      {date: '2024-01-09', load: 1.5, phase: 'Transition'},
      {date: '2024-01-10', load: 2, phase: 'Prep'},
      {date: '2024-01-11', load: 2, phase: 'Prep'},
      {date: '2024-01-12', load: 2, phase: 'Prep'},
      {date: '2024-01-13', load: 2, phase: 'Prep'},
      {date: '2024-01-14', load: 2, phase: 'Prep'},
      {date: '2024-01-15', load: 1.5, phase: 'Prep'},
      {date: '2024-01-16', load: 1.5, phase: 'Prep'},
      {date: '2024-01-17', load: 1.5, phase: 'General'},
      {date: '2024-01-18', load: 1.5, phase: 'General'},
      {date: '2024-01-19', load: 3, phase: 'General'},
      {date: '2024-01-20', load: 3, phase: 'General'},
      {date: '2024-01-21', load: 3, phase: 'General'},
      {date: '2024-01-22', load: 3, phase: 'General'},
      {date: '2024-01-23', load: 3, phase: 'General'},
      {date: '2024-01-24', load: 3, phase: 'General'},
      {date: '2024-01-25', load: 2, phase: 'General'},
      {date: '2024-01-26', load: 2, phase: 'General'},
      {date: '2024-01-27', load: 2, phase: 'Specific 1'},
      {date: '2024-01-28', load: 2, phase: 'Specific 1'},
      {date: '2024-01-29', load: 2, phase: 'Specific 1'},
      {date: '2024-01-30', load: 5, phase: 'Specific 1'},
      {date: '2024-01-31', load: 5, phase: 'Specific 1'},
      {date: '2024-02-01', load: 5, phase: 'Specific 1'},
      {date: '2024-02-02', load: 5, phase: 'Specific 1'},
      {date: '2024-02-03', load: 5, phase: 'Specific 1'},
      {date: '2024-02-04', load: 2, phase: 'Specific 2'},
      {date: '2024-02-05', load: 2, phase: 'Specific 2'},
      {date: '2024-02-06', load: 2, phase: 'Specific 2'},
      {date: '2024-02-07', load: 2, phase: 'Specific 2'},
      {date: '2024-02-08', load: 6, phase: 'Specific 2'},
      {date: '2024-02-09', load: 6, phase: 'Specific 2'},
      {date: '2024-02-10', load: 6, phase: 'Specific 3'},
      {date: '2024-02-11', load: 6, phase: 'Specific 3'},
      {date: '2024-02-12', load: 3, phase: 'Specific 3'},
    ],
  },
  {
    id: 3,
    title: 'Cardio Strength Yoga (CSY) Series',
    description:
      'A balanced triad program that integrates heart-pumping cardio, muscle-sculpting strength workouts, and yoga poses for flexibility and mindfulness.',
    data: [
      {date: '2024-01-05', load: 4, phase: 'Transition'},
      {date: '2024-01-06', load: 3, phase: 'Transition'},
      {date: '2024-01-07', load: 2, phase: 'Transition'},
      {date: '2024-01-08', load: 3, phase: 'Transition'},
      {date: '2024-01-09', load: 1, phase: 'Transition'},
      {date: '2024-01-10', load: 4, phase: 'Prep'},
      {date: '2024-01-11', load: 4, phase: 'Prep'},
      {date: '2024-01-12', load: 5, phase: 'Prep'},
      {date: '2024-01-13', load: 2, phase: 'Prep'},
      {date: '2024-01-14', load: 3, phase: 'Prep'},
      {date: '2024-01-15', load: 1, phase: 'Prep'},
      {date: '2024-01-16', load: 5, phase: 'Prep'},
      {date: '2024-01-17', load: 4, phase: 'General'},
      {date: '2024-01-18', load: 5, phase: 'General'},
      {date: '2024-01-19', load: 3, phase: 'General'},
      {date: '2024-01-20', load: 1, phase: 'General'},
      {date: '2024-01-21', load: 2, phase: 'General'},
      {date: '2024-01-22', load: 4, phase: 'General'},
      {date: '2024-01-23', load: 1, phase: 'General'},
      {date: '2024-01-24', load: 3, phase: 'General'},
      {date: '2024-01-25', load: 5, phase: 'General'},
      {date: '2024-01-26', load: 2, phase: 'General'},
      {date: '2024-01-27', load: 3, phase: 'Specific 1'},
      {date: '2024-01-28', load: 5, phase: 'Specific 1'},
      {date: '2024-01-29', load: 2, phase: 'Specific 1'},
      {date: '2024-01-30', load: 3, phase: 'Specific 1'},
      {date: '2024-01-31', load: 1, phase: 'Specific 1'},
      {date: '2024-02-01', load: 5, phase: 'Specific 1'},
      {date: '2024-02-02', load: 4, phase: 'Specific 1'},
      {date: '2024-02-03', load: 5, phase: 'Specific 1'},
      {date: '2024-02-04', load: 3, phase: 'Specific 2'},
      {date: '2024-02-05', load: 1, phase: 'Specific 2'},
      {date: '2024-02-06', load: 2, phase: 'Specific 2'},
      {date: '2024-02-07', load: 4, phase: 'Specific 2'},
      {date: '2024-02-08', load: 1, phase: 'Specific 2'},
      {date: '2024-02-09', load: 3, phase: 'Specific 2'},
      {date: '2024-02-10', load: 5, phase: 'Specific 3'},
      {date: '2024-02-11', load: 2, phase: 'Specific 3'},
      {date: '2024-02-12', load: 1, phase: 'Specific 3'},
    ],
  },
  {
    id: 4,
    title: 'Ultimate Warrior Workout',
    description:
      'An intense regimen that merges the discipline of yoga with the toughness of crossfit and the precision of pilates for those looking to challenge their limits.',
    data: [
      {date: '2024-01-05', load: 3, phase: 'Transition'},
      {date: '2024-01-06', load: 3, phase: 'Transition'},
      {date: '2024-01-07', load: 3, phase: 'Transition'},
      {date: '2024-01-08', load: 3, phase: 'Transition'},
      {date: '2024-01-09', load: 3, phase: 'Transition'},
      {date: '2024-01-10', load: 3, phase: 'Prep'},
      {date: '2024-01-11', load: 3, phase: 'Prep'},
      {date: '2024-01-12', load: 3, phase: 'Prep'},
      {date: '2024-01-13', load: 3, phase: 'Prep'},
      {date: '2024-01-14', load: 3, phase: 'Prep'},
      {date: '2024-01-15', load: 4, phase: 'Prep'},
      {date: '2024-01-16', load: 4, phase: 'Prep'},
      {date: '2024-01-17', load: 4, phase: 'General'},
      {date: '2024-01-18', load: 4, phase: 'General'},
      {date: '2024-01-19', load: 4, phase: 'General'},
      {date: '2024-01-20', load: 4, phase: 'General'},
      {date: '2024-01-21', load: 4, phase: 'General'},
      {date: '2024-01-22', load: 4, phase: 'General'},
      {date: '2024-01-23', load: 4, phase: 'General'},
      {date: '2024-01-24', load: 5, phase: 'General'},
      {date: '2024-01-25', load: 5, phase: 'General'},
      {date: '2024-01-26', load: 5, phase: 'General'},
      {date: '2024-01-27', load: 5, phase: 'Specific 1'},
      {date: '2024-01-28', load: 5, phase: 'Specific 1'},
      {date: '2024-01-29', load: 5, phase: 'Specific 1'},
      {date: '2024-01-30', load: 5, phase: 'Specific 1'},
      {date: '2024-01-31', load: 3, phase: 'Specific 1'},
      {date: '2024-02-01', load: 3, phase: 'Specific 1'},
      {date: '2024-02-02', load: 3, phase: 'Specific 1'},
      {date: '2024-02-03', load: 3, phase: 'Specific 1'},
      {date: '2024-02-04', load: 3, phase: 'Specific 2'},
      {date: '2024-02-05', load: 3, phase: 'Specific 2'},
      {date: '2024-02-06', load: 7, phase: 'Specific 2'},
      {date: '2024-02-07', load: 7, phase: 'Specific 2'},
      {date: '2024-02-08', load: 7, phase: 'Specific 2'},
      {date: '2024-02-09', load: 7, phase: 'Specific 2'},
      {date: '2024-02-10', load: 7, phase: 'Specific 3'},
      {date: '2024-02-11', load: 7, phase: 'Specific 3'},
      {date: '2024-02-12', load: 3, phase: 'Specific 3'},
    ],
  },
  {
    id: 5,
    title: 'Zenith Cross Training',
    description:
      'A peak performance program blending crossfits intensity, yogas balance, and cardios endurance training for achieving top physical and mental form.',
    data: [
      {date: '2024-01-05', load: 4, phase: 'Transition'},
      {date: '2024-01-06', load: 3, phase: 'Transition'},
      {date: '2024-01-07', load: 2, phase: 'Transition'},
      {date: '2024-01-08', load: 1, phase: 'Transition'},
      {date: '2024-01-09', load: 6, phase: 'Transition'},
      {date: '2024-01-10', load: 5, phase: 'Prep'},
      {date: '2024-01-11', load: 4, phase: 'Prep'},
      {date: '2024-01-12', load: 3, phase: 'Prep'},
      {date: '2024-01-13', load: 2, phase: 'Prep'},
      {date: '2024-01-14', load: 1, phase: 'Prep'},
      {date: '2024-01-15', load: 7, phase: 'Prep'},
      {date: '2024-01-16', load: 6, phase: 'Prep'},
      {date: '2024-01-17', load: 5, phase: 'General'},
      {date: '2024-01-18', load: 4, phase: 'General'},
      {date: '2024-01-19', load: 3, phase: 'General'},
      {date: '2024-01-20', load: 2, phase: 'General'},
      {date: '2024-01-21', load: 1, phase: 'General'},
      {date: '2024-01-22', load: 6, phase: 'General'},
      {date: '2024-01-23', load: 5, phase: 'General'},
      {date: '2024-01-24', load: 4, phase: 'General'},
      {date: '2024-01-25', load: 3, phase: 'General'},
      {date: '2024-01-26', load: 2, phase: 'General'},
      {date: '2024-01-27', load: 1, phase: 'Specific 1'},
      {date: '2024-01-28', load: 5, phase: 'Specific 1'},
      {date: '2024-01-29', load: 4, phase: 'Specific 1'},
      {date: '2024-01-30', load: 3, phase: 'Specific 1'},
      {date: '2024-01-31', load: 2, phase: 'Specific 1'},
      {date: '2024-02-01', load: 1, phase: 'Specific 1'},
      {date: '2024-02-02', load: 8, phase: 'Specific 1'},
      {date: '2024-02-03', load: 7, phase: 'Specific 1'},
      {date: '2024-02-04', load: 6, phase: 'Specific 2'},
      {date: '2024-02-05', load: 5, phase: 'Specific 2'},
      {date: '2024-02-06', load: 4, phase: 'Specific 2'},
      {date: '2024-02-07', load: 3, phase: 'Specific 2'},
      {date: '2024-02-08', load: 2, phase: 'Specific 2'},
      {date: '2024-02-09', load: 1, phase: 'Specific 2'},
      {date: '2024-02-10', load: 2, phase: 'Specific 3'},
      {date: '2024-02-11', load: 3, phase: 'Specific 3'},
      {date: '2024-02-12', load: 2, phase: 'Specific 3'},
    ],
  },
];

const AddPlanContent = () => {
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState({
    title: '',
    description: '',
  });

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsBottomSheetVisible(false);
    }
  }, []);

  const openBottomSheet = (title: string, description: string) => {
    setSelectedPlanTitle({title, description});
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  const [addedPlans, setAddedPlans] = React.useState({1: true}); // Assuming ID 1 is added by default

  const togglePlanAdded = id => {
    setAddedPlans(prev => ({...prev, [id]: !prev[id]}));
  };

  const gradientColors = ['#6a11cb', '#2575fc']; // Choose your specific colors
  const CustomHandle = ({color}) => {
    return <View style={[styles.handle, {backgroundColor: color}]} />;
  };

  const styles = StyleSheet.create({
    handle: {
      width: '100%',
      height: 20, // Adjust the height as needed
      // Additional styling for the handle
    },
  });

  return (
    <Container>
      <FilterComponent
        filters={['Intensity', 'Hardcore', 'Flexibility', 'CrossFit']}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />
      {TrainingPlans.map(plan => (
        <AddPlanField
          key={plan.id}
          data={plan.data}
          PlanHeader={plan.title}
          PlanDescription={plan.description}
          isAdded={!!addedPlans[plan.id]} // Convert to boolean for safety
          openBottomSheet={() => openBottomSheet(plan.title, plan.description)}
          toggleAdded={() => togglePlanAdded(plan.id)} // Pass toggle function
        />
      ))}
      {isBottomSheetVisible && (
        <AddTrainingPlanContent
          TrainingPlanHeader={selectedPlanTitle.title}
          TrainingPlanDescription={selectedPlanTitle.description}
          gradientColors={gradientColors}
          data={TrainingPlans[0].data}
          snapPoints={snapPoints}
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
        />
      )}
    </Container>
  );
};

export default AddPlanContent;
