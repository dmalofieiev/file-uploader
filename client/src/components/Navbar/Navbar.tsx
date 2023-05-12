import React, { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/Thunk/type";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/Thunk/getUser";
import "./Navbar.css";
import Link from "@mui/material/Link";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.authSlice.user);
  const loading = useAppSelector((state: RootState) => state.authSlice.loading);
  const navigate = useNavigate();
  const files = useAppSelector(
    (state: RootState) => state.userFilesSlicer.files
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:3001/auth/logout", {
      credentials: "include",
    });
    const result = await response.json();
    navigate("/");
  };

  return (
    <div className="nav-wrapper">
      <img className="nav-logo" src="/assets/cloud.png" alt="321" />
      {!loading && user ? (
        <>
          <h3>
            Hello, {user.user_name}! You have {files.length} files in storage.
          </h3>
          <a className="logout-link" onClick={logoutHandler}>
            <LogoutIcon />
            Logout
          </a>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
