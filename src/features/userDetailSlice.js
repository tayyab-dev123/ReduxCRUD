import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://65bbdfaa52189914b5bd412d.mockapi.io/curd",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error.toString());
    }
  }
);

export const getUsers = createAsyncThunk(
  "userData",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://65bbdfaa52189914b5bd412d.mockapi.io/curd"
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error.toString());
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://65bbdfaa52189914b5bd412d.mockapi.io/curd/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error.toString());
    }
  }
);
//updateUser
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://65bbdfaa52189914b5bd412d.mockapi.io/curd/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    isloading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isloading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isloading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((item) => item.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        console.log("Payload data", state.users);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.message;
      });
  },
});

export const { searchUser } = userDetail.actions;

export default userDetail.reducer;
