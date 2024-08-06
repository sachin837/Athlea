import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Container, HeaderContainer, SubTitle, Title} from './dailyPlan.style.tsx';
import useDate from '../../../../hooks/useDate.tsx';
import {useTheme} from 'styled-components/native';
import ActivityComponent from './components/ActivityComponent.tsx';
import {useSelector} from 'react-redux';
import ActivityPanelComponent from './components/ActivityPanelComponent.tsx';
import {MD5} from 'crypto-js';
import LoadingIndicator from '../../loading';

const DailyPlanContent = ({
  selectedCategory,
  DailyPlan,
  selectedDate,
  setActivities,
  openBottomSheet,
  foundPanelCategory,
  isCategoryLoaded,
  showMessageModal,
}) => {
  const theme = useTheme();
  const [isFilteredPlanReady, setIsFilteredPlanReady] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState([]);

  // Removed unused aggregatedActivities useMemo for brevity

  useEffect(() => {
    // Start by assuming we're not ready to display the filtered plan
    setIsFilteredPlanReady(false);

    // Define a function to filter activities based on the selected category
    const filterActivities = () => {
      const filteredActivities =
        selectedCategory === 'All Categories'
          ? DailyPlan.reduce((acc, plan) => [...acc, ...plan.Activities], [])
          : DailyPlan.filter(
              plan => plan.ActivityCategory === selectedCategory,
            ).reduce((acc, plan) => [...acc, ...plan.Activities], []);

      // Update activities and indicate we're ready to display them
      setActivities(filteredActivities);
      setFilteredActivities(filteredActivities);
      setIsFilteredPlanReady(true);
    };

    // Call the filter function
    filterActivities();
  }, [selectedCategory, DailyPlan]);

  if (!isFilteredPlanReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 140,
        }}>
        <LoadingIndicator />
      </View>
    ); // Show loading text or a spinner
  }

  console.log('Filtered activities array', filteredActivities);
  // const actions = useSelector(state => state.actions.actions);

  // // Filter actions that have an 'area'
  // const actionsWithArea = actions.filter(action => action.area);

  // actionsWithArea.forEach((action, index) => {
  //   setTimeout(() => {
  //     // Wrap the activity addition logic with setTimeout
  //     // Remove bullet point from the beginning of the description (if present)
  //     const cleanedDescription = (action.description || action.text).replace(
  //       /^\s*•\s*/,
  //       '',
  //     );

  //     // Find the index of the DailyPlan that matches the action's category
  //     const planIndex = DailyPlan.findIndex(
  //       plan => plan.ActivityCategory === action.category,
  //     );

  //     if (
  //       planIndex !== -1 &&
  //       !DailyPlan[planIndex].Activities.some(
  //         activity => activity.id === action.id,
  //       )
  //     ) {
  //       const matchingCategoryPlan = DailyPlan[planIndex];

  //       // Construct a new activity object for the action
  //       const newActivity = {
  //         id: action.id,
  //         Header: action.area,
  //         ActivityText: cleanedDescription,
  //         AiIcon: true,
  //         shouldAnimate: true,
  //       };

  //       // Logic to find the insertIndex remains the same
  //       let insertIndex = -1;
  //       for (let i = matchingCategoryPlan.Activities.length - 1; i >= 0; i--) {
  //         if (matchingCategoryPlan.Activities[i].Header === action.area) {
  //           insertIndex = i;
  //           break;
  //         }
  //       }

  //       // Insert the new activity accordingly
  //       if (insertIndex !== -1) {
  //         matchingCategoryPlan.Activities.splice(
  //           insertIndex + 1,
  //           0,
  //           newActivity,
  //         );
  //       } else {
  //         matchingCategoryPlan.Activities.push(newActivity);
  //       }
  //     }
  //   }, 300); // Delay each action addition by 100ms * index to stagger them if multiple actions
  // });

  return (
    <Container>
      <ActivityPanelComponent
        name={filteredActivities.name}
        iconSize={filteredActivities.iconSize}
        ActivityName={filteredActivities.ActivityName}
        ActivityCategory={filteredActivities.ActivityCategory}
        Duration={filteredActivities.Duration}
        activities={filteredActivities} // Passing the entire activities array
        selectedDate={selectedDate}
        setActivities={setActivities}
        openBottomSheet={openBottomSheet}
        foundPanelCategory={foundPanelCategory}
        isCategoryLoaded={isCategoryLoaded}
        selectedCategory={selectedCategory}
      />
    </Container>
  );
};

export default DailyPlanContent;
