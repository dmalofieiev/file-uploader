import { createSlice } from "@reduxjs/toolkit";
import { OpenFilesState, fileUser, filesState } from "../../Types";
import { getFiles } from "../Thunk/getFiles";

const initialFile = {
  title: "",
  file_size: "",
  file_link: "",
} as fileUser;

const initialState = {
  files: [],
  loading: false,
  error: null,
} as OpenFilesState;

const userFilesSlicer = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles(state, action) {
      state.files = [...state.files, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = [...state.files, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFiles } = userFilesSlicer.actions;

export default userFilesSlicer.reducer;
