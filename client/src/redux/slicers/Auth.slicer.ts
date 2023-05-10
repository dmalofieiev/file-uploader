import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Types";

interface OpenState {
  openRegister: boolean;
  openLogin: boolean;
  user: User;
}

const initialUser = {
  id: 0,
  user_name: "",
};

const initialState = {
  openRegister: false,
  openLogin: false,
  user: initialUser,
} as OpenState;

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
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  showLoginModal,
  hideLoginModal,
  showRegisterModal,
  hideRegisterModal,
  setUser,
} = authSlicer.actions;
export default authSlicer.reducer;
