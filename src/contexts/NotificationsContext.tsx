// Create a file named NotificationsContext.js
import React, {createContext, useState, useContext} from 'react';

const NotificationsContext = createContext(false);

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({children}) => {
  const [isNotificationsVisible, setNotificationsVisible] = useState(false);

  return (
    <NotificationsContext.Provider
      value={{isNotificationsVisible, setNotificationsVisible}}>
      {children}
    </NotificationsContext.Provider>
  );
};
