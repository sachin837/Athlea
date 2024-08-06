import {Dispatch} from 'react';
import appleHealthKit, {HealthValue} from 'react-native-health';
import HttpClient from '../../HttpClient.ts';
import {firebase} from '@react-native-firebase/auth';
import {
  HeartRateVariabilityResponse,
  HeartRateVariabilityState,
} from '../../../store/healthKit/heartRateVariabilitySlice.ts';

interface HeartRateVariabilityTrendData {
  average: number;
  min: number;
  max: number;
}

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

const calculateWeeklyTotal = async (startDate, endDate) => {
  try {
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 0,
      ascending: true,
    };

    console.log('Options for weekly total:', options); // Additional logging for debugging
    const results = await fetchDataFromHealthKit(options);
    if (!results) throw new Error('No data fetched');

    // Directly using the calculateStatistics function to get the average value.
    // The function now only returns the average, aligning with your updated requirements.
    const average = calculateStatistics(results);

    // The average value is rounded to 2 decimal places and returned.
    return roundTo(average, 2);
  } catch (error) {
    console.error('Error in calculateWeeklyTotal:', error);
    return 0; // Returning 0 as a fallback in case of an error.
  }
};

const getHeartRateVariabilityForDate = async (
  date: string,
): Promise<number> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0); // Set to start of the day
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

  const options = {
    startDate: startOfDay.toISOString(),
    endDate: endOfDay.toISOString(),
    ascending: false, // Get the most recent data first
    limit: 1, // Only need the most recent data
  };

  return new Promise((resolve, reject) => {
    appleHealthKit.getHeartRateVariabilitySamples(options, (err, results) => {
      if (err) {
        console.error('HealthKit Error:', err);
        reject(err);
      } else {
        console.log('HealthKit Results for date', date, ':', results);
        resolve(results.length > 0 ? results[0].value : 0);
      }
    });
  });
};

const calculateStatistics = (data: HealthValue[]): number => {
  const values = data.map(item => item.value);
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce((a, b) => a + b, 0);
  const average = parseFloat((sum / values.length).toFixed(2));
  return formatHRV(average); // Apply formatHRV here
};

const calculateHourlyAveragesForDay = (results, dayDate) => {
  let hourlyAverages = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourStart = new Date(dayDate);
    hourStart.setHours(hour, 0, 0, 0);

    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hour, 59, 59, 999);

    const hourData = results.filter(item => {
      const itemDate = new Date(item.startDate);
      return itemDate >= hourStart && itemDate <= hourEnd;
    });

    const hourlyAverageHRV =
      hourData.length > 0
        ? formatHRV(
            hourData.reduce((acc, curr) => acc + curr.value, 0) /
              hourData.length,
          )
        : null;
    hourlyAverages.push(hourlyAverageHRV);
  }
  return hourlyAverages;
};

const processHeartRateVariabilityData = (results, days) => {
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

    const dailyAverageHRV =
      dayData.length > 0
        ? formatHRV(
            dayData.reduce((acc, curr) => acc + curr.value, 0) / dayData.length,
          )
        : 0;
    trendData.unshift(dailyAverageHRV); // Use unshift to add the daily average at the beginning of the array
  }
  return trendData;
};

const fetchDataFromHealthKit = async options => {
  return new Promise((resolve, reject) => {
    appleHealthKit.getHeartRateVariabilitySamples(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results as HealthValue[]);
    });
  });
};

const formatHRV = (hrvValue: number) => {
  // Assuming hrvValue is in seconds, convert to milliseconds and round
  return Math.round(hrvValue * 1000);
};

const fetchHeartRateVariability = async (
  type: string,
  timeframe: string,
): Promise<HeartRateVariabilityResponse> => {
  let options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ascending: true,
    limit: 0,
  };

  switch (type) {
    case 'last-recorded':
      // Already set up for the last recorded
      break;
    case 'weekly-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      options.ascending = true;
      break;
    case 'monthly':
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
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
    case 'monthly-trend':
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
    case 'daily-trend':
      // Set start date to the beginning of the day
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      // Set end date to the end of the same day
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);

      options.startDate = startDate.toISOString();
      options.endDate = endDate.toISOString();
      options.limit = 0; // Assuming '0' means no limit to fetch all available samples
      break;
    case 'weekly':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getHeartRateVariabilitySamples(
      options,
      async (err, results) => {
        if (err) {
          reject(err);
        } else {
          let processedData: HeartRateVariabilityState = {};
          switch (type) {
            case 'weekly-trend':
              const weeklyTrend = processHeartRateVariabilityData(results, 7);
              processedData.weeklyTrend = weeklyTrend;
              break;

            case 'dailyTrend':
              // Use today's date or a specific date as 'dayDate'
              const dayDate = new Date(); // Or any specific day you're interested in
              const dailyTrend = calculateHourlyAveragesForDay(
                results,
                dayDate,
              );
              processedData.dailyTrend = dailyTrend;
              break;
            case 'today':
              // Directly assign the result of calculateStatistics
              processedData.today = calculateStatistics(results);
              break;

            case 'monthly':
              // Directly assign the result of calculateStatistics
              processedData.monthly = calculateStatistics(results);
              break;
            case 'yesterday':
              // Directly assign the result of calculateStatistics
              processedData.yesterday = calculateStatistics(results);
              break;
            case 'monthly-trend': {
              try {
                const fourWeeksDates = getPastFourWeeksDates();
                const weeklyTotals = await Promise.all(
                  fourWeeksDates.map(async ({start, end}) => {
                    try {
                      const total = await calculateWeeklyTotal(start, end);
                      return total;
                    } catch (error) {
                      console.error(
                        'Error processing weekly total for range',
                        {start, end},
                        error,
                      );
                      return 0; // Return 0 in case of an individual range error
                    }
                  }),
                );
                processedData.monthlyTrend = weeklyTotals;
              } catch (error) {
                console.error('Error in processing monthly-trend:', error);
                // Handle the overall error
              }
              break;
            }
            case 'last-recorded':
              console.log('Fetching last recorded heart rate');
              try {
                const lastRecordedRate = await getHeartRateVariabilityForDate(
                  new Date().toISOString(),
                );
                console.log('Last recorded rate:', lastRecordedRate);
                processedData.lastRecorded = formatHRV(lastRecordedRate);
              } catch (error) {
                console.error('Error getting last recorded heart rate:', error);
                processedData.lastRecorded = 0;
              }
              break;
            case 'weekly':
              // Directly assign the result of calculateStatistics
              processedData.weekly = calculateStatistics(results);
              break;

            // other cases...
          }
          resolve(processedData);
        }
      },
    );
  });
};

const sendHeartRateVariabilityData = async (
  restingHeartRateData: HeartRateVariabilityState,
) => {
  try {
    const dataToSend = {
      ...restingHeartRateData,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/heart-rate-variability',
      dataToSend,
    );
    console.log('Heart rate variability data sent successfully');
  } catch (error) {
    console.log('Error sending heart rate variability data', error);
  }
};

const fetchAllHeartRateVariabilityData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'daily-trend', key: 'dailyTrend'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchHeartRateVariability(type, 'day').then(result => ({key, result})),
    );

    const results = await Promise.all(fetchPromises);

    let processedData = {
      error: null,
      lastRecorded: null,
      loading: false,
      monthly: null,
      monthlyTrend: [],
      today: null,
      weekly: null,
      weeklyTrend: [],
      dailyTrend: [],
      yesterday: null,
    };

    results.forEach(({key, result}) => {
      if (
        key === 'monthlyTrend' ||
        key === 'weeklyTrend' ||
        key === 'dailyTrend'
      ) {
        // Since 'dailyTrend' is also expected to be an array, include it in this condition
        processedData[key] = result[key] || [];
      } else if (
        key === 'lastRecorded' ||
        key === 'weekly' ||
        key === 'today' ||
        key === 'monthly' ||
        key === 'yesterday'
      ) {
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

export const HeartRateVariabilityService = {
  fetchHeartRateVariability,
  sendHeartRateVariabilityData,
  fetchAllHeartRateVariabilityData,
};
