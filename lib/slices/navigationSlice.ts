import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type PageType = "about" | "resume" | "portfolio" | "blog" | "contact"

interface NavigationState {
  currentPage: PageType
  sidebarOpen: boolean
}

const initialState: NavigationState = {
  currentPage: "about",
  sidebarOpen: false,
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<PageType>) => {
      state.currentPage = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { setCurrentPage, toggleSidebar, setSidebarOpen } = navigationSlice.actions
export default navigationSlice.reducer
