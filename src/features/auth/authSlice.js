import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {
    uid: null,
    email: null,
    name: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    updateName: (state, action) => {
      state.userData.name = action.payload;
    },
  },
});

export const { login, logout, updateName } = authSlice.actions;

export default authSlice.reducer;
