import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/Auth.slicer";
import fileSlicer from "./slicers/File.slicer";

export const store = configureStore({
  reducer: { authSlice, fileSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
