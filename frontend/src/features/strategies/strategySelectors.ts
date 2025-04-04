// strategySelectors.ts – Selectors for strategy state

import { RootState } from '../../store'

export const selectStrategies = (state: RootState) => state.strategies.list

export const selectIsLoading = (state: RootState) => state.strategies.isLoading

export const selectActiveStrategyId = (state: RootState) => state.strategies.activeId

export const selectActiveStrategy = (state: RootState) => {
  const { list, activeId } = state.strategies
  return list.find((s) => s.id === activeId) || null
}
