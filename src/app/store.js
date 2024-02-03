import { configureStore } from "@reduxjs/toolkit";
import gitUser from "../features/gitUserSlice";
import userDetail from "../features/userDetailSlice";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
