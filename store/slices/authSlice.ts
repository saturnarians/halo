import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  role: string;
//   name?: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Fetch /api/auth/me only once
export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) throw new Error("Failed to fetch user");

  const data = await res.json();

  return data.admin ;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
