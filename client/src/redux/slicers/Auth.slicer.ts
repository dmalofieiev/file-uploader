import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OpenState {
  open: boolean;
}

const initialState = { open: false } as OpenState;

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showModal(state) {
      state.open = true;
    },
    hideModal(state) {
      state.open = false;
    },
  },
});

export const { showModal, hideModal } = authSlicer.actions;
export default authSlicer.reducer;
