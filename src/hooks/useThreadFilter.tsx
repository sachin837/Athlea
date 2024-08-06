import {useState} from 'react';

export const useThreadFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Define the filterThreads function within the hook
  const filterThreads = threads => {
    // If no filter is selected, return all threads
    if (!selectedFilter) return threads;

    // Otherwise, return threads that match the selected filter
    return threads.filter(thread =>
      thread.categories?.includes(selectedFilter),
    );
  };

  // Return the state, setter, and filtering function from the hook
  return {selectedFilter, setSelectedFilter, filterThreads};
};
