import appleHealthKit from 'react-native-health';
import {DistanceMaxResponse} from '../../../store/healthKit/distanceWalkingRunningSlice.ts';
import {firebase} from '@react-native-firebase/auth';
import HttpClient from '../../HttpClient.ts';
const roundTo = (num, decimals) => parseFloat(num.toFixed(decimals));

const getPastFourWeeksDates = () => {
  const dates = [];
  let currentDate = new Date();
  for (let i = 0; i < 4; i++) {
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay() + (i === 0 ? 0 : 1),
    );
    const startOfWeek = new Date(endOfWeek);
    startOfWeek.setDate(endOfWeek.getDate() - 6);
    dates.push({start: startOfWeek, end: endOfWeek});
    currentDate = new Date(startOfWeek);
  }
  return dates;
};

const getPastWeeksDates = (weeks = 4) => {
  const dates = [];
  let currentDate = new Date();
  for (let i = 0; i < weeks; i++) {
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay() + (i === 0 ? 0 : 1),
    );
    const startOfWeek = new Date(endOfWeek);
    startOfWeek.setDate(endOfWeek.getDate() - 6);
    dates.push({start: startOfWeek, end: endOfWeek});
    currentDate = new Date(startOfWeek);
  }
  return dates;
};

// Helper function to get distance for a specific date
const getDistanceForDate = async (
  date: string,
  unit: 'km' | 'mile' = 'km',
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const options = {
      date,
      includeManuallyAdded: false,
      unit: unit === 'km' ? 'meter' : 'mile', // Convert 'km' to 'meter' for HealthKit
    };

    appleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      let distance = result.value || 0;
      if (unit === 'km') {
        distance /= 1000; // Convert meters to kilometers if the unit is 'km'
      }
      resolve(roundTo(distance, 2));
    });
  });
};

// Fetches distance for a period and returns an array of daily distances
const fetchDistanceForPeriod = async (
  startDate: Date,
  endDate: Date,
): Promise<number[]> => {
  let distances = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dailyDistance = await getDistanceForDate(d.toISOString());
    distances.push(dailyDistance);
  }
  return distances;
};

// Main service function to handle different types of distance data
const fetchWalkingAndRunningDistance = async (
  type: string,
  timeframe: string,
): Promise<DistanceMaxResponse> => {
  switch (type) {
    case 'today':
      const todayDistance = await getDistanceForDate(new Date().toISOString());
      return {today: todayDistance};

    case 'yesterday':
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDistance = await getDistanceForDate(
        yesterday.toISOString(),
      );
      return {yesterday: yesterdayDistance};
    case 'weekly-average': {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start of the week
      startDate.setHours(0, 0, 0, 0);
      let endDate = new Date();
      const distances = await fetchDistanceForPeriod(startDate, endDate);
      const total = distances.reduce((sum, distance) => sum + distance, 0);
      return {weeklyAverage: roundTo(total / distances.length, 2)}; // Calculate the average
    }
    //Daily average across the month
    case 'daily-average': {
      let startDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      );
      let endDate = new Date();
      const distances = await fetchDistanceForPeriod(startDate, endDate);
      const total = distances.reduce((sum, distance) => sum + distance, 0);
      return {dailyAverage: total / distances.length}; // Calculate the average
    }
    case 'weekly-trend': {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // Adjust to last 7 days
      let endDate = new Date();
      const distances = await fetchDistanceForPeriod(startDate, endDate);
      return {weeklyTrend: distances};
    }

    case 'weekly-max': {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start of the week
      startDate.setHours(0, 0, 0, 0);
      let endDate = new Date();
      const distances = await fetchDistanceForPeriod(startDate, endDate);
      return {weeklyMax: Math.max(...distances)};
    }

    case 'monthly-trend': {
      const fourWeeksDates = getPastFourWeeksDates();
      const weeklyTotals = await Promise.all(
        fourWeeksDates.map(async ({start, end}) => {
          const distances = await fetchDistanceForPeriod(start, end);
          return distances.reduce((sum, distance) => sum + distance, 0);
        }),
      );
      return {monthlyTrend: weeklyTotals};
    }
    case 'two-month-trend': {
      const eightWeeksDates = getPastWeeksDates(8); // Get dates for the last 8 weeks
      const weeklyTotals = await Promise.all(
        eightWeeksDates.map(async ({start, end}) => {
          const distances = await fetchDistanceForPeriod(start, end);
          return distances.reduce((sum, distance) => sum + distance, 0);
        }),
      );
      return {twoMonthTrend: weeklyTotals};
    }
    case 'two-week-trend': {
      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 13); // Set to 14 days ago (including today)

      const distances = await fetchDistanceForPeriod(startDate, endDate);
      return {twoWeekTrend: distances};
    }
    case 'weekly-variance': {
      const fourWeeksDates = getPastFourWeeksDates();
      let totalVariance = 0;
      let lastWeekTotalDistance = 0;
      let weekCount = 0;

      for (let i = 0; i < fourWeeksDates.length; i++) {
        const weeklyDistances = await fetchDistanceForPeriod(
          fourWeeksDates[i].start,
          fourWeeksDates[i].end,
        );
        const weeklyTotalDistance = weeklyDistances.reduce(
          (sum, distance) => sum + distance,
          0,
        );

        if (i > 0) {
          // Calculate the variance from the previous week
          const weekVariance = weeklyTotalDistance - lastWeekTotalDistance;
          totalVariance += weekVariance;
          weekCount++;
        }

        lastWeekTotalDistance = weeklyTotalDistance;
      }

      // Calculate the average variance
      const weeklyVariance =
        weekCount > 0 ? roundTo(totalVariance / weekCount, 2) : 0;

      return {weeklyVariance: weeklyVariance};
    }

    case 'last-recorded':
      const lastRecordedDistance = await getDistanceForDate(
        new Date().toISOString(),
      );
      return {lastRecorded: lastRecordedDistance};

    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

const fetchAllDistanceData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'weekly-average', key: 'weekly'},
    {type: 'daily-average', key: 'monthly'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'weekly-max', key: 'weeklyMax'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'two-month-trend', key: 'twoMonthTrend'},
    {type: 'two-week-trend', key: 'twoWeekTrend'},
    {type: 'weekly-variance', key: 'weeklyVariance'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchWalkingAndRunningDistance(type, 'day').then(result => ({
        key,
        result,
      })),
    );

    const results = await Promise.all(fetchPromises);

    let processedData = {
      today: 0,
      weekly: {average: 0, min: 0, max: 0},
      yesterday: 0,
      weeklyTrend: [],
      weeklyMax: 0,
      monthlyTrend: [],
      twoMonthTrend: [],
      twoWeekTrend: [],
      weeklyVariance: 0,
      lastRecorded: 0,
      weeklyAverage: 0,
      dailyAverage: 0,
    };

    results.forEach(({key, result}) => {
      if (
        key === 'weeklyTrend' ||
        key === 'monthlyTrend' ||
        key === 'twoWeekTrend' ||
        key === 'twoMonthTrend'
      ) {
        processedData[key] = result[key] || [];
      } else if (
        key === 'weekly' ||
        key === 'today' ||
        key === 'yesterday' ||
        key === 'weeklyVariance' ||
        key === 'lastRecorded' ||
        key === 'weeklyMax' ||
        key === 'weeklyAverage' ||
        key === 'dailyAverage'
      ) {
        // Directly assign the value for 'lastRecorded' and 'weekly' without wrapping it in an object.
        processedData[key] = result.hasOwnProperty(key) ? result[key] : result;
      } else {
        processedData[key] = {...result[key]};
      }
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching distance data:', error);
    throw new Error('Error fetching distance data');
  }
};

const sendDistanceData = async (distanceData: DistanceMaxResponse) => {
  try {
    const dataToSend = {
      ...distanceData,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/distance',
      dataToSend,
    );
    console.log('Response from server:', response);
  } catch (error) {
    console.error('Error sending distance data to server:', error);
  }
};

export const WalkingAndRunningDistanceService = {
  fetchWalkingAndRunningDistance,
  sendDistanceData,
  fetchAllDistanceData,
};
