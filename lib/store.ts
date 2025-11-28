import { configureStore } from "@reduxjs/toolkit"
import navigationReducer from "./slices/navigationSlice"
import portfolioReducer from "./slices/portfolioSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    portfolio: portfolioReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
