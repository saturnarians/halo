import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import navigationReducer from "./slices/navigationSlice"
import portfolioReducer from "./slices/portfolioSlice"
import uiReducer from "./slices/uiSlice"
import authReducer from './slices/authSlice'

export const store = configureStore({  
  reducer: {
    navigation: navigationReducer,
    portfolio: portfolioReducer,
    ui: uiReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<useAppDispatch>();

