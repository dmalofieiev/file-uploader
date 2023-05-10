import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../../../redux/slicers/Auth.slicer";
import { RootState } from "../../../redux/store";

import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

type Input = {
  user_name: string,
  email:string,
  password:string,
}

const initialState: Input = {
  user_name: '',
  email: '',
  password:''
}

function Register() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.authSlice.open)

  const [inputs, setInputs] = useState(initialState)

  const changeHandler = (e: any) => {
    console.log('test 123')
    setInputs((prev)=> ({...prev, [e.target.name]: e.target.value}))
  }
  console.log(inputs);
  

  return (
    <div>
      <Modal
        open={state}
        onClose={()=> dispatch(hideModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <FormControl>
            <FormLabel >Enter Name</FormLabel>
            <TextField onChange={changeHandler } name="user_name" type="text"></TextField>
            <FormLabel>Enter Email</FormLabel>
            <TextField onChange={changeHandler }  name="email" type="email"></TextField>
            <FormLabel>Enter Password</FormLabel>
            <TextField onChange={changeHandler }  name="password" type="password"></TextField>
            <Button>Submit</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
