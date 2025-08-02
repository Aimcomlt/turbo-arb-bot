import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExecutionState {
  pending: boolean
  txHash: string | null
  error: string | null
}

const initialState: ExecutionState = {
  pending: false,
  txHash: null,
  error: null,
}

const executionSlice = createSlice({
  name: 'execution',
  initialState,
  reducers: {
    startExecution: (state) => {
      state.pending = true
      state.txHash = null
      state.error = null
    },
    executionSuccess: (state, action: PayloadAction<string>) => {
      state.pending = false
      state.txHash = action.payload
    },
    executionFailure: (state, action: PayloadAction<string>) => {
      state.pending = false
      state.error = action.payload
    },
  },
})

export const { startExecution, executionSuccess, executionFailure } = executionSlice.actions
export default executionSlice.reducer
