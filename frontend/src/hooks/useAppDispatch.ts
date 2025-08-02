import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

// Typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch
