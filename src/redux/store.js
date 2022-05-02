import { configureStore } from "@reduxjs/toolkit";
import IsSignInReducer from "./IsSignIn";

export const store = configureStore({
  reducer: {
    auth: IsSignInReducer,
  },
});
