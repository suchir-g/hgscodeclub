import { React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {db,auth} from "../config/firebase"
import { query, collection, where, getDocs } from "firebase/firestore";

export default function Profile({ isAuth, setIsAuth }) {
  
  const [userDoc,setUserDoc] = useState({})
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
      <button onClick={loadData}>Load data</button>
      <p>{userDoc.registerEmail}</p>
      <p>{userDoc.displayName}</p>
      <p>{userDoc.problemCount}</p>
      <p>{userDoc.ranking}</p>
      <p>{userDoc.role}</p>
      <p>{userDoc.yearGroup}</p>
      <p>{userDoc.userID}</p>
      <button onClick={signUserOut}>Sign out</button>
    </div>
  );
}
