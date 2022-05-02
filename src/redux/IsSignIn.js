import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSingin: false,
};

export const isSinginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //actions
    signin: (state) => {
      state.isSingin = true;
    },
    signout: (state) => {
      state.isSingin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = isSinginSlice.actions;

export default isSinginSlice.reducer;
