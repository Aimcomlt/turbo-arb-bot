// strategySlice.ts – for reference
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { Strategy } from '../../services/strategyService'
import { fetchStrategies } from '../../services/strategyService'

interface StrategyState {
  list: Strategy[]
  activeId: number | null
  isLoading: boolean
}

const initialState: StrategyState = {
  list: [],
  activeId: null,
  isLoading: false,
}

export const loadStrategies = createAsyncThunk('strategies/load', async () => {
  return await fetchStrategies()
})

const strategySlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    setActiveStrategy: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStrategies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        loadStrategies.fulfilled,
        (state, action: PayloadAction<Strategy[]>) => {
          state.isLoading = false
          state.list = action.payload
        },
      )
      .addCase(loadStrategies.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setActiveStrategy } = strategySlice.actions
export default strategySlice.reducer
export { type Strategy }
