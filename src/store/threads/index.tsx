import {createSlice, PayloadAction, nanoid} from '@reduxjs/toolkit'
import {formatThreadDate} from '../../utils/format'
import {showNotification} from '../notifications'

// Define the shape of a single thread
interface Thread {
  id: string;
  ThreadHeaderText: string;
  dateSaved: string;
  updated: string;
}

// Define the shape of the entire slice state
interface ThreadsState {
  threads: Thread[];
}

// Define the type for the payload for updating a thread
interface UpdateThreadPayload {
  id: string;
  updatedThread: Partial<Thread>;
}

// Define the type for the payload to update the date saved
interface UpdateThreadDateSavedPayload {
  id: string;
  dateSaved: string;
}

const initialState: ThreadsState = {
  threads: [],
}

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    addThread: {
      reducer: (state, action: PayloadAction<Thread>) => {
        state.threads.push(action.payload)
      },
      prepare: (thread: Omit<Thread, 'id' | 'updated'> & {dateSaved: Date}) => {
        const id = nanoid()
        const now = formatThreadDate(thread.dateSaved)
        return {
          payload: {
            ...thread,
            id,
            updated: now,
            dateSaved: now,
          } as Thread,
        }
      },
    },
    updateThread: (state, action: PayloadAction<UpdateThreadPayload>) => {
      const index = state.threads.findIndex(
        thread => thread.id === action.payload.id,
      )
      if (index !== -1) {
        state.threads[index] = {
          ...state.threads[index],
          ...action.payload.updatedThread,
          updated: new Date().toISOString(),
        }
      }
    },
    updateThreadDateSaved: (
      state,
      action: PayloadAction<UpdateThreadDateSavedPayload>,
    ) => {
      const thread = state.threads.find(
        thread => thread.id === action.payload.id,
      )
      if (thread) {
        thread.dateSaved = action.payload.dateSaved
      }
    },
    deleteThread: (state, action: PayloadAction<string>) => {
      const index = state.threads.findIndex(
        thread => thread.id === action.payload,
      )
      if (index !== -1) {
        state.threads.splice(index, 1)
      }
    },
    setThreads: (state, action: PayloadAction<Thread[]>) => {
      state.threads = action.payload
    },
  },
})

export const addThreadAndNotify =
  (thread: Omit<Thread, 'id' | 'updated' | 'dateSaved'> & {dateSaved: Date}) =>
    (dispatch: any) => {
      dispatch(threadsSlice.actions.addThread(thread))
      dispatch(
        showNotification({
          message: {
            boldPart: `${thread.ThreadHeaderText}`,
            normalPart: ' was successfully added.',
          },
          type: 'custom',
        }),
      )
    }

// Export the auto-generated action creators
export const {
  updateThreadDateSaved,
  addThread,
  updateThread,
  deleteThread,
  setThreads,
} = threadsSlice.actions

// Export the reducer, to be used in the store
export default threadsSlice.reducer
