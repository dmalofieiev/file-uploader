import React, { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { RootState } from "./redux/store";
import { getUser } from "./redux/Thunk/getUser";
import { useAppDispatch, useAppSelector } from "./redux/Thunk/type";
import { Routes, Route } from "react-router-dom";
import Files from "./components/Files/Files";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/files" element={<Files />} />
    </Routes>
  );
}

export default App;
