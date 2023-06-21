import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const res = await axios.post("https://jsonplaceholder.typicode.com/users", user);
  return res.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [...action.payload];
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.error = "";
    });
    
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    
  },
});



export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;