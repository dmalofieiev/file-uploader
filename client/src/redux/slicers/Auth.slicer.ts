import { createSlice } from "@reduxjs/toolkit";

interface OpenState {
  openRegister: boolean;
  openLogin: boolean;
}

const initialState = { openRegister: false, openLogin: false } as OpenState;

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showLoginModal(state) {
      state.openLogin = true;
    },
    hideLoginModal(state) {
      state.openLogin = false;
    },
    showRegisterModal(state) {
      state.openRegister = true;
    },
    hideRegisterModal(state) {
      state.openRegister = false;
    },
  },
});

export const {
  showLoginModal,
  hideLoginModal,
  showRegisterModal,
  hideRegisterModal,
} = authSlicer.actions;
export default authSlicer.reducer;
