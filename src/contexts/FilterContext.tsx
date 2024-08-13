import React, {createContext, useState, useContext, useEffect} from 'react';

// Create the context with a default value
const FilterContext = createContext({
  filterType: 'Day',
  setFilterType: () => {},
  currentData: [],
});

// Custom hook for easy usage of the context
export const useFilter = () => useContext(FilterContext);

// Context provider component
export const FilterProvider = ({children}) => {
  const [filterType, setFilterType] = useState('Day');
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = dataSets[filterType];
    if (newData) {
      setData(newData);
    } else {
      // Handle the case where the filter type doesn't match any data set keys
      console.warn(`No data available for filter type: ${filterType}`);
    }
  }, [filterType]);
  return (
    <FilterContext.Provider value={{filterType, setFilterType, data}}>
      {children}
    </FilterContext.Provider>
  );
};

const dataSets = {
  Day: [
    {
      date: '2024-01-28T00:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T01:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T02:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T03:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T04:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T05:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T06:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T07:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T08:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T09:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T10:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T11:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T12:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T13:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T14:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T15:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T16:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T17:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T18:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T19:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T20:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T21:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T22:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-28T23:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T00:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T01:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T02:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T03:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T04:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T05:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T06:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T07:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T08:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T09:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T10:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
    {
      date: '2024-01-29T11:00:00',
      highlight: false,
      load: Math.floor(Math.random() * (160 - 80 + 1)) + 80,
    },
  ],
  Week: [
    {date: '2024-01-23', highlight: false, load: 105},
    {date: '2024-01-24', highlight: false, load: 128},
    {date: '2024-01-25', highlight: false, load: 92},
    {date: '2024-01-26', highlight: false, load: 140},
    {date: '2024-01-27', highlight: false, load: 115},
    {date: '2024-01-28', highlight: false, load: 152},
    {date: '2024-01-29', highlight: false, load: 100},
  ],
  Month: [
    {date: '2024-01-01', highlight: false, load: 105},
    {date: '2024-01-02', highlight: false, load: 128},
    {date: '2024-01-03', highlight: false, load: 92},
    {date: '2024-01-04', highlight: false, load: 140},
    {date: '2024-01-05', highlight: false, load: 115},
    {date: '2024-01-06', highlight: false, load: 152},
    {date: '2024-01-07', highlight: false, load: 100},
    {date: '2024-01-08', highlight: false, load: 110},
    {date: '2024-01-09', highlight: false, load: 120},
    {date: '2024-01-10', highlight: false, load: 135},
    {date: '2024-01-11', highlight: false, load: 142},
    {date: '2024-01-12', highlight: false, load: 123},
    {date: '2024-01-13', highlight: false, load: 118},
    {date: '2024-01-14', highlight: false, load: 130},
    {date: '2024-01-15', highlight: false, load: 140},
    {date: '2024-01-16', highlight: false, load: 115},
    {date: '2024-01-17', highlight: false, load: 108},
    {date: '2024-01-18', highlight: false, load: 105},
    {date: '2024-01-19', highlight: false, load: 110},
    {date: '2024-01-20', highlight: false, load: 130},
    {date: '2024-01-21', highlight: false, load: 135},
    {date: '2024-01-22', highlight: false, load: 125},
    {date: '2024-01-23', highlight: false, load: 115},
    {date: '2024-01-24', highlight: false, load: 128},
    {date: '2024-01-25', highlight: false, load: 92},
    {date: '2024-01-26', highlight: false, load: 140},
    {date: '2024-01-27', highlight: false, load: 115},
    {date: '2024-01-28', highlight: false, load: 152},
    {date: '2024-01-29', highlight: false, load: 100},
    {date: '2024-01-30', highlight: false, load: 120},
    {date: '2024-01-31', highlight: false, load: 130},
  ],
  Year: [
    {date: '2024-01-01', highlight: false, load: 105},
    {date: '2024-02-01', highlight: false, load: 128},
    {date: '2024-03-01', highlight: false, load: 92},
    {date: '2024-04-01', highlight: false, load: 140},
    {date: '2024-05-01', highlight: false, load: 115},
    {date: '2024-06-01', highlight: false, load: 152},
    {date: '2024-07-01', highlight: false, load: 100},
    {date: '2024-08-01', highlight: false, load: 110},
    {date: '2024-09-01', highlight: false, load: 120},
    {date: '2024-10-01', highlight: false, load: 135},
    {date: '2024-11-01', highlight: false, load: 142},
    {date: '2024-12-01', highlight: false, load: 123},
  ],
};
