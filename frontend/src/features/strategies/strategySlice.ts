// strategySlice.ts – for reference
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Strategy {
  id: number
  name: string
  tokenPair: string
  profit: number
}

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

const strategySlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    setStrategies: (state, action: PayloadAction<Strategy[]>) => {
      state.list = action.payload
    },
    setActiveStrategy: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setStrategies, setActiveStrategy, setLoading } = strategySlice.actions
export default strategySlice.reducer
