import { createSlice } from '@reduxjs/toolkit'

interface ColorModeState {
  colorMode: '';
}

const initialState: ColorModeState = {
  colorMode: '',
}

const colormodeSlice = createSlice({
  name: 'colormode',
  initialState,
  reducers: {
    addColorMode(state, action) {
      state.colorMode = action.payload
    },

  },
})

export const { addColorMode } = colormodeSlice.actions
export default colormodeSlice.reducer
