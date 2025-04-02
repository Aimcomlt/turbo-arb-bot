import { configureStore } from '@reduxjs/toolkit'
import strategyReducer from './features/strategies/strategySlice'
//import executionReducer from './features/execution/executionSlice'

export const store = configureStore({
  reducer: {
    strategies: strategyReducer,
    //execution: executionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//export const store = configureStore({ reducer: {} })

