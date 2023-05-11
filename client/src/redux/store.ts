import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/Auth.slicer";
import fileSlicer from "./slicers/File.slicer";
import userFilesSlicer from "./slicers/UserFiles.slicer";

export const store = configureStore({
  reducer: { authSlice, fileSlicer, userFilesSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
