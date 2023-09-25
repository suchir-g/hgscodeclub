import { React, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, provider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    navigate("/problems");
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
    <div className="registerBox">
      <h1>Register</h1>
      <button onClick={registerWithGoogle}>Register with google</button>
      <div className="inputGpEmail">
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
          placeholder="somebody@heckgrammar.co.uk"
          name="igpassword"
          id="igpassword"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </div>
      <div className="inputGpDisplayName">
        <label htmlFor="igdn">Display name: </label>
        <input
          type="text"
          placeholder="somebody@heckgrammar.co.uk"
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
      <button onClick={registerWithEmailAndPassword}>Register</button>
      <p>{errorMessage}</p>
    </div>
  );
}
