import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import  { AppDispatch, RootState } from 'store'
import { loadNotifications } from 'store'
import Toast from 'react-native-toast-message'

// Define a type for the dispatch function

// Define a type for the thunkAPI parameter
interface ThunkAPI {
  getState: () => RootState;
  dispatch: AppDispatch;
}

// Thunk to save tasks to the backend
export const saveTasks = createAsyncThunk<
  { [date: string]: { AM: Task[]; PM: Task[] } },
  string,
  {
    state: RootState;
  }
>('calendar/saveTasks', async (userId: string, thunkAPI) => {
  const { tasks } = thunkAPI.getState().calendar
  try {
    const response = await axios.post(`/api/calendar?user_id=${userId}`, {
      tasks,
    })
    return response.data.tasks
  } catch (error) {
    console.error('Failed to save tasks to backend:', error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const addTasksThunk = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('calendar/addTasksThunk', async (userId, thunkAPI) => {
  const state = thunkAPI.getState().calendar
  if (state.tempTaskText) {
    const newTasks = state.selectedDates.map((dateObj) => ({
      id: uuidv4(),
      text: state.tempTaskText as string,
      date: dateObj.date,
      slot: dateObj.slot,
    }))

    try {
      await axios.post(`/api/calendar?user_id=${userId}`, { tasks: newTasks })
      thunkAPI.dispatch(addTasksLocally(newTasks))
      Toast.show({type:'success',props: {message:'You have added one task'}})
      await thunkAPI.dispatch(loadNotifications(userId)).unwrap()
    } catch (error) {
      console.error('Failed to add tasks:', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
})

export const loadTasks = createAsyncThunk<
  { [date: string]: { AM: Task[]; PM: Task[] } },
  string
>('calendar/loadTasks', async (userId: string, thunkAPI) => {
  try {
    const response = await axios.get(`/api/calendar?user_id=${userId}`)
    return response.data.tasks
  } catch (error) {
    console.error('Failed to load tasks from backend:', error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteTaskFromServer = createAsyncThunk<
  void,
  {
    userId: string;
    date: string;
    slot: 'AM' | 'PM';
    taskId: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('calendar/deleteTaskFromServer', async (payload, thunkAPI) => {
  const { userId, date, slot, taskId } = payload
  try {
    const response = await axios.delete(
      `/api/calendar?user_id=${userId}&taskId=${taskId}`,
    )
    if (response.status === 200) {
      thunkAPI.dispatch(deleteTask({ date, slot, taskId }))
    } else {
      throw new Error('Failed to delete task')
    }
  } catch (error) {
    console.error('Failed to delete task from backend:', error)
    return thunkAPI.rejectWithValue(error)
  }
})

interface Task {
  id: string;
  text: string;
}

export interface CalendarState {
  isOpen: boolean;
  tasks: { [date: string]: { AM: Task[]; PM: Task[] } };
  selectedDate: string | null;
  selectedSlot: 'AM' | 'PM' | null;
  tempTaskText: string | null;
  selectedDates: { date: string; slot: 'AM' | 'PM' }[];
  sequenceTasks: { date: string; slot: 'AM' | 'PM'; task: Task }[];
  isSelected: boolean;
  isExpanded: boolean;
  expanded: { date: string; slot: 'AM' | 'PM'; taskId?: string | null } | null; // Allow null
  addTasksStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  previewTask: any;
  previewTaskIndex: number | null;
  isSessionLibraryOpen: boolean;
}

const initialState: CalendarState = {
  isOpen: false,
  tasks: {},
  selectedDate: null,
  selectedSlot: null,
  tempTaskText: null,
  selectedDates: [],
  sequenceTasks: [],
  isSelected: false,
  expanded: null,
  isExpanded: false,
  addTasksStatus: 'idle',
  previewTask: {},
  previewTaskIndex: null,
  isSessionLibraryOpen: false,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleCalendar(state) {
      state.isOpen = !state.isOpen
    },
    selectDate(
      state,
      action: PayloadAction<{ date: string; slot: 'AM' | 'PM' }>,
    ) {
      state.selectedDates.push(action.payload)
    },
    setTempTaskText(state, action: PayloadAction<string>) {
      state.tempTaskText = action.payload
      state.isSelected = true
      state.selectedDates = []
    },
    setSessionTempText(state, action: PayloadAction<any>) {
      state.tempTaskText = action.payload
      state.isSelected = true
    },
    addTask(
      state,
      action: PayloadAction<{ date: string; slot: 'AM' | 'PM'; task: Task }>,
    ) {
      const { date, slot, task } = action.payload
      if (!state.tasks[date]) {
        state.tasks[date] = { AM: [], PM: [] }
      }
      state.tasks[date][slot].push(task)
    },
    handleAddTask(
      state,
      action: PayloadAction<{ [date: string]: { AM: Task[]; PM: Task[] } }>,
    ) {
      state.tasks = action.payload
    },
    handleAddPreviewTaskIndex(state, action: PayloadAction<any>) {
      state.previewTaskIndex = action.payload
    },
    handleMergePreviewtask(state, action: PayloadAction<any>) {
      const margegPreviewTasks = Object.keys(action.payload).reduce(
        (acc, date) => {
          // if (acc[date]) {
          //   acc[date] = {
          //     AM: [...(acc[date].AM || []), ...(action.payload[date].AM || [])],
          //     PM: [...(acc[date].PM || []), ...(action.payload[date].PM || [])],
          //   };
          // } else {
          //   acc[date] = {
          //     AM: action.payload[date].AM || [],
          //     PM: action.payload[date].PM || [],
          //   };
          // }
          acc[date] = {
            AM: action.payload[date].AM || [],
            PM: action.payload[date].PM || [],
          }
          return acc
        },
        { ...state.previewTask },
      )
      state.previewTask = margegPreviewTasks
    },
    deleteTask(
      state,
      action: PayloadAction<{
        date: string;
        slot: 'AM' | 'PM';
        taskId: string;
      }>,
    ) {
      const { date, slot, taskId } = action.payload
      if (state.tasks[date]) {
        state.tasks[date][slot] = state.tasks[date][slot].filter(
          (task) => task.id !== taskId,
        )
      }
      state.expanded = null
    },
    regenerateTasks(
      state,
      action: PayloadAction<{ date: string; slot: 'AM' | 'PM' }>,
    ) {
      const { date, slot } = action.payload
      if (state.tasks[date]) {
        state.tasks[date][slot] = []
      }
    },
    addImmediateTask(state, action: PayloadAction<string>) {
      const task: Task = {
        id: uuidv4(),
        text: action.payload,
      }
      if (state.selectedDates.length > 0) {
        state.selectedDates.forEach((dateObj) => {
          if (!state.tasks[dateObj.date]) {
            state.tasks[dateObj.date] = { AM: [], PM: [] }
          }
          state.tasks[dateObj.date][dateObj.slot].push(task)
        })
      }
      state.tempTaskText = null
      state.isSelected = false
      state.selectedDates = []
    },
    toggleSessionLibrary(state) {
      state.isSessionLibraryOpen = !state.isSessionLibraryOpen
    },
    addTasks(state) {
      if (state.tempTaskText) {
        state.selectedDates.forEach((dateObj) => {
          const task: Task = {
            id: uuidv4(),
            text: state.tempTaskText as string,
          }
          state.tasks[dateObj.date] = state.tasks[dateObj.date] || {
            AM: [],
            PM: [],
          }
          state.tasks[dateObj.date][dateObj.slot].push(task)
          state.sequenceTasks.push({ ...dateObj, task })
        })
        state.selectedDates = []
        state.tempTaskText = null
        state.isSelected = false
      }
    },
    addTasksLocally(
      state,
      action: PayloadAction<
        Array<{ id: string; text: string; date: string; slot: 'AM' | 'PM' }>
      >,
    ) {
      action.payload.forEach((task) => {
        if (!state.tasks[task.date]) {
          state.tasks[task.date] = { AM: [], PM: [] }
        }
        state.tasks[task.date][task.slot] = []
        state.tasks[task.date][task.slot].push({
          id: task.id,
          text: task.text,
        })
      })
      state.selectedDates = []
      state.tempTaskText = null
      state.isSelected = false
    },
    resetTasks(state) {
      state.sequenceTasks.forEach(({ date, slot, task }) => {
        state.tasks[date][slot] = state.tasks[date][slot].filter(
          (t) => t.id !== task.id,
        )
      })
      state.sequenceTasks = []
      state.isSelected = false
    },
    toggleExpanded(state) {
      if (state.addTasksStatus !== 'pending') {
        state.isExpanded = !state.isExpanded
        state.isSessionLibraryOpen = false
      }
    },
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setExpanded(
      state,
      action: PayloadAction<{
        date: string;
        slot: 'AM' | 'PM';
        taskId?: string | null; // Allow null
      } | null>,
    ) {
      state.expanded = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTasks.fulfilled, (state) => {
      state.sequenceTasks = []
      state.isSelected = false
    })
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
    })
    builder.addCase(deleteTaskFromServer.fulfilled, (state) => {
      state.expanded = null
    })
    builder.addCase(addTasksThunk.pending, (state) => {
      state.addTasksStatus = 'pending'
    })
    builder.addCase(addTasksThunk.fulfilled, (state) => {
      state.addTasksStatus = 'fulfilled'
    })
    builder.addCase(addTasksThunk.rejected, (state) => {
      state.addTasksStatus = 'rejected'
    })
  },
})

export const {
  toggleCalendar,
  selectDate,
  setTempTaskText,
  // addTask,
  handleAddTask,
  // deleteTask,
  regenerateTasks,
  addTasks,
  resetTasks,
  setExpanded,
  addTasksLocally,
  addImmediateTask,
  toggleExpanded,
  handleAddPreviewTaskIndex,
  handleMergePreviewtask,
  toggleSessionLibrary,
  setSessionTempText,
  setIsOpen,
} = calendarSlice.actions

export default calendarSlice.reducer
