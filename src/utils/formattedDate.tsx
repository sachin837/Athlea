const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const monthShortNameList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/*
 ** Original: Wed Mar 25 2015 05:30:00 GMT+0530 (India Standard Time)
 ** Result: 2015-03-25
 */
export const ConvertDateIOSlStringToDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const dateNumber = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${dateNumber}`;
};

/*
 ** Original: 2015-03-25
 ** Result: WEDNESDAY, MAR 25
 */
export const ConvertSelectedDateToDateString = (
  selectedDate: string,
): string => {
  const date = new Date(selectedDate);
  const dateNumber = date.getUTCDate();
  const monthShortName = monthShortNameList[date.getUTCMonth()];
  const dayName = days[date.getUTCDay()];

  return `${dayName.toUpperCase()}, ${monthShortName.toUpperCase()} ${dateNumber}`;
};

/*
 ** Original: 2015-03-25
 ** Result: 25/03/2015 (DD/MM/YYYY)
 */
export const ConvertSelectedDateToDateNumber = (
  selectedDate: string,
): string => {
  const date = new Date(selectedDate);
  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const dateNumber = day < 10 ? `0${day}` : day;
  return `${dateNumber}/${month}/${year}`;
};

export const getLabelsForPastWeek = (): string[] => {
  let labels = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    let pastDay = new Date();
    pastDay.setDate(today.getDate() - i);
    labels.push(days[pastDay.getDay()]);
  }

  return labels;
};

export const getLabelsForPastSixWeeks = (): string[] => {
  const labels = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    // Calculate the start and end dates of each week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() - i * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Format the dates
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const monthShortName = monthShortNameList[endOfWeek.getMonth()]; // Using monthShortNameList from your file

    // Include a line break for multiline label
    const label = `${startDay}-${endDay}\n${monthShortName.toUpperCase()}`;
    labels.unshift(label); // Add the label at the beginning of the array
  }

  return labels;
};

export const getLabelsForPastTwoMonths = (): string[] => {
  const labels = [];
  const currentDate = new Date();

  for (let i = 7; i >= 0; i--) {
    // Looping for 8 weeks
    // Calculate the start and end dates of each week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() - i * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Format the dates
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const monthShortNameStart = monthShortNameList[startOfWeek.getMonth()];
    const monthShortNameEnd = monthShortNameList[endOfWeek.getMonth()];

    // Handle the case where the start and end of the week are in different months
    let label;
    if (monthShortNameStart === monthShortNameEnd) {
      label = `${startDay}-${endDay} ${monthShortNameEnd.toUpperCase()}`;
    } else {
      label = `${startDay} ${monthShortNameStart.toUpperCase()}-${endDay} ${monthShortNameEnd.toUpperCase()}`;
    }

    labels.unshift(label); // Add the label at the beginning of the array
  }

  return labels;
};

export const getLabelsForPastTwoWeeks = (): string[] => {
  const labels = [];
  const today = new Date();

  for (let i = 13; i >= 0; i--) {
    // Loop backwards for 14 days
    let pastDay = new Date();
    pastDay.setDate(today.getDate() - i); // Set to i days ago
    const dayLabel = days[pastDay.getDay()];
    const dateLabel = `${pastDay.getDate()}/${pastDay.getMonth() + 1}`; // Format as 'date/month'
    labels.push(`${dayLabel} ${dateLabel}`); // Combine day name and date
  }

  return labels;
};

export const getLabelsForPastMonth = (): string[] => {
  const labels = [];
  const currentDate = new Date();

  for (let i = 3; i >= 0; i--) {
    // Calculate the start and end dates of each week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() - i * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Format the dates
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const monthShortName = monthShortNameList[endOfWeek.getMonth()]; // Using monthShortNameList from your file

    // Include a line break for multiline label
    const label = `${startDay}-${endDay}\n${monthShortName.toUpperCase()}`;
    labels.unshift(label); // Add the label at the beginning of the array
  }

  return labels.reverse();
};
