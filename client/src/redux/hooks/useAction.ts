import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useCustomDispatch = () => {
  const dispatch = useDispatch();

  const customDispatch = (action: AnyAction) => {
    dispatch(action);
  };

  return customDispatch;
};
