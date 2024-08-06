// Your component file
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {RootState, useAppDispatch, useAppSelector} from '../../../store';
import {
  fetchAllDistanceData,
  loadDistanceData,
  saveDistanceData,
  sendDistanceData,
} from '../../../store/healthKit/distanceWalkingRunningSlice.ts';
import {
  fetchAllHeartRateData,
  fetchHeartRate,
  fetchInitialHeartRateRecord,
  fetchTodaysData,
  loadHeartRateData,
  sendHeartRateData,
} from '../../../store/healthKit/heartRateSlice.ts';
import {
  fetchAllHeartRateVariabilityData,
  loadHeartRateVariabilityData,
  sendHeartRateVariabilityData,
} from '../../../store/healthKit/heartRateVariabilitySlice.ts';
import {
  fetchAllRestingHeartRateData,
  loadRestingHeartRateData,
  sendRestingHeartRateData,
} from '../../../store/healthKit/restingHeartRateSlice.ts';
import {
  fetchAllVo2MaxData,
  loadVo2MaxData,
  sendVo2MaxData,
} from '../../../store/healthKit/vo2MaxSlice.ts';
import FavoriteCard from './favoriteCard/favoriteCard.tsx';
import updateFavoriteDataAfterInitialFetch from '../../../utils/fetchUtil.tsx';
import {useSelector} from 'react-redux';
import {sendExerciseData} from '../../../store/healthKit/activitiesSlice.ts';
import {
  fetchAllSleepAnalysisData,
  sendSleepAnalysisData,
} from '../../../store/healthKit/sleepAnalysisSlice.ts';
import appleHealthKit, {HealthValue} from 'react-native-health';

const FavoritesList = () => {
  const dispatch = useAppDispatch();
  const [dataFetched, setDataFetched] = React.useState(false);
  // Directly select favorites and their data from the Redux store
  const {favorites, data, favoritesList} = useAppSelector(
    state => state.favorites,
  );

  // Use selectors to monitor the relevant part of the Redux state
  const loading = useAppSelector(state => state.heartRate.loading); // Example: Adjust based on your state structure
  const heartRateData = useAppSelector(state => state.heartRate); // Adjust selector as needed
  // State flag to track whether the heart rate data has been sent
  const [dataSent, setDataSent] = useState(false);
  const restingHeartRateData = useSelector(
    (state: RootState) => state.restingHeartRate,
  );

  const heartRateVariabilityData = useSelector(
    (state: RootState) => state.heartRateVariability,
  );

  const activeEnergyBurnedData = useSelector(
    (state: RootState) => state.energy,
  );

  const sleepAnalysisData = useSelector((state: RootState) => state.sleep);

  const stepCountData = useSelector((state: RootState) => state.stepCount);

  const vo2MaxData = useSelector((state: RootState) => state.vo2Max);

  const excerciseTimeData = useSelector(
    (state: RootState) => state.exerciseTime,
  );

  const distanceWalkingRunningData = useSelector(
    (state: RootState) => state.distance,
  );

  const metricsInfo = [
    {
      key: 'Heart Rate',
      action: fetchTodaysData,
    },
    {
      key: 'Distance',
      action: fetchAllDistanceData,
      // If you have an initial fetch action for Distance, add it here
    },
    {
      key: 'Heart Rate Variability',
      action: fetchAllHeartRateVariabilityData,
      // Same as above, if there's an initial action
    },
    {
      key: 'Resting Heart Rate',
      action: fetchAllRestingHeartRateData,
      // And so on for each metric
    },
    {
      key: 'VO2 Max',
      action: fetchAllVo2MaxData,
      // Add initial action if exists
    },
    {
      key: 'Sleep Analysis',
      action: fetchAllSleepAnalysisData,
    },
  ];

  useEffect(() => {
    // First, dispatch fetchHeartRate to initiate data fetching for heart rate
    dispatch(fetchHeartRate());
  }, [dispatch]);

  // Generate a sorted array of favorites based on the lastUpdated timestamp
  const sortedFavorites = useMemo(() => {
    return favorites
      .map(key => {
        const favoriteDetails = favoritesList.find(fav => fav.title === key);
        console.log(`Details for ${key}:`, favoriteDetails); // Debugging line
        const dynamicData = data[key];
        return {
          key,
          ...favoriteDetails,
          ...dynamicData,
        };
      })
      .sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
  }, [favorites, data, favoritesList]);

  return (
    // Render your UI components here using the sortedFavorites array
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      {sortedFavorites.map(item => (
        <FavoriteCard
          key={item.key}
          category={item.category}
          metricHeaderText={item.key}
          metricValue={item.data?.lastRecorded ?? 'N/A'}
          metricLabel={item.label}
          data={item.data}
          graphType={item.graphType}
          lastUpdated={item.lastUpdated}
          descriptor={item.descriptor}
        />
      ))}
    </View>
  );
};

export default FavoritesList;
