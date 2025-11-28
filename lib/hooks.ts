import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAuth } from "./hooks/useAuth"
export { useApi } from "./hooks/useApi"
export { useFetchData } from "./hooks/useFetchData"
export { useMutateData } from "./hooks/useMutateData"
export { useFileUpload } from "./hooks/useFileUpload"
