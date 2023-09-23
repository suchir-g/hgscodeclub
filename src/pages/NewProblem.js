import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function NewProblem({ isAuth }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [rating, setRating] = useState(0);
  const problemsCollectionRef = collection(db, "problems");

  let navigate = useNavigate();

  const createProblem = async () => {
    if (!(title && description && code && extraInfo && rating)) {
      return;
    }
    await addDoc(problemsCollectionRef, {
      title,
      description,
      code,
      extraInfo,
      rating,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
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
