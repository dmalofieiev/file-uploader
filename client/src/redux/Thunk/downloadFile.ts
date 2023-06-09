import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const downloadedFile =
  (
    id: number,
    title: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/userfiles/${id}/download`,
        {
          credentials: "include",
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title; // Set the filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error: -------->", error);
    }
  };
