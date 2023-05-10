import React, { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slicers/Auth.slicer";
import { RootState } from "./redux/store";
import Navbar from "./components/Navbar/Navbar";
import { getUser } from "./redux/Thunk/getUser";
import { useAppDispatch, useAppSelector } from "./redux/Thunk/type";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.authSlice.user);
  console.log("1", state);

  useEffect(() => {
    dispatch(getUser());
    console.log("2", state);
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Main />
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}

export default App;
