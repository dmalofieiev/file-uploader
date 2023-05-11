import React, { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/Thunk/type";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/Thunk/getUser";

function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.authSlice.user);
  const loading = useAppSelector((state: RootState) => state.authSlice.loading);
  const navigate = useNavigate();

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
