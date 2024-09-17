import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session } from 'config'

interface SessionState {
    cycling_session: Session[];
    strength_session: Session[];
    running_session: Session[];
  }


const initialState: SessionState = {
  cycling_session:[],
  strength_session:[],
  running_session:[],
}

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    addCyclingSessions(state, action:PayloadAction<Session[]>) {
      state.cycling_session = action.payload
    },
    addStrengthSessions(state, action:PayloadAction<Session[]>) {
      state.strength_session = action.payload
    },
    addRunningSessions(state, action:PayloadAction<Session[]>) {
      state.running_session = action.payload
    },
  },
})

export const { addCyclingSessions, addStrengthSessions, addRunningSessions } = sessionSlice.actions
export default sessionSlice.reducer
