import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:'',
  email:'',
  phone:'' 
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    }
  }
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
