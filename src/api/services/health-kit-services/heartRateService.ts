import {firebase} from '@react-native-firebase/auth';
import appleHealthKit, {HealthValue} from 'react-native-health';
import HttpClient from '../../HttpClient.ts';

interface FetchDataOptions {
  startDate: string;
  endDate: string;
  limit: number;
}

interface HeartRateSample {
  startDate: Date;
  value: number;
}

interface AggregatedHeartRateResponse {
  userId: string;
  today: {average: number; max: number; min: number};
  yesterday: {average: number; max: number; min: number};
  weekly: {average: number; max: number; min: number};
  monthly: {average: number; max: number; min: number};

  // Add other necessary fields
}

interface HeartRateMeasurement {
  time: string;
  value: number;
}

interface DailyHeartRateData {
  date: string;
  measurements: HeartRateMeasurement[];
}

interface FullDayData {
  time: string;
  value: number;
  id: string;
}

interface TodaysHeartRateData {
  lastRecorded: number; // Assuming lastRecorded is a number, adjust the type if needed
  fullDayData: FullDayData[]; // Assuming each entry has a time and a value
}

interface SendHeartRateDataParams {
  batchData: DailyHeartRateData[];
  userId: string;
}

interface MonthDataNeedResponse {
  monthlyExists: boolean;
}

interface CheckDataNeedParams {
  userId: string;
  startDate: string;
  endDate: string;
}

interface DataNeedResponse {
  dailyExists: boolean;
  weeklyExists: boolean;
  monthlyExists: boolean;
  yearlyExists: boolean;
}

const fetchDataFromHealthKit = async (
  options: FetchDataOptions,
): Promise<HealthValue[]> => {
  console.log('Fetching heart rate data from HealthKit:', options);
  return new Promise((resolve, reject) => {
    appleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      if (results === undefined) {
        resolve([]); // Return an empty array if no data is available
        return;
      }
      resolve(results as HealthValue[]);
    });
  });
};

const fetchInitialRecord = async (userId: string) => {
  try {
    const response = await HttpClient.get(
      `/api/health-kit/heart-rate/initial-record?userId=${userId}`,
    );
    console.log('Initial record fetched:', response);
    return response;
  } catch (error) {
    console.error('Error fetching initial record:', error);
    return null;
  }
};

const fetchTodaysData = async (
  userId: string,
): Promise<TodaysHeartRateData> => {
  try {
    const response: TodaysHeartRateData = await HttpClient.get(
      `/api/health-kit/heart-rate/today?userId=${userId}`,
    );
    console.log("Today's heart rate data fetched:", response);
    return response; // Directly return the fetched data
  } catch (error) {
    console.error("Error fetching today's heart rate data:", error);
    throw error; // Rethrow to handle it in the component or service layer
  }
};

const fetchAggregatedHeartRateData = async (
  userId: string,
): Promise<AggregatedHeartRateResponse | null> => {
  try {
    const url = `/api/health-kit/heart-rate/aggregated?userId=${userId}`;
    const response: AggregatedHeartRateResponse = await HttpClient.get(url);
    console.log('Aggregated heart rate data fetched successfully:', response);
    return response;
  } catch (error) {
    console.error('Error fetching aggregated heart rate data:', error);
    return null;
  }
};

const processHeartRateData = (
  rawHeartRateData: HealthValue[] | undefined,
): HeartRateSample[] => {
  if (!rawHeartRateData || rawHeartRateData.length === 0) {
    console.log('No heart rate data available.');
    return [];
  }
  try {
    const processedData: HeartRateSample[] = rawHeartRateData.map(data => {
      // Convert startDate to a Date object and validate
      const dateObject = new Date(data.startDate);
      if (isNaN(dateObject.getTime())) {
        throw new Error(`Invalid date encountered: ${data.startDate}`);
      }
      return {
        startDate: dateObject,
        value: Math.round(data.value), // Use Math.round to round the heart rate value
      };
    });
    return processedData;
  } catch (error) {
    console.error('Error processing heart rate data:', error);
    console.error('Raw heart rate data:', rawHeartRateData);
    return [];
  }
};

const fetchDailyHeartRateData = async (
  date: Date,
): Promise<HeartRateSample[]> => {
  const startDate = new Date(date.setHours(0, 0, 0, 0)).toISOString();
  const endDate = new Date(date.setHours(23, 59, 59, 999)).toISOString();

  try {
    const heartRateData = await fetchDataFromHealthKit({
      startDate,
      endDate,
      limit: 0,
    });

    if (!heartRateData) {
      console.log('No heart rate data available for the specified date.');
      return [];
    }

    return processHeartRateData(heartRateData);
  } catch (error) {
    console.error('Error fetching daily heart rate data:', error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

const processBatchData = batchData => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentData = [];
  const historicalData = [];

  batchData.forEach(day => {
    const dayDate = new Date(day.date);
    if (dayDate >= oneWeekAgo) {
      recentData.push(day);
    } else {
      historicalData.push({
        date: day.date,
        ...calculateStats(day.measurements),
      });
    }
  });

  return {recentData, historicalData};
};

const calculateStats = dayData => {
  const values = dayData.map(data => data.value);
  const average = values.reduce((acc, cur) => acc + cur, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  return {average, max, min};
};

const getLastUpdatedTimestamp = async userId => {
  try {
    // Assuming HttpClient.get returns a response with a data property containing the actual response body
    const response = await HttpClient.get(
      `/api/health-kit/heart-rate/last-updated?userId=${userId}`,
    );
    // Access the data property to get the lastUpdatedAt, if the structure is { data: { lastUpdatedAt: "..." } }
    return response.lastUpdatedAt;
  } catch (error) {
    console.error('Error fetching last updated timestamp:', error);
    return undefined;
  }
};

let isFetching = false;

const fetchHeartRate = async (userId: string) => {
  if (isFetching) {
    console.log('Fetch in progress. Exiting to prevent duplicates.');
    return;
  }
  isFetching = true;

  try {
    const lastUpdatedAt = await getLastUpdatedTimestamp(userId);
    console.log('Last updated timestamp:', lastUpdatedAt);
    const today = new Date();
    const yearAgo = new Date(today);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1); // Modify yearAgo to be one year ago from today

    const endDate = new Date(); // Set to the current moment

    // Set startDate based on lastUpdatedAt or one year ago from today if lastUpdatedAt is not available
    const startDate = lastUpdatedAt ? new Date(lastUpdatedAt) : yearAgo; // Start from last updated time or the epoch if no lastUpdatedAt available
    const batchData = [];
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    // Fetch data from the last update time to the current time
    while (startDate <= endDate) {
      const dayCopy = new Date(startDate);
      let dayData;
      try {
        dayData = await fetchDailyHeartRateData(dayCopy);
        console.log('Day Data:', dayData);

        // Check if dayData is valid before adding it to batchData
        if (dayData && dayData.length > 0) {
          batchData.push({
            date: dayCopy.toISOString(), // Using ISO string to ensure the timestamp is included
            measurements: dayData,
          });

          console.log('batchData:', batchData);
        } else {
          console.log('No heart rate data fetched for:', dayCopy.toISOString());
        }
      } catch (error) {
        console.error(
          'Error fetching heart rate data for',
          dayCopy.toISOString(),
          ':',
          error,
        );
        // Continue to the next day if an error occurs
        continue;
      }

      // Move to the next day unless it's today, then break to ensure current time accuracy
      let nextDay = new Date(startDate);
      nextDay.setHours(24, 0, 0, 0); // Set to the next day's start
      if (nextDay >= endDate) break;
      startDate.setDate(startDate.getDate() + 1);
    }

    // Send all collected data to the server if batchData is not empty
    if (batchData.length > 0) {
      await sendHeartRateData(batchData);
    } else {
      console.log('No valid heart rate data to send.');
    }
  } catch (error) {
    console.error('Error fetching or processing heart rate data:', error);
  } finally {
    isFetching = false;
  }
};

const sendHeartRateData = async batchData => {
  console.log('Entering sendHeartRateData function');
  for (const dayData of batchData) {
    const dataToSend = {
      userId: firebase.auth().currentUser?.uid,
      dayData, // send data for each day individually
    };

    try {
      console.log(`Sending day data to server: ${JSON.stringify(dataToSend)}`);
      const response = await HttpClient.post(
        '/api/health-kit/heart-rate',
        dataToSend,
      );
      console.log('Day data sent successfully:', response);
    } catch (error) {
      console.error('Error sending heart rate data for the day:', error);
      console.error(`Data that failed: ${JSON.stringify(dataToSend)}`);
    }
  }
};
const checkDataNeed = async ({
  userId,
  startDate,
  endDate,
}: CheckDataNeedParams): Promise<DataNeedResponse> => {
  try {
    const url = `/api/health-kit/heart-rate/data-existence?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
    const response: DataNeedResponse = await HttpClient.get(url);
    return response;
  } catch (error) {
    console.error('Error checking data need:', error);
    return {
      dailyExists: true,
      weeklyExists: true,
      monthlyExists: true,
      yearlyExists: true, // Default to true to ensure data integrity in case of error
    };
  }
};

export const HeartRateService = {
  fetchHeartRate,
  sendHeartRateData,
  fetchInitialRecord,
  fetchTodaysData,
};
