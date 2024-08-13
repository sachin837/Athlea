import React, {createContext, useContext, useState} from 'react';

const TimeContext = createContext([]);

export const TimeSelectorProvider = ({children}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownOptions = ['Day', 'Week', 'Month', 'Year'];

  console.log('TimeSelectorProvider selectedTime:', selectedTime);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectDropdownOption = option => {
    setSelectedTime(option);
    setDropdownVisible(false); // Optionally close the dropdown when an option is selected
  };

  // Provide functions and state related to the dropdown
  return (
    <TimeContext.Provider
      value={{
        selectedTime,
        dropdownOptions,
        dropdownVisible,
        toggleDropdown,
        selectDropdownOption,
        setDropdownVisible,
        setSelectedTime,
      }}>
      {children}
    </TimeContext.Provider>
  );
};

// Custom hook for easy consumption of context
export const useTimeSelector = () => useContext(TimeContext);
