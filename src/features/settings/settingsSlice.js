import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lightTheme: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
