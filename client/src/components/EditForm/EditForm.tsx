import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { closeEditFormModal } from "../../redux/slicers/EditForm.slicer";
import { RootState } from "../../redux/store";
import { editFileFromBack } from "../../redux/Thunk/editFiles";
import { useAppDispatch } from "../../redux/Thunk/type";

export default function EditForm({ selectedFile }: any) {
  // console.log(selectedFile);

  const dispatch = useAppDispatch();
  const openEditForm = useSelector(
    (state: RootState) => state.editFileSlicer.openEditForm
  );

  const [input, setInput] = useState(selectedFile.title);

  const inputHandler = (e: any) => {
    setInput(e.target.value);
  };

  const uploadFileHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(editFileFromBack(selectedFile.id, input));
    dispatch(closeEditFormModal());
    console.log(input);
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
            onSubmit={uploadFileHandler}
            encType="multipart/form-data"
          >
            <input
              name="text"
              type="text"
              onChange={inputHandler}
              defaultValue={selectedFile.title}
            />
            <button type="submit">Edit title</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
