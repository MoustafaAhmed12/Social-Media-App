import { configureStore } from "@reduxjs/toolkit";
import post from "./postSlice";
import user from "./userSlice";

const store = configureStore({
  reducer: {
    post,
    user,
  },
});

export default store;
