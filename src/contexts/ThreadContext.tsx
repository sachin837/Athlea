import React, {createContext, useContext, useState} from 'react';

// Create the context
const ThreadContext = createContext();

// Create a provider component
export const ThreadProvider = ({children}) => {
  const [savedThread, setSavedThread] = useState(null);

  // Function to update the selected thread
  const updateSavedThread = thread => {
    setSavedThread(thread);
  };

  return (
    <ThreadContext.Provider value={{savedThread, updateSavedThread}}>
      {children}
    </ThreadContext.Provider>
  );
};

// Custom hook to use the thread context
export const useThread = () => useContext(ThreadContext);
