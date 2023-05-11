import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideRegisterModal } from "../../../redux/slicers/Auth.slicer";
import { RootState } from "../../../redux/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { regInput } from "../../../Types";
import "./Register-modal.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 340,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialState: regInput = {
  user_name: "",
  email: "",
  password: "",
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.authSlice.openRegister);

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
      if (result.msg === "Пользователь зарегистрирован") {
        dispatch(hideRegisterModal());
        navigate("/files");
      } else {
        alert("Опаньки!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={() => dispatch(hideRegisterModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="register-form" onSubmit={submitHandler}>
            <h2 className="register-form-header">Register</h2>
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
            <Button className="register-button" type="submit">
              Register
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
