import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../config/firebase"

export default function Profile({ isAuth, setIsAuth }) {
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/login");
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <div>Profile</div>
      <button onClick={signUserOut}>Sign out</button>
    </div>
  );
}
