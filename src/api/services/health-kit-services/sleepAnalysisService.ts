import {Dispatch} from 'react';
import appleHealthKit, {HealthValue} from 'react-native-health';
import {
  SleepAnalysisResponse,
  SleepAnalysisState,
} from '../../../store/healthKit/sleepAnalysisSlice.ts';
import {firebase} from '@react-native-firebase/auth';
import HttpClient from '../../HttpClient.ts';

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

const processSleepAnalysisData = (
  data: HealthValue[],
): {categorizedData: CategorizedSleepData; sleepScore: number} => {
  let categorizedData: CategorizedSleepData = {
    INBED: 0,
    CORE: 0,
    REM: 0,
    DEEP: 0,
    AWAKE: 0,
    // Add any other categories you may have
  };

  data.forEach(sample => {
    const duration =
      new Date(sample.endDate).getTime() - new Date(sample.startDate).getTime();
    const durationHours = duration / (1000 * 60 * 60); // Convert duration from milliseconds to hours

    const sleepStage = sample.value; // e.g., "INBED", "CORE", "REM", "DEEP"

    // Check if sleepStage is a valid key of CategorizedSleepData
    if (categorizedData.hasOwnProperty(sleepStage)) {
      categorizedData[sleepStage] += durationHours;
    } else {
      console.log(`Unknown sleep stage: ${sleepStage}`);
    }
  });

  // Assuming you want to categorize ASLEEP as the sum of CORE, REM, and DEEP
  categorizedData.ASLEEP =
    categorizedData.CORE + categorizedData.REM + categorizedData.DEEP;

  categorizedData.AWAKE = categorizedData.AWAKE; // Assuming AWAKE is already in hours
  // Sleep score calculation can be defined as needed, here's a simple example:
  // Assuming sleep score is calculated as the percentage of ASLEEP time out of total INBED time.
  const sleepScore = (categorizedData.ASLEEP / categorizedData.INBED) * 100;

  // Ensuring sleep score is not over 100%
  const cappedSleepScore = sleepScore > 100 ? 100 : sleepScore;

  return {
    categorizedData,
    sleepScore: Math.round(cappedSleepScore), // Round to nearest whole number if needed
  };
};

const calculateAverageScore = async (days, periodStart) => {
  let totalScore = 0;
  console.log(
    'Calculating average score for',
    days,
    'days starting from',
    periodStart,
  );

  for (let i = 0; i < days; i++) {
    const dayStart = new Date(periodStart);
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const options = setupOptionsForFetch(dayStart, dayEnd, 0, true);
    // console.log(`Fetching sleep score for date: ${dayStart.toISOString()}`);

    const score = await fetchSleepScore(options); // Separate function to handle fetching and processing
    // console.log(`Score for ${dayStart.toISOString()}: ${score}`);
    totalScore += score;
  }
  // console.log(`Total score: ${totalScore}, Average: ${totalScore / days}`);
  return Math.round(totalScore / days);
};
const fetchSleepScore = async options => {
  try {
    const results = await new Promise((resolve, reject) => {
      appleHealthKit.getSleepSamples(options, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });

    if (!results || results.length === 0) {
      console.log('No sleep data available for', options.startDate);
      return 0; // Return 0 if no data is available
    }

    const {sleepScore} = processSleepAnalysisData(results);
    // console.log('Sleep score for', options.startDate, ':', sleepScore);
    return sleepScore;
  } catch (error) {
    console.error('Error in fetchSleepScore:', error);
    return 0; // Return 0 in case of error
  }
};

const calculateDeepSleepPercentage = async (days, periodStart) => {
  let totalDeepSleepPercentage = 0;

  for (let i = 0; i < days; i++) {
    const dayStart = new Date(periodStart);
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const options = {
      startDate: dayStart.toISOString(),
      endDate: dayEnd.toISOString(),
      limit: 0,
      ascending: true,
    };

    try {
      const results = await new Promise((resolve, reject) => {
        appleHealthKit.getSleepSamples(options, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      const {categorizedData} = processSleepAnalysisData(results);
      const deepSleepHours = categorizedData.DEEP;
      const totalSleepHours = categorizedData.ASLEEP;

      // Calculate deep sleep percentage for the day
      const deepSleepPercentage =
        totalSleepHours > 0 ? (deepSleepHours / totalSleepHours) * 100 : 0;
      totalDeepSleepPercentage += deepSleepPercentage;
    } catch (error) {
      console.error('Error calculating deep sleep percentage:', error);
    }
  }

  // Calculate the average deep sleep percentage over the period
  return Math.round(totalDeepSleepPercentage / days);
};

const calculateAverageInBedDuration = async (days, periodStart) => {
  let totalInBedDuration = 0;
  for (let i = 0; i < days; i++) {
    const dayStart = new Date(periodStart);
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const options = setupOptionsForFetch(dayStart, dayEnd, 0, true);

    const results = await new Promise((resolve, reject) => {
      appleHealthKit.getSleepSamples(options, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data); // Ensure resolve is called with data
      });
    });

    if (results && results.length > 0) {
      const {categorizedData} = processSleepAnalysisData(results);
      totalInBedDuration += categorizedData.INBED; // Add in-bed duration
    }
  }

  return Math.round(totalInBedDuration / days);
  // Return the average in-bed duration
};
const calculateSleepEfficiency = async (dayStart, dayEnd) => {
  const options = setupOptionsForFetch(dayStart, dayEnd, 0, true);

  const data = await new Promise((resolve, reject) => {
    appleHealthKit.getSleepSamples(options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  const {categorizedData} = processSleepAnalysisData(data);
  const inBedHours = categorizedData.INBED;
  const asleepHours = categorizedData.ASLEEP;

  console.log('In bed hours:', inBedHours);

  return inBedHours > 0 ? Math.round((asleepHours / inBedHours) * 100) : 0;
};

const fetchDaySleepData = async (dayStart: Date, dayEnd: Date) => {
  const options = setupOptionsForFetch(dayStart, dayEnd, 0, true);
  const data = await new Promise((resolve, reject) => {
    appleHealthKit.getSleepSamples(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

  return processSleepAnalysisData(data as HealthValue[]);
};

const buildSleepTrendObject = async (startDate, endDate) => {
  const options = setupOptionsForFetch(startDate, endDate, 0, true);
  const data = await new Promise((resolve, reject) => {
    appleHealthKit.getSleepSamples(options, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

  let sleepEvents = data.map(sample => ({
    stage: sample.value,
    startTime: new Date(sample.startDate).toISOString(),
    endTime: new Date(sample.endDate).toISOString(),
  }));

  // Here you may calculate the categorized data if needed
  // Or use a separate function to process and sum up durations for each category
  let categorizedData = {
    INBED: 0,
    CORE: 0,
    REM: 0,
    DEEP: 0,
    AWAKE: 0,
    // other categories if needed
  };

  // Sum up the total time for each sleep category
  sleepEvents.forEach(event => {
    const duration =
      new Date(event.endTime).getTime() - new Date(event.startTime).getTime();
    const durationHours = duration / (1000 * 60 * 60); // Convert ms to hours
    if (categorizedData.hasOwnProperty(event.stage)) {
      categorizedData[event.stage] += durationHours;
    } else {
      console.warn(`Unknown sleep stage: ${event.stage}`);
    }
  });

  console.log('Sleep events:', sleepEvents);

  // You may need to handle rounding or formatting of durations as appropriate

  return {
    date: startDate.toISOString().split('T')[0], // Only the date part
    sleepEvents: sleepEvents,
    categorizedData: categorizedData,
    // ... add sleepScore if you calculate it within this function
  };
};

const fetchLastRecordedInBedData = async () => {
  let searchAttempts = 0;
  const maxSearchAttempts = 10; // Limit to prevent infinite loops
  let lastEndDate = new Date();

  while (searchAttempts < maxSearchAttempts) {
    const options = {
      startDate: new Date(2020, 0, 1).toISOString(),
      endDate: lastEndDate.toISOString(),
      limit: 0, // Set to 0 to fetch all records
      ascending: false,
    };

    try {
      const results = await new Promise((resolve, reject) => {
        appleHealthKit.getSleepSamples(options, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });

      // Filter for 'INBED' intervals and sort them by endDate to find the last ones
      const inBedIntervals = results
        .filter(sample => sample.value === 'INBED')
        .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

      if (inBedIntervals.length > 0) {
        // Start with the last 'INBED' interval
        let combinedInBedTime =
          new Date(inBedIntervals[0].endDate) -
          new Date(inBedIntervals[0].startDate);
        let lastInBedEndTime = new Date(inBedIntervals[0].endDate);

        // Now check if the previous intervals are within 4 hours of the last one
        for (let i = 1; i < inBedIntervals.length; i++) {
          const intervalEndTime = new Date(inBedIntervals[i].endDate);
          const intervalStartTime = new Date(inBedIntervals[i].startDate);

          if (lastInBedEndTime - intervalEndTime <= 1 * 60 * 60 * 1000) {
            // Within 4 hours
            combinedInBedTime += intervalEndTime - intervalStartTime;
            lastInBedEndTime = intervalStartTime; // Update lastInBedEndTime if we are adding the interval
          } else {
            break; // No more intervals within 4 hours
          }
        }

        // Convert from milliseconds to hours and round to 2 decimal places
        const timeInBedHours = (combinedInBedTime / 3600000).toFixed(2);
        return timeInBedHours; // Now this is a string
      }

      // If no 'INBED' record found, reduce the end date by a day and try again
      lastEndDate.setDate(lastEndDate.getDate() - 1);
      searchAttempts++;
    } catch (error) {
      console.error('Error fetching in-bed data:', error);
      return 0; // In case of error, return 0 to maintain consistency
    }
  }

  console.log(
    'Reached maximum search attempts without finding an "INBED" record.',
  );
  return 0; // Return 0 if no 'INBED' record is found after max attempts
};

export const fetchSleepAnalysis = async (
  type: string,
  timeframe: string,
): Promise<SleepAnalysisResponse> => {
  // console.log(
  //   `Fetching sleep analysis for type: ${type}, timeframe: ${timeframe}`
  // );
  let options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ascending: true,
    limit: 0,
  };

  // Options setup based on the type
  switch (type) {
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
    case 'average-deep-sleep-percentage':
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
    case 'average-daily-score':
      // Add logic for handling this type
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
    case 'average-in-bed-duration':
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
    case 'categorized-sleep':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0; // Fetch all data for the week
      options.ascending = true;
      break;
    case 'sleep-scores':
      // Add logic for handling this type
      options.startDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      ).toISOString();
      options.limit = 0;
      break;
    case 'weekly-trend-sleep-score':
      // Add logic for handling this type
      options = setupOptionsForFetch(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
        0,
        true,
      );
      break;
    case 'weekly-score':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
    case 'sleep-efficiency':
      // Add logic for handling this type
      options = setupOptionsForFetch(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(),
        0,
        true,
      );
      break;
    case 'weekly-sleep-efficiency':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
    case 'two-week-sleep-score':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 14),
      ).toISOString();
      options.limit = 0;
      break;
    case 'weekly-trend':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
    case 'deep-sleep-percentage':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
    case 'sleep-efficiency':
      options.startDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      ).toISOString();
      options.limit = 0;
      break;
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getSleepSamples(options, async (err, results) => {
      if (err) {
        reject(err);
      } else {
        let processedData: SleepAnalysisState = {};
        switch (type) {
          case 'monthly-trend-sleep-score':
            const monthlyScores = [];
            const today = new Date();
            const daysInLastMonth = new Date(
              today.getFullYear(),
              today.getMonth(),
              0,
            ).getDate();

            for (let i = daysInLastMonth - 1; i >= 0; i--) {
              const day = new Date();
              day.setDate(day.getDate() - i);
              const startOfDay = new Date(day.setHours(0, 0, 0, 0));
              const endOfDay = new Date(day.setHours(23, 59, 59, 999));

              const options = setupOptionsForFetch(
                startOfDay,
                endOfDay,
                0,
                true,
              );

              try {
                const data = await new Promise((resolve, reject) => {
                  appleHealthKit.getSleepSamples(options, (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });

                const {sleepScore} = processSleepAnalysisData(data);
                monthlyScores.push(
                  isNaN(sleepScore) ? 0 : Math.round(sleepScore),
                );
              } catch (error) {
                console.error('Error fetching data for:', startOfDay, error);
                monthlyScores.push(0); // Add 0 for days with error
              }
            }

            processedData.monthlyTrendSleepScore = monthlyScores;
            break;
          case 'weekly-score': {
            let totalScore = 0;
            let daysCounted = 0;

            for (let i = 6; i >= 0; i--) {
              const day = new Date();
              day.setDate(day.getDate() - i);
              const startOfDay = new Date(day.setHours(0, 0, 0, 0));
              const endOfDay = new Date(day.setHours(23, 59, 59, 999));

              const options = setupOptionsForFetch(
                startOfDay,
                endOfDay,
                0,
                true,
              );

              try {
                const data = await new Promise((resolve, reject) => {
                  appleHealthKit.getSleepSamples(options, (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });

                const {sleepScore} = processSleepAnalysisData(data);
                totalScore += sleepScore;
                daysCounted++;
              } catch (error) {
                console.error('Error fetching data for:', startOfDay, error);
                // Optionally handle errors or skip day's score
              }
            }

            const averageWeeklyScore =
              daysCounted > 0 ? totalScore / daysCounted : 0;

            const roundedAverageWeeklyScore = Math.round(averageWeeklyScore);
            processedData.weeklyScore = roundedAverageWeeklyScore;
            break;
          }
          case 'average-in-bed-duration':
            processedData.averageInBedDuration =
              await calculateAverageInBedDuration(
                30, // for a month
                new Date(new Date().setDate(1)), // Start from the first day of the current month
              );
            break;
          case 'average-deep-sleep-percentage':
            options = setupOptionsForFetch(
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date(),
              0,
              true,
            );
            processedData.deepSleepPercentage =
              await calculateDeepSleepPercentage(
                30,
                new Date(new Date().setMonth(new Date().getMonth() - 1)),
              );
            break;
          case 'average-daily-score':
            options = setupOptionsForFetch(
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date(),
              0,
              true,
            );
            processedData.dailyScore = await calculateAverageScore(
              30,
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
            );
            break;
          case 'weekly-trend-sleep-score':
            const weeklyScores = [];
            for (let i = 6; i >= 0; i--) {
              const day = new Date();
              day.setDate(day.getDate() - i);
              const startOfDay = new Date(day.setHours(0, 0, 0, 0));
              const endOfDay = new Date(day.setHours(23, 59, 59, 999));

              const options = setupOptionsForFetch(
                startOfDay,
                endOfDay,
                0,
                true,
              );

              try {
                const data = await new Promise((resolve, reject) => {
                  appleHealthKit.getSleepSamples(options, (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });

                const {sleepScore} = processSleepAnalysisData(data);
                weeklyScores.push(Math.round(sleepScore));
              } catch (error) {
                console.error('Error fetching data for:', startOfDay, error);
                weeklyScores.push(0); // Add 0 for days with error
              }
            }
            processedData.weeklyTrendSleepScore = weeklyScores;
            break;
          case 'weekly-sleep-efficiency':
            const weeklyEfficiencyScores = [];
            for (let i = 6; i >= 0; i--) {
              const day = new Date();
              day.setDate(day.getDate() - i);
              const startOfDay = new Date(day.setHours(0, 0, 0, 0));
              const endOfDay = new Date(day.setHours(23, 59, 59, 999));

              try {
                const efficiencyScore = await calculateSleepEfficiency(
                  startOfDay,
                  endOfDay,
                );
                weeklyEfficiencyScores.push(efficiencyScore);
              } catch (error) {
                console.error(
                  'Error calculating sleep efficiency for:',
                  startOfDay,
                  error,
                );
                weeklyEfficiencyScores.push(0); // Add 0 for days with errors
              }
            }
            const averageWeeklyEfficiency =
              weeklyEfficiencyScores.reduce((a, b) => a + b, 0) /
              weeklyEfficiencyScores.length;

            const roundedAverageWeeklyEfficiency = Math.round(
              averageWeeklyEfficiency,
            );
            processedData.weeklySleepEfficiency =
              roundedAverageWeeklyEfficiency;
            break;
          case 'yesterday': {
            const yesterdayStart = new Date();
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            yesterdayStart.setHours(0, 0, 0, 0); // Start of yesterday

            const yesterdayEnd = new Date(yesterdayStart);
            yesterdayEnd.setHours(23, 59, 59, 999); // End of yesterday

            processedData.yesterday = await buildSleepTrendObject(
              yesterdayStart,
              yesterdayEnd,
            );
            resolve(processedData);
            break;
          }
          case 'two-week-sleep-score':
            let sleepScores = [];

            for (let i = 13; i >= 0; i--) {
              const day = new Date();
              day.setDate(day.getDate() - i);
              const startOfDay = new Date(day.setHours(0, 0, 0, 0));
              const endOfDay = new Date(day.setHours(23, 59, 59, 999));

              const options = setupOptionsForFetch(
                startOfDay,
                endOfDay,
                0,
                true,
              );

              try {
                const data = await new Promise((resolve, reject) => {
                  appleHealthKit.getSleepSamples(options, (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });

                const {sleepScore} = processSleepAnalysisData(data);
                sleepScores.push(Math.round(sleepScore));
              } catch (error) {
                console.error('Error fetching data for:', startOfDay, error);
                sleepScores.push(0); // Add 0 for days with errors
              }
            }

            // Return an array of the last 14 sleep scores
            sleepScores = sleepScores.slice(-14);

            processedData.twoWeekSleepScore = sleepScores;
            break;
          case 'yesterdaySleepScore':
            const yesterdayStart = new Date();
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            yesterdayStart.setHours(0, 0, 0, 0); // Start of yesterday

            const yesterdayEnd = new Date(yesterdayStart);
            yesterdayEnd.setHours(23, 59, 59, 999); // End of yesterday

            options = setupOptionsForFetch(
              yesterdayStart,
              yesterdayEnd,
              0,
              true,
            );

            try {
              const scoreResults = await fetchSleepScore(options); // await the async call
              processedData.yesterdaySleepScore = scoreResults; // you might want to rename this to clarify it's the score
            } catch (error) {
              console.error('Error fetching score for yesterday:', error);
            }
            break;
          case 'last-recorded':
            const lastRecordedSleepData = await fetchLastRecordedInBedData();
            processedData.lastRecorded = lastRecordedSleepData;
            break;
        }
        resolve(processedData);
      }
    });
  });
};

const sendSleepAnalysisData = async (sleepAnalysisData: SleepAnalysisState) => {
  try {
    const dataToSend = {
      ...sleepAnalysisData,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    };
    const response = await HttpClient.post(
      '/api/health-kit/sleep-analysis-data',
      dataToSend,
    );
    console.log('Resting heart rate data sent successfully');
  } catch (error) {
    console.log('Error sending resting heart rate data', error);
  }
};

const fetchAllSleepData = async () => {
  const timeFrames = [
    {type: 'categorized-sleep', key: 'categorizedSleepAnalysis'},
    {type: 'monthly-trend-sleep-score', key: 'monthlyTrendSleepScore'},
    {type: 'weekly-trend-sleep-score', key: 'weeklyTrendSleepScore'},
    {type: 'average-daily-score', key: 'dailyScore'},
    {type: 'average-deep-sleep-percentage', key: 'deepSleepPercentage'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'average-in-bed-duration', key: 'averageInBedDuration'},
    {type: 'weekly-score', key: 'weeklyScore'},
    {type: 'weekly-sleep-efficiency', key: 'weeklySleepEfficiency'},
    {type: 'two-week-sleep-score', key: 'twoWeekSleepScore'},
    {type: 'yesterdaySleepScore', key: 'yesterdaySleepScore'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ];

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchSleepAnalysis(type, 'day').then(result => ({key, result})),
    );

    const results = await Promise.all(fetchPromises);

    let processedData = {
      error: null,
      loading: false,
      categorizedSleepAnalysis: undefined,
      monthlyTrendSleepScore: [],
      weeklyTrendSleepScore: [],
      dailyScore: undefined,
      deepSleepPercentage: undefined,
      yesterday: undefined,
      averageInBedDuration: null,
      weeklyScore: null,
      weeklySleepEfficiency: null,
      twoWeekSleepScore: [],
      yesterdaySleepScore: null,
      lastRecorded: null,
    };

    results.forEach(({key, result}) => {
      if (
        ['monthlyTrendSleepScore', 'weeklyTrendSleepScore', 'twoWeekSleepScore']
      ) {
        processedData[key] = result[key] || [];
      } else if (
        key === 'dailyScore' ||
        key === 'deepSleepPercentage' ||
        key === 'averageInBedDuration' ||
        key === 'weeklyScore' ||
        key === 'weeklySleepEfficiency' ||
        key === 'yesterdaySleepScore' ||
        key === 'lastRecorded'
      ) {
        // Directly assign the value for 'lastRecordedSleepData' and 'weeklySleepData' without wrapping it in an object.
        processedData[key] = result.hasOwnProperty(key) ? result[key] : result;
      } else {
        // For data that might be structured (not a simple array or single value), ensure to spread or process accordingly
        processedData[key] = {...result[key]};
      }
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching all sleep data:', error);
    throw new Error('Failed to fetch all sleep data');
  }
};

export const SleepAnalysisService = {
  fetchSleepAnalysis,
  sendSleepAnalysisData,
  fetchAllSleepData,
};
