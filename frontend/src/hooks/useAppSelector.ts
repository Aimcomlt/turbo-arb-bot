import { useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '../store'

// Typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
