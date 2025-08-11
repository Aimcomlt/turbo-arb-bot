// strategySlice.ts – for reference
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { StrategyMetadata } from '../../../../shared/types'
import { fetchStrategies } from '../../services/strategyService'

interface StrategyState {
  list: StrategyMetadata[]
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
        (state, action: PayloadAction<StrategyMetadata[]>) => {
          state.isLoading = false
          state.list = action.payload.map((s) => ({
            ...s,
            tokenPair: s.tokenPair ?? '',
          }))
        },
      )
      .addCase(loadStrategies.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setActiveStrategy } = strategySlice.actions
export default strategySlice.reducer
export { type StrategyMetadata }
