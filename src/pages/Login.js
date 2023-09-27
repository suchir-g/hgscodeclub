import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
export default function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/problems");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const logInWithEmailAndPassword = async () => {
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/problems");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="loginPage">
      <div className="loginSection">
        <div className="loginType">
          <h1>Login</h1>
        </div>
        <i className="subtitle">
          Or did you mean{" "}
          <Link to="/register" style={{ color: "#2dc78c" }}>
            register
          </Link>
        </i>

        <div className="thing">
          <p>
            <b>Email and password:</b>
          </p>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>
        </div>
        <p>
          <b style={{ color: "#e24e4e" }}>{errorMessage}</b>
        </p>
        <button
          onClick={logInWithEmailAndPassword}
          className="finalLoginButton"
        >
          Login
        </button>
        <button className="loginButtonGoogle" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
