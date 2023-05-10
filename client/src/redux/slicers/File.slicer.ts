import { createSlice } from "@reduxjs/toolkit";

interface formState {
  openForm: boolean;
}

const initialState = {
  openForm: false,
} as formState;

const fileSlicer = createSlice({
  name: "addFile",
  initialState,
  reducers: {
    openFormModal(state) {
      state.openForm = true;
    },
    closeFormModal(state) {
      state.openForm = false;
    },
  },
});

export const { openFormModal, closeFormModal } = fileSlicer.actions;
export default fileSlicer.reducer;
