import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { delFileFromRedux } from "../slicers/UserFiles.slicer";
import { RootState } from "../store";

export const delFileFromBack =
  (id: number) =>
  async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    try {
      const response = await fetch(`http://localhost:3001/userfiles/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();

      if (result.msg) {
        dispatch(delFileFromRedux(id));
      }
    } catch (error) {
      console.error(error);
    }
  };
