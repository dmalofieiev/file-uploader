import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { editFile } from "../slicers/UserFiles.slicer";
import { RootState } from "../store";
import { ThunkAction } from "@reduxjs/toolkit";

export const editFileFromBack =
  (
    id: number,
    title: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/userfiles/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const result = await response.json();

      if (result.msg) {
        dispatch(editFile({ id, title }));
      }
    } catch (error) {
      console.error(error);
    }
  };
