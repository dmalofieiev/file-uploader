import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { openFormModal } from "../../redux/slicers/File.slicer";
import AddFile from "./AddFile";
import UserFiles from "../UserFiles/UserFiles";
import "./Files.css";

export default function Files() {
  const dispatch = useDispatch();

  return (
    <div className="main-page-wrapper">
      <Navbar />
      <div className="main-page-section">
        <AddFile />
        <UserFiles />
        <button
          className="upload-button"
          onClick={() => dispatch(openFormModal())}
        >
          Upload File
        </button>
      </div>
    </div>
  );
}
