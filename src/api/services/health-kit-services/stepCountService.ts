import appleHealthKit, {HealthValue} from 'react-native-health';
import {
  StepCountResponse,
  StepCountState,
} from '../../../store/healthKit/stepCountSlice.ts';
import {firebase} from '@react-native-firebase/auth';
import HttpClient from '../../HttpClient.ts';

// Fetches step count for a single day
const fetchDailyStepCount = async (date: Date): Promise<number> => {
  let options = {
    date: date.toISOString(),
    includeManuallyAdded: false,
  };

  return new Promise((resolve, reject) => {
    appleHealthKit.getStepCount(options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.value || 0); // Assuming result.value is a number
      }
    });
  });
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

const getStartOfWeek = date => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
  startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
  return startOfWeek;
};

const fetchWeeklyStepCount = async (startDate, endDate) => {
  let totalSteps = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dailySteps = await fetchDailyStepCount(new Date(currentDate));
    totalSteps += dailySteps;
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1)); // Create a new Date object
  }

  return totalSteps;
};

// Fetches step counts for a range of dates and returns an array of daily steps
const fetchStepCountForPeriod = async (
  startDate: Date,
  endDate: Date,
): Promise<number[]> => {
  let stepsArray = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dailySteps = await fetchDailyStepCount(new Date(d));
    stepsArray.push(Math.round(dailySteps)); // Round each day's steps
  }
  return stepsArray;
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

const fetchStepCount = async (
  type: string,
  timeframe: string,
): Promise<StepCountResponse> => {
  let today,
    yesterday,
    weeklyTrend,
    weekly,
    monthly,
    monthlyTrend,
    weeklyVariance,
    twoWeekTrend,
    twoMonthTrend;

  switch (type) {
    case 'weekly-trend': {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // Last 7 days including today
      weeklyTrend = await fetchStepCountForPeriod(startDate, new Date());
      break;
    }
    case 'weekly': {
      weekly = await fetchWeeklyStepCount(
        getStartOfWeek(new Date()),
        new Date(),
      );
      break;
    }
    case 'monthly': {
      let startDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      );
      let endDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      );
      monthly = await fetchStepCountForPeriod(startDate, endDate);

      // Summing up all daily step counts in the monthly array
      const totalMonthlySteps = monthly.reduce(
        (sum, dailySteps) => sum + dailySteps,
        0,
      );
      monthly = totalMonthlySteps; // Assigning the total sum to 'monthly'
      break;
    }
    case 'monthly-trend': {
      const fourWeeksDates = getPastFourWeeksDates();
      monthlyTrend = [];
      for (let week of fourWeeksDates) {
        try {
          const weeklySteps = await fetchWeeklyStepCount(week.start, week.end);
          const roundedWeeklySteps = Math.round(weeklySteps); // Rounding the weekly steps
          console.log(
            `Weekly Steps from ${week.start} to ${week.end}: ${roundedWeeklySteps}`,
          );
          monthlyTrend.push(roundedWeeklySteps);
        } catch (error) {
          console.error(
            `Error fetching steps for week of ${week.start}:`,
            error,
          );
        }
      }
      break;
    }
    case 'two-week-trend': {
      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 13); // Set to 14 days ago (including today)

      twoWeekTrend = await fetchStepCountForPeriod(startDate, endDate);
      break;
    }
    case 'two-month-trend': {
      const eightWeeksDates = getPastWeeksDates(8); // Get dates for the last 8 weeks
      twoMonthTrend = [];
      for (let week of eightWeeksDates) {
        try {
          const weeklySteps = await fetchWeeklyStepCount(week.start, week.end);
          const roundedWeeklySteps = Math.round(weeklySteps); // Rounding the weekly steps
          console.log(
            `Weekly Steps from ${week.start} to ${week.end}: ${roundedWeeklySteps}`,
          );
          twoMonthTrend.push(roundedWeeklySteps);
        } catch (error) {
          console.error(
            `Error fetching steps for week of ${week.start}:`,
            error,
          );
        }
      }
      break;
    }
    case 'weekly-variance': {
      const fourWeeksDates = getPastFourWeeksDates();
      let totalVariance = 0;
      let lastWeekSteps = 0;
      let weekCount = 0;

      for (let i = 0; i < fourWeeksDates.length; i++) {
        const weeklySteps = await fetchWeeklyStepCount(
          fourWeeksDates[i].start,
          fourWeeksDates[i].end,
        );

        if (i > 0) {
          // Calculate the variance from the previous week
          const weekVariance = weeklySteps - lastWeekSteps;
          totalVariance += weekVariance;
          weekCount++;
        }

        lastWeekSteps = weeklySteps;
      }

      // Calculate the average variance
      weeklyVariance =
        weekCount > 0 ? Math.round(totalVariance / weekCount) : 0;
      break;
    }
    case 'today': {
      const result = await fetchDailyStepCount(new Date());
      today = result != null ? result : 0;
      break;
    }

    case 'yesterday': {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const result = await fetchDailyStepCount(yesterdayDate);
      yesterday = result != null ? result : 0;
      break;
    }

    default:
      throw new Error(`Unsupported type: ${type}`);
  }

  return {
    today,
    yesterday,
    weeklyTrend,
    weekly,
    weeklyVariance,
    monthly,
    monthlyTrend,
    twoWeekTrend,
    twoMonthTrend,
  };
};

const sendStepData = async (steps: StepCountState) => {
  try {
    const dataToSend = {
      ...steps,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/step-count',
      dataToSend,
    );
    console.log('Response from sendStepData:', response);
  } catch (error) {
    console.error('Error in sendStepData:', error);
  }
};

const fetchAllStepData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-variance', key: 'weeklyVariance'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'two-week-trend', key: 'twoWeekTrend'},
    {type: 'two-month-trend', key: 'twoMonthTrend'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchStepCount(type, 'day').then(result => ({key, result})),
    );

    console.log('fetchPromises:', fetchPromises);

    const results = await Promise.all(fetchPromises);

    let processedData = {
      error: null,
      loading: false,
      today: 0,
      yesterday: 0,
      weeklyVariance: 0,
      weeklyTrend: [],
      monthly: 0,
      monthlyTrend: [],
      weekly: 0,
      twoWeekTrend: [],
      twoMonthTrend: [],
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
        key === 'monthly' ||
        key === 'weeklyVariance'
      ) {
        // Directly assign the value for 'lastRecorded' and 'weekly' without wrapping it in an object.
        processedData[key] = result.hasOwnProperty(key) ? result[key] : result;
      } else {
        processedData[key] = {...result[key]};
      }
    });

    console.log('Processed step count data:', processedData);
    return processedData;
  } catch (error) {
    console.error('Error fetching all step count data:', error);
    throw new Error('Failed to fetch all step count data');
  }
};

export const StepCountService = {
  fetchStepCount,
  sendStepData,
  fetchAllStepData,
};
