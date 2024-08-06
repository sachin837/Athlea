import appleHealthKit, {HealthValue} from 'react-native-health';
import {Dispatch} from 'react';

interface WalkingHeartRateTrendData {
  average: number;
  min: number;
  max: number;
}

export type WalkingHeartRateActionTypes =
  | {type: 'SET_WALKING_HEART_RATE'; payload: number | null}
  | {
      type: 'UPDATE_WEEKLY_WALKING_HEART_RATE';
      payload: WalkingHeartRateTrendData;
    }
  | {
      type: 'UPDATE_MONTHLY_TREND_WALKING_HEART_RATE';
      payload: WalkingHeartRateTrendData;
    }
  | {
      type: 'UPDATE_MONTHLY_WALKING_HEART_RATE';
      payload: WalkingHeartRateTrendData;
    }
  | {
      type: 'UPDATE_TODAY_WALKING_HEART_RATE';
      payload: WalkingHeartRateTrendData;
    }
  | {
      type: 'UPDATE_YESTERDAY_WALKING_HEART_RATE';
      payload: WalkingHeartRateTrendData;
    };
// ... [other action types]

// Utility functions (setupOptionsForFetch, calculateAverage, etc.) here
const setupOptionsForFetch = (
  startDate: Date,
  endDate: Date,
  limit: number,
  ascending: boolean,
) => ({
  startDate: startDate.toISOString(),
  endDate: endDate.toISOString(),
  limit,
  ascending,
});

const calculateAverage = (data: HealthValue[]) => {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  return data.length > 0 ? sum / data.length : 0;
};

const calculateMin = (data: HealthValue[]) => {
  return Math.min(...data.map(item => item.value));
};

const calculateMax = (data: HealthValue[]) => {
  return Math.max(...data.map(item => item.value));
};

const processWalkingHeartRateData = (data: HealthValue[]) => {
  // Similar to processRestingHeartRateData, but tailored for walking heart rate
  if (!data || data.length === 0) {
    return {average: 0, min: 0, max: 0};
  }

  return {
    average: calculateAverage(data),
    min: calculateMin(data),
    max: calculateMax(data),
  };
};

const fetchWalkingHeartRate = async (
  type: string,
  timeframe: string,
  dispatch: Dispatch<WalkingHeartRateActionTypes>,
) => {
  // Similar to fetchRestingHeartRate, but with adjustments for walking heart rate
  let options; // Adjust parameters accordingly

  switch (type) {
    case 'last-recorded':
      options = setupOptionsForFetch(new Date(), new Date(), 1, false);
      break;
    case 'weekly-trend':
      options = setupOptionsForFetch(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
        0,
        true,
      );
      break;
    case 'monthly':
      options = setupOptionsForFetch(
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date(),
        0,
        true,
      );
      break;
    case 'today':
      options = setupOptionsForFetch(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(),
        0,
        true,
      );
      break;
    case 'yesterday':
      options = setupOptionsForFetch(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
        0,
        true,
      );
      break;
    // ... [other cases if needed]
  }

  if (!options) {
    // console.error("Options are not defined");
    return; // Exit the function if options are not set
  }

  // Replace getRestingHeartRateSamples with the appropriate method for walking heart rate
  appleHealthKit.getWalkingHeartRateAverage(options, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    let processedData = processWalkingHeartRateData(results);

    switch (type) {
      case 'last-recorded':
        dispatch({
          type: 'SET_WALKING_HEART_RATE',
          payload: processedData.average,
        });
        break;
      case 'weekly-trend':
        dispatch({
          type: 'UPDATE_WEEKLY_WALKING_HEART_RATE',
          payload: processedData,
        });
        break;

      case 'monthly-trend':
        const lastMonthStart = new Date();
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        lastMonthStart.setDate(1);
        lastMonthStart.setHours(0, 0, 0, 0);

        const lastMonthEnd = new Date();
        lastMonthEnd.setDate(0);
        lastMonthEnd.setHours(23, 59, 59, 999);

        options = setupOptionsForFetch(lastMonthStart, lastMonthEnd, 0, true);

        appleHealthKit.getRestingHeartRateSamples(options, (err, results) => {
          if (err) {
            console.error(err);
            return;
          }

          const monthlyTrendData = processWalkingHeartRateData(results);
          dispatch({
            type: 'UPDATE_MONTHLY_TREND_WALKING_HEART_RATE',
            payload: monthlyTrendData,
          });
        });
        break;
      case 'monthly':
        dispatch({
          type: 'UPDATE_MONTHLY_WALKING_HEART_RATE',
          payload: processedData,
        });
        break;
      case 'today':
        dispatch({
          type: 'UPDATE_TODAY_WALKING_HEART_RATE',
          payload: processedData,
        });
        break;
      case 'yesterday':
        dispatch({
          type: 'UPDATE_YESTERDAY_WALKING_HEART_RATE',
          payload: processedData,
        });
        break;
      // ... [other cases if needed]
    }
  });
};

export const WalkingHeartRateService = {
  fetchWalkingHeartRate,
};
