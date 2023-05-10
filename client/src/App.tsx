import React, { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slicers/Auth.slicer";
import { RootState } from "./redux/store";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.authSlice.user);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/auth/",
      {
        credentials: 'include'
      }
      );
      const user = await response.json();
      console.log("USEEEEEEER", user);

      if (user !== "") {
        dispatch(setUser(user));
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Main />
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}

export default App;
