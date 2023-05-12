import {
  showLoginModal,
  showRegisterModal,
} from "../../redux/slicers/Auth.slicer";
import { useDispatch } from "react-redux";
import Register from "../Authentification/Register/Register-modal";
import Login from "../Authentification/Login/Login-modal";
import "./Main.css";

export default function Main() {
  const dispatch = useDispatch();
  return (
    <div className="main-wrapper">
      <h1 className="main-title">Welcome to File Uploader!</h1>
      <div className="buttons-container">
        <button
          className="button-19"
          onClick={() => dispatch(showLoginModal())}
        >
          Login
        </button>
        <button
          className="button-19"
          onClick={() => dispatch(showRegisterModal())}
        >
          Register
        </button>
      </div>
      <img className="cloud-logo" src="/assets/cloud.png" alt="cloud" />
      <Register />
      <Login />
    </div>
  );
}
