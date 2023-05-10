import React, { useState } from "react";
import { showModal, hideModal } from "../../redux/slicers/Auth.slicer";
import { useDispatch } from "react-redux";

export default function Main() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Загружатор</h1>
      <button onClick={}>Логин</button>
      <button>Регистрация</button>
    </div>
  );
}
