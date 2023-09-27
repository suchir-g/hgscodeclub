import { React, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, provider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./css/Register.css";

export default function Register({ isAuth, setIsAuth }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [yearGroup, setYearGroup] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const usersCollectionRef = collection(db, "users");

  const navigate = useNavigate();

  const registerWithEmailAndPassword = async () => {
    if (!(registerEmail || registerPassword || displayName || yearGroup)) {
      return;
    }

    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        addDoc(usersCollectionRef, {
          registerEmail,
          displayName,
          yearGroup,
          problemCount: 0,
          ranking: 0,
          role: "None",
          userID: auth.currentUser.uid,
        });
        navigate("/problems");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const registerWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);

        await addDoc(usersCollectionRef, {
          registerEmail: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
          yearGroup: 7,
          problemCount: 0,
          ranking: 0,
          userID: auth.currentUser.uid,
        });

        navigate("/problems");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="registerPage">
      <div className="registerSection">
        <div className="registerType">
          <h1>Register</h1>
        </div>
        <i className="subtitle">
          Or did you mean{" "}
          <Link to="/login" style={{ color: "#d670d6" }}>
            login
          </Link>
        </i>
        <div className="inputGpEmail">
          <p>
            <b>Email and password: </b>
          </p>
          <label htmlFor="igemail">Email: </label>
          <input
            type="email"
            placeholder="somebody@heckgrammar.co.uk"
            name="igemail"
            id="igemail"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div className="inputGpPassword">
          <label htmlFor="igpassword">Password: </label>
          <input
            type="password"
            placeholder="password"
            name="igpassword"
            id="igpassword"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <div className="inputGpDisplayName">
          <label htmlFor="igdn">Display name: </label>
          <input
            type="text"
            placeholder="display name"
            name="igname"
            id="igname"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="inputGpYearGroup">
          <label htmlFor="igyg">Year group: </label>
          <input
            type="number"
            placeholder="7"
            name="igyg"
            id="igyg"
            onChange={(e) => setYearGroup(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p>
            <b style={{ color: "#f77474" }}>{errorMessage}</b>
          </p>
        )}
        <button
          onClick={registerWithEmailAndPassword}
          className="registerWithEP"
        >
          Register
        </button>
        <button onClick={registerWithGoogle} className="registerWithGoogle">
          Register with Google
        </button>
      </div>
    </div>
  );
}
