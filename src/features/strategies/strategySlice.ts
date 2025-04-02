import { createSlice } from '@reduxjs/toolkit'

const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    list: [],
  },
  reducers: {
    setStrategies: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { setStrategies } = strategySlice.actions
export default strategySlice.reducer
