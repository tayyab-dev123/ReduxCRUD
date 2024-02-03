import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "gitUsers",
  async (args, { rejectWithValue }) => {
    const response = await fetch("https://api.github.com/users");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const gitUser = createSlice({
  name: "gitUser",
  initialState: {
    users: [],
    isloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isloading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error;
      });
  },
});

export default gitUser.reducer;
