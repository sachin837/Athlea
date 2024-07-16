import appleHealthKit, {HealthValue} from 'react-native-health';
import HttpClient from '../../HttpClient.ts';
import {firebase} from '@react-native-firebase/auth';

interface ActivitySummaryValue {
  activeEnergyBurned: number;
  activeEnergyBurnedGoal: number;
  appleExerciseTime: number;
  appleExerciseTimeGoal: number;
  appleStandHours: number;
  appleStandHoursGoal: number;
}

interface ActivitySummaryResponse {
  today?: ActivitySummaryValue;
  yesterday?: ActivitySummaryValue;
  weeklyMaxActivity?: ActivitySummaryValue[];
  monthly?: ActivitySummaryValue;
  monthlyTrend?: number[];
  weekly?: number;
  lastRecorded?: ActivitySummaryValue;
}

interface ExerciseTimeResponse {
  today: number;
  yesterday: number;
  thisWeek: number;
  thisMonth: number;
  weeklyTrend: number[];
  monthlyTrend: number[];
}

const roundTo = (num, decimals) => parseFloat(num.toFixed(decimals));

const fetchActivitySummaries = async (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    appleHealthKit.getActivitySummary(options, (err, results) => {
      if (err) {
        reject(`Error fetching activity summary: ${err}`);
        return;
      }
      // Assuming each result is an object with activity data
      const processedResults = results.map(summary => ({
        activeEnergyBurned: summary.activeEnergyBurned,
        activeEnergyBurnedGoal: summary.activeEnergyBurnedGoal,
        appleExerciseTime: summary.appleExerciseTime,
        appleExerciseTimeGoal: summary.appleExerciseTimeGoal,
        appleStandHours: summary.appleStandHours,
        appleStandHoursGoal: summary.appleStandHoursGoal,
      }));
      resolve(processedResults);
    });
  });
};

const calculateTrend = (summaries, key) => {
  return summaries.map(summary => summary[key]);
};

function getStartOfWeek(date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

const sumExerciseTime = (summaries: ActivitySummaryValue[]): number => {
  return summaries.reduce((acc, curr) => acc + curr.appleExerciseTime, 0);
};

const fetchExerciseTimeData = async type => {
  const now = new Date();
  let startDate, endDate;

  // Set the correct time frame for each type
  switch (type) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      endDate = new Date();
      break;
    case 'yesterday':
      startDate = new Date(now.setDate(now.getDate() - 1));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'weekly':
      startDate = getStartOfWeek(now);
      endDate = new Date();
      break;
    case 'monthly':
      startDate = getStartOfMonth(now);
      endDate = new Date();
      break;
    case 'weekly-trend':
    case 'monthly-trend':
      // Adjust the start date based on the trend being calculated
      let daysBack = type === 'weekly-trend' ? 7 : 30;
      startDate = new Date(now);
      startDate.setDate(now.getDate() - daysBack + 1); // +1 to include the start day in the range
      endDate = new Date();
      break;
    case 'last-recorded':
      // Assuming last-recorded means the most recent data
      startDate = new Date(now.getFullYear(), 0, 1); // Start of the year
      endDate = new Date(); // Today
      break;
    default:
      console.error('Invalid type for fetchExerciseTimeData');
      return;
  }

  try {
    const summaries = await fetchActivitySummaries(startDate, endDate);
    let result;

    switch (type) {
      case 'today':
      case 'yesterday':
      case 'weekly':
      case 'monthly':
        // Direct sum for specific time frames
        result = sumExerciseTime(summaries);
        break;
      case 'weekly-trend':
      case 'monthly-trend':
        let daysBack = type === 'weekly-trend' ? 7 : 30;
        // For trend calculations, ensure the correct range is used
        result = await getTrend(startDate, endDate, daysBack);
        break;
      case 'last-recorded':
        // The most recent exercise time
        result = summaries.length
          ? summaries[summaries.length - 1].appleExerciseTime
          : 0;
        break;
    }

    console.log(`Results for ${type}:`, result);
    return result;
  } catch (error) {
    console.error(`Error fetching exercise time data for ${type}:`, error);
    throw new Error(`Failed to fetch exercise time data for ${type}`);
  }
};

// Function to calculate trend data
const getTrend = async (startDate, endDate, days) => {
  let trendData = [];
  let dayMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day
  let startDay = new Date(startDate.setHours(0, 0, 0, 0)); // Ensure we start at the beginning of the start day

  for (let dayOffset = 0; dayOffset < days; dayOffset++) {
    let dayStart = new Date(startDay.getTime() + dayMillis * dayOffset);
    let dayEnd = new Date(dayStart.getTime() + dayMillis - 1);

    const dailySummaries = await fetchActivitySummaries(dayStart, dayEnd);
    let dailyExerciseTime = sumExerciseTime(dailySummaries);
    trendData.push(dailyExerciseTime);
  }

  // Ensure the trend data matches the expected length (days), filling missing data with zeros
  while (trendData.length < days) {
    trendData.unshift(0); // Prepend zeros for days without data (e.g., before the start of collected data)
  }

  return trendData;
};

const sendExerciseTimeData = async exerciseTimeData => {
  try {
    // Construct the payload, including the exercise time data and any additional required information
    const dataToSend = {
      ...exerciseTimeData,
      date: new Date().toISOString(), // Use the current date as the submission date
      userId: firebase.auth().currentUser.uid, // Assuming you're using Firebase for user management
    };

    // Use your HttpClient to send the data to your endpoint
    // Make sure to replace '/api/health-kit/exercise-time' with the correct endpoint
    const response = await HttpClient.post(
      '/api/health-kit/exercise-time',
      dataToSend,
    );

    console.log('Exercise time data sent successfully:', response);
  } catch (error) {
    console.error('Error sending exercise time data:', error);
  }
};

const fetchAllExerciseData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchExerciseTimeData(type).then(result => {
        console.log(`Result for ${type}:`, result); // Log to see the structure
        return {key, result};
      }),
    );

    const results = await Promise.all(fetchPromises);

    console.log('All exercise data fetched:', results);

    let processedData = {
      error: null,
      lastRecorded: null,
      loading: false,
      monthly: null,
      monthlyTrend: [],
      today: null,
      weekly: null,
      weeklyTrend: [],
      yesterday: null,
    };

    results.forEach(({key, result}) => {
      if (Array.isArray(result)) {
        // If the result is expected to be an array, directly assign it
        processedData[key] = result;
      } else if (typeof result === 'number') {
        // If the result is a number, directly assign it
        processedData[key] = result;
      } else {
        // If the result doesn't match expected types, log an error or handle accordingly
        console.error(`Unexpected result type for ${key}:`, result);
      }
    });

    console.log('All exercise data fetched:', processedData);

    return processedData;
  } catch (error) {
    console.error('Error fetching all heart rate data:', error);
    throw new Error('Failed to fetch all heart rate data');
  }
};

export const ActivitiesService = {
  sendExerciseTimeData,
  fetchExerciseTimeData,
  fetchAllExerciseData,
};
