import React, { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/Thunk/type";
import { getUser } from "../../redux/Thunk/getUser";
import { getFiles } from "../../redux/Thunk/getFiles";

export default function UserFiles() {
  const dispatch = useAppDispatch();
  const files = useAppSelector(
    (state: RootState) => state.userFilesSlicer.files
  );
  const loading = useAppSelector(
    (state: RootState) => state.userFilesSlicer.loading
  );

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  return <div>{JSON.stringify(files)}</div>;
}
