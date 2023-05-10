import { Modal } from "@mui/base";
import { FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideRegisterModal } from "../../redux/slicers/Auth.slicer";
import { RootState } from "../../redux/store";

export default function Add() {
  const state = useSelector((state: RootState) => state.fileSlicer.openForm);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        open={state}
        onClose={() => dispatch(hideRegisterModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <input name="file_link" type="file" />
          <button>submit</button>
        </Box>
      </Modal>
    </div>
  );
}
