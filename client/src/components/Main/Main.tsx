import {
  showLoginModal,
  showRegisterModal,
} from "../../redux/slicers/Auth.slicer";
import { useDispatch } from "react-redux";
import Register from "../Authentification/Register/Register-modal";
import Login from "../Authentification/Login/Login-modal";

export default function Main() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Загружатор</h1>
      <button onClick={() => dispatch(showLoginModal())}>Логин</button>
      <button onClick={() => dispatch(showRegisterModal())}>Регистрация</button>
      <Register />
      <Login />
    </div>
  );
}
