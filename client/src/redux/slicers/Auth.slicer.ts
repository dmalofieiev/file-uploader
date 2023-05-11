import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../Thunk/getUser";
import { OpenState } from "../../Types";

const initialUser = {
  id: 0,
  user_name: "",
};

const initialState = {
  openRegister: false,
  openLogin: false,
  user: initialUser,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = initialUser;
        state.loading = false;
        state.error = action.error.message;
      });
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
