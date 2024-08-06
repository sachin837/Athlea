import appleHealthKit, {HealthValue} from 'react-native-health';
import {Dispatch} from 'react';
import {
  ActiveEnergyBurnedResponse,
  ActiveEnergyBurnedState,
} from '../../../store/healthKit/energyBurnedSlice.ts';
import HttpClient from '../../HttpClient.ts';
import {firebase} from '@react-native-firebase/auth';

interface ActiveEnergyBurnedTrendData {
  average: number;
  min: number;
  max: number;
  sum: number;
}

const roundTo = (num, decimals) => parseFloat(num.toFixed(decimals));

const calculateStatistics = (data: HealthValue[]) => {
  const values = data.map(item => item.value);
  if (values.length === 0) {
    return {average: 0, min: 0, max: 0, sum: 0};
  }

  const sum = roundTo(
    values.reduce((a, b) => a + b, 0),
    1,
  );
  const average = roundTo(sum / values.length, 1);
  const min = roundTo(Math.min(...values), 1);
  const max = roundTo(Math.max(...values), 1);

  return {sum, average, min, max};
};

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

const getPastWeeksDates = weeks => {
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

const calculateWeeklyVariance = async () => {
  const twoWeeksDates = getPastWeeksDates(2);
  if (twoWeeksDates.length < 2) {
    return 0; // In case there are not enough data points
  }

  try {
    const lastWeekTotal = await calculateWeeklyTotal(
      twoWeeksDates[0].start,
      twoWeeksDates[0].end,
    );
    const previousWeekTotal = await calculateWeeklyTotal(
      twoWeeksDates[1].start,
      twoWeeksDates[1].end,
    );

    return roundTo(lastWeekTotal - previousWeekTotal, 1); // Variance between the last two weeks, rounded to 1 decimal place
  } catch (error) {
    console.error('Error in calculateWeeklyVariance:', error);
    return 0;
  }
};

const fetchDataFromHealthKit = async options => {
  return new Promise((resolve, reject) => {
    appleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results as HealthValue[]);
    });
  });
};
const calculateWeeklyAverage = async () => {
  const weekEnd = new Date();
  weekEnd.setHours(23, 59, 59, 999);

  const weekStart = new Date();
  weekStart.setDate(weekEnd.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const options = {
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    limit: 0,
    ascending: true,
  };

  try {
    const results = await fetchDataFromHealthKit(options);
    const total = calculateStatistics(results).sum;
    return roundTo(total / 7, 1); // Average per day for the week
  } catch (error) {
    console.error('Error in calculateWeeklyAverage:', error);
    return 0;
  }
};

const calculateWeeklyTotal = async (startDate, endDate) => {
  try {
    // Convert to ISO string directly
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 0,
      ascending: true,
    };

    const results = await fetchDataFromHealthKit(options);
    if (!results) throw new Error('No data fetched');
    const total = calculateStatistics(results).sum;
    return total;
  } catch (error) {
    console.error('Error in calculateWeeklyTotal:', error);
    return 0;
  }
};

const calculateMonthlyWeeklyAverage = async () => {
  const fourWeeksDates = getPastFourWeeksDates();
  let totalMonthlySum = 0;

  for (const {start, end} of fourWeeksDates) {
    const weeklyTotal = await calculateWeeklyTotal(start, end);
    totalMonthlySum += weeklyTotal;
  }

  return roundTo(totalMonthlySum / 4, 1); // Average per week over the last month
};

function calculateTotalEnergyBurned(results) {
  const total = results.reduce(
    (total, currentValue) => total + currentValue.value,
    0,
  );
  return roundTo(total, 1);
}

const getPastEightWeeksDates = () => {
  // Similar to getPastFourWeeksDates, but for 8 weeks
  const dates = [];
  let currentDate = new Date();
  for (let i = 0; i < 8; i++) {
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

const calculateWeeklyMax = async () => {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date();
  weekEnd.setHours(23, 59, 59, 999);

  let maxCalories = 0;

  for (let i = 0; i < 7; i++) {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + i);

    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const options = {
      startDate: dayStart.toISOString(),
      endDate: dayEnd.toISOString(),
      limit: 0,
      ascending: true,
    };

    try {
      const results = await fetchDataFromHealthKit(options);
      const dayTotal = calculateStatistics(results).sum;
      maxCalories = Math.max(maxCalories, dayTotal);
    } catch (error) {
      console.error('Error in calculateWeeklyMax:', error);
    }
  }

  return maxCalories;
};

const processActiveEnergyBurnedData = (results, days) => {
  let trendData = [];
  for (let i = 0; i < days; i++) {
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

    // Calculate total energy burned for the day without dividing by the number of items
    const dayTotal = dayData.reduce((sum, item) => sum + item.value, 0);

    // No need to calculate average here
    trendData.unshift(roundTo(dayTotal, 1)); // Add the total, rounded to one decimal place
  }
  return trendData;
};

// Helper function to calculate statistics

// Main service function to handle different types of active energy burned data
const fetchActiveEnergyBurned = async (
  type: string,
  timeframe?: string,
): Promise<ActiveEnergyBurnedResponse> => {
  let options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ascending: true,
    limit: 0,
  };

  switch (type) {
    case 'today':
      options.startDate = new Date(
        new Date().setHours(0, 0, 0, 0),
      ).toISOString();
      options.limit = 0;
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
    case 'weekly-average':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      options.ascending = true;
      break;
    case 'daily-average':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 30),
      ).toISOString();
      options.limit = 0; // Fetch all data for the month
      break;
    case 'weekly-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      options.ascending = true;
      break;
    case 'monthly-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 30),
      ).toISOString();
      options.limit = 0; // Fetch all data for the month
      options.ascending = true;
      break;
    case 'last-recorded':
      // Already set up for the last recorded
      break;
    case 'two-week-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 14),
      ).toISOString();
      options.limit = 0;
      break;
    case 'two-month-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 60),
      ).toISOString();
      options.limit = 0;
      break;

    // Add cases for 'yesterday' and other types if needed...
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getActiveEnergyBurned(options, async (err, results) => {
      if (err) {
        reject(err);
      } else {
        let processedData: ActiveEnergyBurnedState = {};
        switch (type) {
          case 'last-recorded':
            if (results.length > 0) {
              processedData.lastRecorded = results[0].value;
            } else {
              processedData.lastRecorded = 0;
            }
            break;
          case 'today':
            // Use the calculateTotalEnergyBurned function for today's total energy
            processedData.today = calculateTotalEnergyBurned(results);
            break;
          case 'yesterday':
            // Similarly, use it for yesterday's total energy
            processedData.yesterday = calculateTotalEnergyBurned(results);
            break;
          case 'weekly-average':
            const weeklyAverageData = await calculateMonthlyWeeklyAverage();
            processedData.weeklyAverage = weeklyAverageData;
            break;
          case 'daily-average':
            const dailyAverageData = await calculateWeeklyAverage();
            processedData.dailyAverage = dailyAverageData;
            break;
          case 'weekly-trend':
            processedData.weeklyTrend = processActiveEnergyBurnedData(
              results,
              7,
            );
            break;
          case 'monthly-trend': {
            const fourWeeksDates = getPastFourWeeksDates();
            const weeklyTotals = await Promise.all(
              fourWeeksDates.map(async ({start, end}) => {
                const total = await calculateWeeklyTotal(start, end);
                return total; // Total calories for each of the last four weeks
              }),
            );
            processedData.monthlyTrend = weeklyTotals;
            break;
          }
          case 'two-week-trend': {
            processedData.twoWeekTrend = processActiveEnergyBurnedData(
              results,
              14,
            );
            break;
          }
          case 'two-month-trend': {
            const eightWeeksDates = getPastEightWeeksDates();
            const weeklyTotals = await Promise.all(
              eightWeeksDates.map(async ({start, end}) => {
                const total = await calculateWeeklyTotal(start, end);
                return roundTo(total, 1); // Round here
              }),
            );
            processedData.twoMonthTrend = weeklyTotals;
            break;
          }
          case 'weekly-variance':
            processedData.weeklyVariance = await calculateWeeklyVariance();
            break;
          case 'weekly-max':
            processedData.weeklyMax = await calculateWeeklyMax();
            break;
          // Add cases for 'yesterday' and other types if needed...
        }
        resolve(processedData);
      }
    });
  });
};

const sendActiveEnergyBurnedData = async (
  activeEnergyBurned: ActiveEnergyBurnedState,
) => {
  try {
    const dataToSend = {
      ...activeEnergyBurned,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/calories-burned',
      dataToSend,
    );
    console.log('Active Energy Burned data sent successfully:');
  } catch (error) {
    console.error(error);
  }
};

const fetchAllEnergyBurnedData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'last-recorded', key: 'lastRecorded'},
    {type: 'weekly-average', key: 'weeklyAverage'},
    {type: 'daily-average', key: 'dailyAverage'},
    {type: 'two-week-trend', key: 'twoWeekTrend'},
    {type: 'two-month-trend', key: 'twoMonthTrend'},
    {type: 'weekly-variance', key: 'weeklyVariance'},
    {type: 'weekly-max', key: 'weeklyMax'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchActiveEnergyBurned(type, 'day').then(result => ({key, result})),
    );

    const results = await Promise.all(fetchPromises);

    let processedData = {
      error: null,
      lastRecorded: null,
      loading: false,
      monthly: {average: null, max: null, min: null},
      monthlyTrend: [],
      today: {average: null, max: null, min: null},
      weekly: null,
      weeklyTrend: [],
      yesterday: {average: null, max: null, min: null},
      weeklyAverage: null,
      dailyAverage: null,
      twoWeekTrend: [],
      twoMonthTrend: [],
      weeklyVariance: null,
      weeklyMax: null,
      // Initialize other data points as needed
    };

    results.forEach(({key, result}) => {
      if (
        key === 'monthlyTrend' ||
        key === 'weeklyTrend' ||
        key === 'twoWeekTrend' ||
        key === 'twoMonthTrend'
      ) {
        processedData[key] = result[key] || [];
      } else if (
        key === 'lastRecorded' ||
        key === 'weekly' ||
        key === 'weeklyVariance' ||
        key === 'weeklyMax' ||
        key === 'today' ||
        key === 'yesterday' ||
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
    console.error('Error fetching all heart rate data:', error);
    throw new Error('Failed to fetch all heart rate data');
  }
};

export const ActiveEnergyBurnedService = {
  fetchActiveEnergyBurned,
  sendActiveEnergyBurnedData,
  fetchAllEnergyBurnedData,
};
