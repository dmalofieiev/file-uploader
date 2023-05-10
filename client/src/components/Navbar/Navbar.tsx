import React from "react";
import { RootState, useAppSelector } from "../../redux/Thunk/type";
import { Link } from "react-router-dom";

function Navbar() {
  const user = useAppSelector((state: RootState) => state.authSlice.user);
  const loading = useAppSelector((state: RootState) => state.authSlice.loading);

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:3001/auth/logout", {
      credentials: "include",
    });
    const result = await response.json();
  };
  return (
    <div className="nav-wrapper">
      <h1>ЗАГРУЖАТОР</h1>
      <h5>
        <b>USher:</b> {loading ? "loading" : user.user_name}
      </h5>
      <Link to="/auth/logout">Logout</Link>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Navbar;
