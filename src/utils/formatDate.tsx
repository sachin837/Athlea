// Define a function that formats the last updated timestamp
export function formatLastUpdated(lastUpdatedTimestamp: number): string {
  const now = new Date();
  const lastUpdated = new Date(lastUpdatedTimestamp);

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerWeek = 7 * msPerDay;

  // Calculate the difference in milliseconds
  const timeDiff = now.getTime() - lastUpdated.getTime();

  // Format the time if it's today
  if (timeDiff < msPerDay && now.getDate() === lastUpdated.getDate()) {
    return formatDateAsTime(lastUpdated); // return as '08:05 AM'
  }

  // If it was yesterday
  const yesterday = new Date(now.getTime() - msPerDay);
  if (yesterday.getDate() === lastUpdated.getDate()) {
    return 'Yesterday';
  }

  // If it was within the last week
  for (let i = 2; i <= 7; i++) {
    const dayCheck = new Date(now.getTime() - i * msPerDay);
    if (dayCheck.getDate() === lastUpdated.getDate()) {
      return formatDateAsDayOfWeek(lastUpdated); // return as 'Monday'
    }
  }

  // If it was within the last two weeks
  if (timeDiff < 2 * msPerWeek) {
    return '1 week ago';
  }

  // If it was within the last month
  if (now.getMonth() !== lastUpdated.getMonth()) {
    return '2 weeks ago';
  }

  // If it was longer than last month
  if ((now.getMonth() + 11) % 12 === lastUpdated.getMonth()) {
    return '1 month ago';
  }

  return formatDateAsDayMonth(lastUpdated); // return as '6 Apr'
}

// Helper function to format date as time
function formatDateAsTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Helper function to format date as the day of the week
function formatDateAsDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-US', {weekday: 'long'});
}

// Helper function to format date as day and month
function formatDateAsDayMonth(date: Date): string {
  return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short'});
}
