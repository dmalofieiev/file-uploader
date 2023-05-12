import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeFormModal } from "../../redux/slicers/File.slicer";
import "./AddFile.css";
import { setFiles } from "../../redux/slicers/UserFiles.slicer";

export default function Add() {
  const openForm = useSelector((state: RootState) => state.fileSlicer.openForm);
  const dispatch = useDispatch();

  const uploadFileHandler = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch("http://localhost:3001/file/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const fileInfo = await response.json();
    dispatch(setFiles(fileInfo));
    dispatch(closeFormModal());
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    height: 100,
    bgcolor: "gray",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 100,
  };

  return (
    <div>
      <Modal
        open={openForm}
        onClose={() => dispatch(closeFormModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="add-file-form"
            onSubmit={uploadFileHandler}
            encType="multipart/form-data"
          >
            <input name="file" type="file" />
            <button>Upload File</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
