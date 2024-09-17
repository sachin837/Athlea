import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface NotificationItem {
  title: string;
  description: string;
}

interface UserNotifications {
  [date: string]: NotificationItem[];
}

interface NotificationState {
  user_notifications: UserNotifications;
}

const initialState: NotificationState = {
  user_notifications: {},
}

export const loadNotifications = createAsyncThunk<UserNotifications, string>(
  'notification/usernotifications',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/notifications?user_id=${userId}`)
      console.log('notification response', response.data)
      return response.data.user_notifications
    } catch (error) {
      console.error('Failed to load notifications from backend:', error)
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<UserNotifications>) {
      state.user_notifications = {
        ...state.user_notifications,
        ...action.payload,
      }
    },
    addSingleNotification(state, action: PayloadAction<NotificationItem>) {
      const currentDate = new Date().toLocaleDateString()
      if (!state.user_notifications[currentDate]) {
        state.user_notifications[currentDate] = []
      }
      state.user_notifications[currentDate].push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNotifications.fulfilled, (state, action) => {
      state.user_notifications = action.payload
    })
  },
})

export const { addNotification, addSingleNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
