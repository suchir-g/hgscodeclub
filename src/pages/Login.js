import React from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const registerWithEmailAndPassword = async () => {
    await createUserWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then(() => {
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
    <div className="loginText">
      <p>Sign in with Google</p>
      <button className="loginButtonGoogle" onClick={signInWithGoogle}>
        Sign in with Google
      </button>

      <p>Email and password</p>
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
      <button onClick={registerWithEmailAndPassword}>Register</button>
      <button onClick={logInWithEmailAndPassword}>Register</button>
      <p>{errorMessage}</p>
    </div>
  );
}
