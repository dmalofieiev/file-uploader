import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../../../redux/slicers/Auth.slicer";
import { RootState } from "../../../redux/store";

import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

type Input = {
  user_name: string;
  email: string;
  password: string;
};

const initialState: Input = {
  user_name: "",
  email: "",
  password: "",
};

function Register() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.authSlice.open);

  const [inputs, setInputs] = useState(initialState);

  const changeHandler = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputs),
      });
      const result = await response.json();
      console.log(result.msg);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={() => dispatch(hideModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form onSubmit={submitHandler}>
            <FormLabel>Enter Name</FormLabel>
            <TextField
              onChange={changeHandler}
              name="user_name"
              type="text"
            ></TextField>
            <FormLabel>Enter Email</FormLabel>
            <TextField
              onChange={changeHandler}
              name="email"
              type="email"
            ></TextField>
            <FormLabel>Enter Password</FormLabel>
            <TextField
              onChange={changeHandler}
              name="password"
              type="password"
            ></TextField>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
