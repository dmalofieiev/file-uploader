import React from "react";
import { RootState, useAppSelector } from "../../redux/Thunk/type";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.authSlice.user);
  const loading = useAppSelector((state: RootState) => state.authSlice.loading);

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:3001/auth/logout", {
      credentials: "include",
    });
    const result = await response.json();
    navigate("/");
  };
  return (
    <div className="nav-wrapper">
      <h1>ЗАГРУЖАТОР 3000</h1>
      {!loading && user ? (
        <>
          <h5>User: {user.user_name}</h5>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
