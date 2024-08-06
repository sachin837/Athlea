// useFormattedDate.js
import {format} from 'date-fns';

const useDate = (dateString = new Date()) => {
  try {
    // If dateString is not provided, new Date() creates a Date object for the current date and time.
    const date =
      typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    // Format the date to "Month Day, Year", e.g., "January 17th, 2024"
    return format(date, 'MMMM do, yyyy');
  } catch (error) {
    console.error(error);
    // Return a default formatted current date if dateString is invalid or not provided
    return format(new Date(), 'MMMM do, yyyy');
  }
};

export default useDate;
