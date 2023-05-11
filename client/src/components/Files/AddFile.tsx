import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideRegisterModal } from "../../redux/slicers/Auth.slicer";
import { RootState } from "../../redux/store";

export default function Add() {
  const state = useSelector((state: RootState) => state.fileSlicer.openForm);
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
    console.log(fileInfo);
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={() => dispatch(hideRegisterModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form onSubmit={uploadFileHandler} encType="multipart/form-data">
            <input name="file" type="file" />
            <button>submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
