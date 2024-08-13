import {Dispatch} from 'react'
import appleHealthKit, {HealthValue} from 'react-native-health'
import {DispatchProp} from 'react-redux'
import {RestingHeartRateResponse} from '../../../store/healthKit/restingHeartRateSlice.ts'
import {RestingHeartRateState} from '../../../store/healthKit/restingHeartRateSlice.ts'
import {average} from '../../../utils/formattedString'
import {isDataValid} from '../../../utils/dataValidation'
import {firebase} from '@react-native-firebase/auth'
import HttpClient from '../../HttpClient.ts'

const roundTo = (num, decimals) => parseFloat(num.toFixed(decimals))

const calculateStatistics = (
  data: HealthValue[],
): {average: number; min: number; max: number} => {
  const values = data.map(item => item.value)
  if (values.length === 0) {
    return {average: 0, min: 0, max: 0}
  }
  const sum = values.reduce((a, b) => a + b, 0)
  const average = parseFloat((sum / values.length).toFixed(2))
  const min = parseFloat(Math.min(...values).toFixed(2))
  const max = parseFloat(Math.max(...values).toFixed(2))
  return {
    average,
    min,
    max,
  }
}

const getPastFourWeeksDates = () => {
  const dates = []
  let currentDate = new Date()
  for (let i = 0; i < 4; i++) {
    const endOfWeek = new Date(currentDate)
    endOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay() + (i === 0 ? 0 : 1),
    )
    const startOfWeek = new Date(endOfWeek)
    startOfWeek.setDate(endOfWeek.getDate() - 6)
    dates.push({start: startOfWeek, end: endOfWeek})
    currentDate = new Date(startOfWeek)
  }
  return dates
}

const calculateWeeklyTotal = async (startDate, endDate) => {
  try {
    // Convert to ISO string directly
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 0,
      ascending: true,
    }

    console.log('Options for weekly total:', options) // Additional logging
    const results = await fetchDataFromHealthKit(options)
    if (!results) {
      throw new Error('No data fetched')
    }
    const total = calculateStatistics(results).average
    return roundTo(total, 2)
  } catch (error) {
    console.error('Error in calculateWeeklyTotal:', error)
    return 0
  }
}

const fetchDataFromHealthKit = async options => {
  return new Promise((resolve, reject) => {
    appleHealthKit.getRestingHeartRateSamples(options, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      resolve(results as HealthValue[])
    })
  })
}

const processRestingHeartRateData = (results, days) => {
  let trendData = []
  for (let i = 0; i < days; i++) {
    const dayStart = new Date()
    dayStart.setDate(dayStart.getDate() - i)
    dayStart.setHours(0, 0, 0, 0)

    const dayEnd = new Date()
    dayEnd.setDate(dayEnd.getDate() - i)
    dayEnd.setHours(23, 59, 59, 999)

    const dayData = results.filter(item => {
      const itemDate = new Date(item.startDate)
      return itemDate >= dayStart && itemDate <= dayEnd
    })

    const dayMax =
      dayData.length > 0 ? Math.max(...dayData.map(item => item.value)) : 0
    trendData.unshift(dayMax)
  }
  return trendData
}

const processWeeklyTrendData = results => {
  let trendData = []
  for (let i = 0; i < 7; i++) {
    const dayStart = new Date()
    dayStart.setDate(dayStart.getDate() - i)
    dayStart.setHours(0, 0, 0, 0)

    const dayEnd = new Date()
    dayEnd.setDate(dayEnd.getDate() - i)
    dayEnd.setHours(23, 59, 59, 999)

    const dayData = results.filter(item => {
      const itemDate = new Date(item.startDate)
      return itemDate >= dayStart && itemDate <= dayEnd
    })

    const dayAverage = average(dayData.map(item => item.value))
    trendData.unshift(dayAverage)
  }
  return trendData
}

const getRestingHeartRateForDate = async (date: string): Promise<number> => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0) // Set to start of the day
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999) // Set to end of the day

  const options = {
    startDate: startOfDay.toISOString(),
    endDate: endOfDay.toISOString(),
    ascending: false, // Get the most recent data first
    limit: 1, // Only need the most recent data
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getRestingHeartRateSamples(options, (err, results) => {
      if (err) {
        console.error('HealthKit Error:', err)
        reject(err)
      } else {
        console.log('HealthKit Results for date', date, ':', results)
        resolve(results.length > 0 ? results[0].value : 0)
      }
    })
  })
}

const fetchRestingHeartRate = async (
  type: string,
  timeframe: string,
): Promise<RestingHeartRateResponse> => {
  let options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ascending: true,
    limit: 0,
  }

  switch (type) {
  case 'last-recorded':
    break
  case 'weekly-trend':
    options.startDate = new Date(
      new Date().setDate(new Date().getDate() - 7),
    ).toISOString()
    options.limit = 0 // Fetch all data for the week
    options.ascending = true
    break
  case 'monthly-trend':
    options.startDate = new Date(
      new Date().setMonth(new Date().getMonth() - 1),
    ).toISOString()
    options.limit = 0
    break
  case 'weekly':
    options.startDate = new Date(
      new Date().setDate(new Date().getDate() - 7),
    ).toISOString()
    options.limit = 0 // Fetch all data for the week
  case 'monthly':
    options.startDate = new Date(
      new Date().setDate(new Date().getDate() - 30),
    ).toISOString()
    options.limit = 0 // Fetch all data for the month
    break
  case 'today':
    options.startDate = new Date(
      new Date().setHours(0, 0, 0, 0),
    ).toISOString()
    options.limit = 0 // Fetch all data for the day
    break
  case 'yesterday':
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    options.startDate = new Date(
      yesterday.setHours(0, 0, 0, 0),
    ).toISOString()
    options.endDate = new Date(
      yesterday.setHours(23, 59, 59, 999),
    ).toISOString()
    options.limit = 0
    break
    // ... [other cases if needed]
  }

  return new Promise((resolve, reject) => {
    appleHealthKit.getRestingHeartRateSamples(options, async (err, results) => {
      if (err) {
        reject(err)
      } else {
        let processedData: RestingHeartRateState = {}
        switch (type) {
        case 'last-recorded':
          console.log('Fetching last recorded heart rate')
          try {
            const lastRecordedRate = await getRestingHeartRateForDate(
              new Date().toISOString(),
            )
            console.log('Last recorded rate:', lastRecordedRate)
            processedData.lastRecorded = lastRecordedRate
          } catch (error) {
            console.error('Error getting last recorded heart rate:', error)
            processedData.lastRecorded = 0
          }
          break
        case 'weekly':
          const weeklyStatistics = calculateStatistics(results).average
          processedData.weekly = weeklyStatistics
          break
        case 'weekly-trend':
          const weeklyRestingHeartRates = processWeeklyTrendData(results)
          processedData.weeklyTrend = weeklyRestingHeartRates
          break
        case 'monthly-trend': {
          try {
            const fourWeeksDates = getPastFourWeeksDates()
            const weeklyTotals = await Promise.all(
              fourWeeksDates.map(async ({start, end}) => {
                try {
                  const total = await calculateWeeklyTotal(start, end)
                  return total
                } catch (error) {
                  console.error(
                    'Error processing weekly total for range',
                    {start, end},
                    error,
                  )
                  return 0 // Return 0 in case of an individual range error
                }
              }),
            )
            processedData.monthlyTrend = weeklyTotals
          } catch (error) {
            console.error('Error in processing monthly-trend:', error)
            // Handle the overall error
          }
          break
        }
        case 'monthly':
          const monthlyStatistics = calculateStatistics(results)
          processedData.monthly = monthlyStatistics
          break
        case 'today':
          const statistics = calculateStatistics(results)
          processedData.today = statistics
          break
        case 'yesterday':
          const yesterdayStatistics = calculateStatistics(results)
          processedData.yesterday = yesterdayStatistics
          break
        }
        resolve(processedData)
      }
    })
  })
}

const sendRestingHeartRateData = async (
  restingHeartRateData: RestingHeartRateState,
) => {
  try {
    const dataToSend = {
      ...restingHeartRateData,
      date: new Date().toISOString(),
      userId: firebase.auth().currentUser.uid,
    }
    const response = await HttpClient.post(
      '/api/health-kit/resting-heart-rate',
      dataToSend,
    )
    console.log('Resting heart rate data sent successfully', response)
  } catch (error) {
    console.log('Error sending resting heart rate data', error)
  }
}

const fetchAllRestingHeartRateData = async () => {
  const timeFrames = [
    {type: 'today', key: 'today'},
    {type: 'yesterday', key: 'yesterday'},
    {type: 'weekly-trend', key: 'weeklyTrend'},
    {type: 'monthly', key: 'monthly'},
    {type: 'monthly-trend', key: 'monthlyTrend'},
    {type: 'weekly', key: 'weekly'},
    {type: 'last-recorded', key: 'lastRecorded'},
  ]

  try {
    const fetchPromises = timeFrames.map(({type, key}) =>
      fetchRestingHeartRate(type, 'day').then(result => ({key, result})),
    )

    const results = await Promise.all(fetchPromises)

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
    }

    results.forEach(({key, result}) => {
      if (key === 'monthlyTrend' || key === 'weeklyTrend') {
        processedData[key] = result[key] || []
      } else if (key === 'lastRecorded' || key === 'weekly') {
        // Directly assign the value for 'lastRecorded' and 'weekly' without wrapping it in an object.
        processedData[key] = result.hasOwnProperty(key) ? result[key] : result
      } else {
        processedData[key] = {...result[key]}
      }
    })

    return processedData
  } catch (error) {
    console.error('Error fetching all heart rate data:', error)
    throw new Error('Failed to fetch all heart rate data')
  }
}

export const RestingHeartRateService = {
  fetchRestingHeartRate,
  sendRestingHeartRateData,
  fetchAllRestingHeartRateData,
}
