import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDbData: {
    likedPosts: [],
    imagePath: "",
  },
};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.userDbData = action.payload;
    },
    removeData: (state) => {
      state.userDbData = { likedPosts: [], imagePath: "" };
    },
  },
});

export const { updateData, removeData } = databaseSlice.actions;
export default databaseSlice.reducer;
