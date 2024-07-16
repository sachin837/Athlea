import React, {createContext, useState, useContext, useEffect} from 'react';

const SwipeContext = createContext({
  swipeEnabled: true,
  setSwipeEnabled: () => {},
  currentPage: 0,
  setCurrentPage: () => {},
});

export const useSwipeContext = () => useContext(SwipeContext);

export const SwipeProvider = ({children}) => {
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Start at the center page

  useEffect(() => {
    // Enable swiping only when currentPage is 1
    setSwipeEnabled(currentPage === 1);
  }, [currentPage]); // Dependency on currentPage ensures this runs whenever currentPage changes

  return (
    <SwipeContext.Provider
      value={{swipeEnabled, setSwipeEnabled, currentPage, setCurrentPage}}>
      {children}
    </SwipeContext.Provider>
  );
};
