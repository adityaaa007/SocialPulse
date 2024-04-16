import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDbData: {
    likedPosts: [],
    imagePath: "",
  },
  updatePost: null
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
    setUpdatePost: (state, action) => {
      state.updatePost = action.payload;
    }
  },
});

export const { updateData, removeData, setUpdatePost } = databaseSlice.actions;
export default databaseSlice.reducer;
