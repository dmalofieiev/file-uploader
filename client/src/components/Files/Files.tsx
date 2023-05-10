import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { openFormModal } from "../../redux/slicers/File.slicer";
import AddFile from "./AddFile";

export default function Files() {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => dispatch(openFormModal)}>загрузить файл!</button>
        <AddFile />
      </div>
    </>
  );
}
