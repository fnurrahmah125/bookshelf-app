import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {},
  },
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveUser } = authSlice.actions;

export default authSlice.reducer;
