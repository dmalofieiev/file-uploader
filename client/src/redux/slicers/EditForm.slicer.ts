import { createSlice } from "@reduxjs/toolkit";
import { formState2 } from "../../Types";

const initialState = {
  openEditForm: false,
} as formState2;

const editFileSlicer = createSlice({
  name: "editFile",
  initialState,
  reducers: {
    openEditFormModal(state) {
      state.openEditForm = true;
    },
    closeEditFormModal(state) {
      state.openEditForm = false;
    },
  },
});

export const { openEditFormModal, closeEditFormModal } = editFileSlicer.actions;
export default editFileSlicer.reducer;
