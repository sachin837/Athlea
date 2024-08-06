import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const NotificationListener = () => {
  const notification = useSelector(state => state.notification);

  useEffect(() => {
    if (notification.isVisible) {
      // Display the custom toast based on the notification type
      Toast.show({
        type: notification.type, // Use the notification type from your Redux state
        props: {message: notification.message}, // Pass props expected by CustomToast
      });

      // Add logic to hide the notification in Redux state if necessary
    }
  }, [notification]);

  return null; // This component doesn't render anything by itself
};

export default NotificationListener;
