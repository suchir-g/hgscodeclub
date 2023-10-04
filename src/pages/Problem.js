import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { db,auth } from "../config/firebase";
import "./css/Problem.css";
export default function Problem({ isAuth }) {
  const navigate = useNavigate();
  const params = useParams();
  const [problem, setProblem] = useState({author:{}});
  

  useEffect(() => {
    const collectData = async () => {
      const problemRef = doc(db, "problems", params.problemId);
      const problem = await getDoc(problemRef);
      setProblem({ ...problem.data(), id: problem.id });
      console.log(problem);
    };
    collectData();
  }, auth);

  const deleteProblem = async () => {
    const problemDoc = doc(db, "problems", problem.id);
    await deleteDoc(problemDoc);
    navigate("/problems");
  };

  return (
    <div className="problemPageMainContainer">
      <div className="problemPost">
        <div className="problemIndividualType">
          <h1 className=" noselect">{problem.title} </h1>
        </div>
        <p>Rating: {problem.rating}</p>
        <p className="allowLineBreak description">{problem.description}</p>
        <code className="allowLineBreak">{problem.code}</code>
        <p className="allowLineBreak extraInfo">
          <i>{problem.extraInfo}</i>
        </p>
        <div className="deleteSection">
          {isAuth && problem.author.userID === auth.currentUser.uid && (
            <button
              className="deleteProblemBtn"
              onClick={() => {
                deleteProblem();
              }}
            >
              Delete post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
