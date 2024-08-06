import {firebase} from '@react-native-firebase/auth';
import appleHealthKit, {HealthValue} from 'react-native-health';
import {
  Vo2MaxResponse,
  Vo2MaxState,
} from '../../../store/healthKit/vo2MaxSlice.ts';
import HttpClient from '../../HttpClient.ts';

const calculateStatistics = (
  data: HealthValue[],
): {average: number; min: number; max: number; standardDeviation: number} => {
  const values = data.map(item => item.value);
  if (values.length === 0) {
    return {average: 0, min: 0, max: 0, standardDeviation: 0};
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const average = sum / values.length;

  // Calculate variance
  const variance =
    values.reduce((total, value) => total + Math.pow(value - average, 2), 0) /
    values.length;

  // Calculate standard deviation
  const standardDeviation = Math.sqrt(variance);

  return {
    average: parseFloat(average.toFixed(2)),
    min: parseFloat(Math.min(...values).toFixed(2)),
    max: parseFloat(Math.max(...values).toFixed(2)),
    standardDeviation: parseFloat(standardDeviation.toFixed(2)),
  };
};

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

const calculateWeeklyAverage = async (startDate, endDate) => {
  try {
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 0,
      ascending: true,
    };

    const results = await fetchDataFromHealthKit(options);
    if (!results) throw new Error('No data fetched');

    // Use calculateStatistics to get the average
    const weeklyStats = calculateStatistics(results);
    return weeklyStats.average; // Return the average
  } catch (error) {
    console.error('Error in calculateWeeklyAverage:', error);
    return 0;
  }
};

const fetchDataFromHealthKit = async options => {
  return new Promise((resolve, reject) => {
    appleHealthKit.getVo2MaxSamples(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results as HealthValue[]);
    });
  });
};

const processWeeklyPeakData = results => {
  let trendData = [];
  let peakValue = 0; // Initialize peak value

  for (let i = 0; i < 7; i++) {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date();
    dayEnd.setDate(dayEnd.getDate() - i);
    dayEnd.setHours(23, 59, 59, 999);

    const dayData = results.filter(item => {
      const itemDate = new Date(item.startDate);
      return itemDate >= dayStart && itemDate <= dayEnd;
    });

    const dayMax =
      dayData.length > 0 ? Math.max(...dayData.map(item => item.value)) : 0;
    trendData.unshift(dayMax);

    // Update peak value if current day's max is greater
    if (dayMax > peakValue) {
      peakValue = dayMax;
    }
  }

  return {
    weeklyData: trendData,
    weeklyPeak: peakValue,
  };
};

export const fetchVo2Max = (
  type: string,
  timeframe: string,
): Promise<Vo2MaxResponse> => {
  let options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ascending: true,
    limit: 0,
  };

  switch (type) {
    case 'last-recorded':
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      options = {
        startDate: oneYearAgo.toISOString(), // Start date set to one year ago
        endDate: new Date().toISOString(), // End date set to current date
        ascending: false, // Set to false to get the most recent data first
        limit: 0,
      };
      break;
    case 'weekly':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      break;
    case 'weekly-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      options.ascending = true;
      break;
    case 'weekly-max':
      // Adjust startDate and endDate to cover the last 7 days
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      options = {
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
        ascending: false, // Retrieve most recent data first
        limit: 0,
      };
      break;
    case 'monthly':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 30),
      ).toISOString();
      options.limit = 0; // Fetch all data for the month
      break;
    case 'today':
      options.startDate = new Date(
        new Date().setHours(0, 0, 0, 0),
      ).toISOString();
      options.limit = 0; // Fetch all data for the day
      break;
    case 'yesterday':
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      options.startDate = new Date(
        yesterday.setHours(0, 0, 0, 0),
      ).toISOString();
      options.endDate = new Date(
        yesterday.setHours(23, 59, 59, 999),
      ).toISOString();
      options.limit = 0;
      break;
    // ... [other cases if needed]
  }

  if (!options) {
    // console.error("Options are not defined");
    return; // Exit the function if options are not set
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getVo2MaxSamples(options, async (err, results) => {
      if (err) {
        reject(err);
      } else {
        let processedData: Vo2MaxState = {};
        switch (type) {
          case 'last-recorded':
            const mostRecentNonZero = results
              .slice()
              .reverse()
              .find(item => item.value !== 0);
            processedData.lastRecorded = mostRecentNonZero
              ? mostRecentNonZero.value
              : null;
            break;
          case 'weekly':
            const weeklyData = calculateStatistics(results);
            processedData.weekly = weeklyData;
            break;
          case 'weekly-trend':
            const weeklyVo2MaxData = processWeeklyPeakData(results);
            processedData.weeklyTrend = weeklyVo2MaxData.weeklyData;
            break;
          case 'weekly-max':
            const {weeklyPeak} = processWeeklyPeakData(results);
            processedData.weeklyMax = weeklyPeak;
            break;
          case 'monthly':
            const monthlyRestingHeartRates = calculateStatistics(results);
            processedData.monthly = monthlyRestingHeartRates;
            break;
          case 'monthly-trend': {
            try {
              const fourWeeksDates = getPastFourWeeksDates();
              const weeklyAverages = await Promise.all(
                fourWeeksDates.map(async ({start, end}) => {
                  const average = await calculateWeeklyAverage(start, end);
                  return roundTo(average, 2); // Round to two decimal places
                }),
              );
              processedData.monthlyTrend = weeklyAverages;
            } catch (error) {
              console.error('Error in processing monthly-trend:', error);
            }
            break;
          }
          case 'today':
            const statistics = calculateStatistics(results);
            processedData.today = statistics;
            break;
          case 'yesterday':
            const yesterdayStatistics = calculateStatistics(results);
            processedData.yesterday = yesterdayStatistics;
            break;
          // ... [other cases if needed]
        }
        resolve(processedData);
      }
    });
  });
};

const fetchAllVo2MaxData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'weekly-max', key: 'weeklyMax'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchVo2Max(type, 'day').then(result => ({key, result})),
    );

    const results = await Promise.all(fetchPromises);

    let processedData = {
      error: null,
      lastRecorded: null,
      loading: false,
      monthly: null,
      weeklyMax: null,
      monthlyTrend: [],
      today: null,
      weekly: null,
      weeklyTrend: [],
      yesterday: null,
    };

    results.forEach(({key, result}) => {
      if (key === 'monthlyTrend' || key === 'weeklyTrend') {
        // Since 'dailyTrend' is also expected to be an array, include it in this condition
        processedData[key] = result[key] || [];
      } else if (key === 'lastRecorded' || key === 'weeklyMax') {
        // Assuming these are singular values or objects and not arrays
        processedData[key] = result.hasOwnProperty(key) ? result[key] : null;
      } else {
        // If there are other keys expected to be objects, handle them appropriately
        // Note: This case might need adjustment based on your actual data structure
        processedData[key] = {...result[key]};
      }
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching all heart rate data:', error);
    throw new Error('Failed to fetch all heart rate data');
  }
};

const sendVo2MaxData = async (vo2MaxData: Vo2MaxState) => {
  try {
    const dataToSend = {
      ...vo2MaxData,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/vo2-max',
      dataToSend,
    );
    console.log('Response from vo2-max:', response);
  } catch (error) {
    console.error('Error in sending vo2-max data:', error);
  }
};

export const Vo2MaxService = {
  fetchVo2Max,
  sendVo2MaxData,
  fetchAllVo2MaxData,
};
