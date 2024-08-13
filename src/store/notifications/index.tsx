import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

interface NotificationMessage {
  boldPart: string;
  normalPart: string;
}

interface LogEntry {
  id: string;
  message: NotificationMessage;
  type: string;
  deviceType: string;
  timestamp: string;
}

interface NotificationState {
  message: NotificationMessage;
  type: string;
  isVisible: boolean;
  log: LogEntry[];
}

const initialState: NotificationState = {
  message: {boldPart: '', normalPart: ''},
  type: 'info', // Default notification type
  isVisible: false,
  log: [], // Logs of all notifications
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: NotificationMessage;
        type?: string;
        deviceType?: string;
      }>,
    ) => {
      const {message, type, deviceType} = action.payload;
      state.message = message;
      state.type = type || 'info';
      state.isVisible = true;
      state.log.push({
        id: nanoid(),
        message: message,
        type: type || 'info',
        deviceType: deviceType || '',
        timestamp: new Date().toISOString(),
      });
    },
    hideNotification: state => {
      state.isVisible = false;
    },
  },
});

// Export the action creators
export const {showNotification, hideNotification} = notificationSlice.actions;

// Export the reducer
export default notificationSlice.reducer;
