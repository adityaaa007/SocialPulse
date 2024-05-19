import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDbData: {
    likedPosts: [],
    imagePath: "",
    name: "",
    address: "",
    following: [],
  },
  updatePost: null,
  theme: "dark",
  posts: [],
  userPosts: {},
};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.userDbData = action.payload;
    },
    removeData: (state) => {
      state.userDbData = {
        likedPosts: [],
        imagePath: "",
        name: "",
        address: "",
        following: [],
      };
    },
    setUpdatePost: (state, action) => {
      state.updatePost = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    savePosts: (state, action) => {
      state.posts = action.payload;
    },
    saveUserPosts: (state, action) => {
      state.userPosts[action.payload.userId] = action.payload.posts;
    },
    updateImagePath: (state, action) => {
      state.userDbData.imagePath = action.payload;
    },
    updateNameAddress: (state, action) => {
      state.userDbData.name = action.payload.name;
      state.userDbData.address = action.payload.address;
    },
  },
});

export const {
  updateData,
  removeData,
  setUpdatePost,
  setTheme,
  savePosts,
  saveUserPosts,
  updateImagePath,
  updateNameAddress,
} = databaseSlice.actions;
export default databaseSlice.reducer;
