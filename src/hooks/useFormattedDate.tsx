// useFormattedDate.js
import {parseISO, formatDistanceToNow} from 'date-fns';

const useFormattedDate = dateString => {
  try {
    const date = parseISO(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return formatDistanceToNow(date, {addSuffix: true});
  } catch (error) {
    console.error(error);
    // Return a default formatted current date if dateString is invalid
    return formatDistanceToNow(new Date(), {addSuffix: true});
  }
};

export default useFormattedDate;
