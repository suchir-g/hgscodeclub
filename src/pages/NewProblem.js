import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function NewProblem({ isAuth }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [rating, setRating] = useState(0);

  const [userDoc, setUserDoc] = useState({});

  const problemsCollectionRef = collection(db, "problems");
  let navigate = useNavigate();

  const createProblem = async () => {
    if (!(title && description && code && extraInfo && rating)) {
      return;
    }
    console.log(auth.currentUser.uid);
    try {
      const q = query(
        collection(db, "users"),
        where("userID", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDoc(doc.data());
      });
      console.log(userDoc);
      await addDoc(problemsCollectionRef, {
        title,
        description,
        code,
        extraInfo,
        rating,
        author: { name: userDoc.displayName, userID: userDoc.userID },
        official: userDoc.role == "Admin"
      });

      // author : {name: auth.currentUser.displayName || auth.currentUser.email, userID: auth.currentUser.uid}
      navigate("/");
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    //this takes too long to load so "auth" hasn't fully loaded in yet. fix it please tomorow.
  }, []);

  return (
    <div className="createPostPage">
      <div className="npContainer">
        <h1>Post a Problem</h1>
        <div className="inputGpTitle">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            placeholder="Title..."
            name="igtitle"
            id="igtitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGpDescription">
          <label htmlFor="igdescription">Description: </label>
          <textarea
            name="igdescription"
            id="igdescription"
            cols="40"
            rows="10"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="inputGpCode">
          <label htmlFor="igcode">Code: </label>
          <textarea
            name="igcode"
            id="igcode"
            cols="30"
            rows="10"
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>
        <div className="inputGpExtraInfo">
          <label htmlFor="igextrainfo">Extra Information: </label>
          <textarea
            name="igextrainfo"
            id="igextrainfo"
            cols="30"
            rows="10"
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
        </div>
        <div className="inputGpRating">
          <label htmlFor="igRating">Rating (1-1000): </label>
          <input
            type="number"
            placeholder="300"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button onClick={createProblem}>Submit Problem</button>
      </div>
    </div>
  );
}
