import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideLoginModal } from "../../../redux/slicers/Auth.slicer";
import { RootState } from "../../../redux/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logInput } from "../../../Types";
import "./Login-modal.css";

const initialState: logInput = {
  email: "",
  password: "",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 270,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.authSlice.openLogin);

  const [inputs, setInputs] = useState(initialState);

  const changeHandler = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputs),
      });
      const result = await response.json();
      if (result.msg === "Удача!") {
        dispatch(hideLoginModal());
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
        onClose={() => dispatch(hideLoginModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="login-form" onSubmit={submitHandler}>
            <h2 className="login-form-header">Login</h2>
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
            <Button className="login-button" type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
