import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./fetchUser";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetchUser();
  return response.user;
});
