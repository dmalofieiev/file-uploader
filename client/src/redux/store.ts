import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/Auth.slicer";
import fileSlicer from "./slicers/File.slicer";
import userFilesSlicer from "./slicers/UserFiles.slicer";
import editFileSlicer from "./slicers/EditForm.slicer";

export const store = configureStore({
  reducer: { authSlice, fileSlicer, userFilesSlicer, editFileSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
