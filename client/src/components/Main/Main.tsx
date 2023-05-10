import React, { useState } from "react";
import { showModal, hideModal } from "../../redux/slicers/Auth.slicer";
import { useDispatch } from "react-redux";
import Register from "../Authentification/Register/Register-modal";

export default function Main() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Загружатор</h1>
      <button>Логин</button>
      <button onClick={()=> dispatch(showModal())}>Регистрация</button>
      <Register />
    </div>
  );
}
