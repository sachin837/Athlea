import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: string;
  chatId: number;
  text: string;
  sessionType?: string;
}

interface TaskState {
  tasks: Task[];
  regeneratingTaskId: string | null;
}

const initialState: TaskState = {
  tasks: [],
  regeneratingTaskId: null,
}

export const regenerateTaskThunk = createAsyncThunk(
  'tasks/regenerate',
  async (
    {
      taskId,
      chatId,
      isIndividualCoach,
    }: { taskId: string; chatId: number; isIndividualCoach: boolean },
    { dispatch },
  ) => {
    dispatch(setRegeneratingTaskId(taskId))

    try {
      const response = await fetch('/api/regenerateTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, chatId, isIndividualCoach }),
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate task')
      }

      const regeneratedTask = await response.json()

      dispatch(updateRegeneratedTask(regeneratedTask))

      return regeneratedTask
    } catch (error) {
      console.error('Failed to regenerate task:', error)
      dispatch(setRegeneratingTaskId(null))
      throw error
    }
  },
)

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload)
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    setRegeneratingTaskId(state, action: PayloadAction<string | null>) {
      state.regeneratingTaskId = action.payload
    },
    updateRegeneratedTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === state.regeneratingTaskId,
      )
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
      state.regeneratingTaskId = null
    },
  },
})

export const {
  addTask,
  deleteTask,
  setRegeneratingTaskId,
  updateRegeneratedTask,
} = taskSlice.actions
export default taskSlice.reducer
