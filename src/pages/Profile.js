import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db, auth } from "../config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

import "./css/Profile.css";

export default function Profile({ isAuth, setIsAuth }) {
  const [userDoc, setUserDoc] = useState({});
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/login");
  }

  const loadData = async () => {
    const q = query(
      collection(db, "users"),
      where("userID", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserDoc(doc.data());
    });
  };


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  const suffixes = {
    undefined: "Login to find out your position",
    1: "st",
    2: "nd",
    3: "rd"
  }

  return (
    <div className="profileContainer">
      <div className="profileSection">
        <div className="mainUserInfo">
          <div className="loginType">
            <h1 className=" noselect">{userDoc.displayName || "Profile"}</h1>
          </div>
          <p style={{ fontStyle: "italic", fontSize: "smaller" }}>
            <i>{userDoc.role}</i>
          </p>
          <p>
            <i>{userDoc.registerEmail || "Load data to see email"}</i>
          </p>
        </div>
        <p>
          {userDoc.problemCount === undefined
            ? "Load data to see"
            : userDoc.problemCount}{" "}
          problems solved
        </p>
        <p>
          {userDoc.ranking}
          {suffixes[userDoc.ranking] || "th"} in the group
        </p>
        <p>
          {userDoc.yearGroup
            ? `Year ${userDoc.yearGroup}`
            : "Load data to see year group"}
        </p>
        <p style={{ fontStyle: "italic", fontSize: "smaller" }}>
          UserID: {userDoc.userID}
        </p>
        <button onClick={loadData} className="loadAllData">
          Load all data
        </button>
        <button onClick={signUserOut} className="signOut">
          Sign out
        </button>
      </div>
    </div>
  );
}
