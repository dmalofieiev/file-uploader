import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditFormModal } from "../../redux/slicers/EditForm.slicer";
import { RootState } from "../../redux/store";

export default function EditForm({ selectedFile }) {
  console.log("selectedFile: -------->", selectedFile);
  const dispatch = useDispatch();
  const openEditForm = useSelector(
    (state: RootState) => state.editFileSlicer.openEditForm
  );

  const [input, setInput] = useState("");

  const inputHandler = (e: any) => {
    setInput(e.target.value);
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
  };

  return (
    <div>
      <Modal
        open={openEditForm}
        onClose={() => dispatch(closeEditFormModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="add-file-form"
            // onSubmit={uploadFileHandler}
            encType="multipart/form-data"
          >
            <input
              name="text"
              type="text"
              onChange={inputHandler}
              defaultValue={input}
            />
            <button>Edit title</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
