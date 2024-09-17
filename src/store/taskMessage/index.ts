import { createSlice } from '@reduxjs/toolkit'

interface taskMessageState {
  runData: {};
  bikeData:{};
  strengthAndConditioningData:{};
  nutritionData:{}
}

const initialState: taskMessageState = {
  runData: {},
  bikeData:{},
  strengthAndConditioningData:{},
  nutritionData:{},
}

const tasksMessageSlice = createSlice({
  name: 'taskMessageData',
  initialState,
  reducers: {
    addRunData(state, action) {
      state.runData = action.payload
    },
    addBikeData(state, action) {
      state.bikeData = action.payload
    },
    addStrengthData(state, action) {
      state.strengthAndConditioningData = action.payload
    },
    addNutritionData(state, action) {
      state.nutritionData = action.payload
    },

  },
})

export const { addRunData,addBikeData, addStrengthData, addNutritionData } = tasksMessageSlice.actions
export default tasksMessageSlice.reducer
