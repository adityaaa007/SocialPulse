import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userDbData: {},
};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.userDbData = action.payload;
    },
  },
});

export const {updateData} = databaseSlice.actions;
export default databaseSlice.reducer;