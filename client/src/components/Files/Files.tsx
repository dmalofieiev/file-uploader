import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { openFormModal } from "../../redux/slicers/File.slicer";
import AddFile from "./AddFile";
import UserFiles from "../UserFiles/UserFiles";

export default function Files() {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => dispatch(openFormModal())}>Upload File</button>
        <AddFile />
        <UserFiles />
      </div>
    </>
  );
}
