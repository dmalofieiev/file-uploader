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
    delFileFromRedux(state, action) {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
    editFile(state, action) {
      state.files = state.files.map((el) => {
        if (el.id === action.payload.id) {
          el.title = action.payload.title;
        }
        return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFiles, delFileFromRedux, editFile } = userFilesSlicer.actions;

export default userFilesSlicer.reducer;
