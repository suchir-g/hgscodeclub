import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import "./css/Problems.css";

export default function Problems({ isAuth }) {
  const [problemList, setProblemList] = useState([]);
  const problemCollectionRef = collection(db, "problems");
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(problemCollectionRef);
      setProblemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deleteProblem = async (id) => {
    const problemDoc = doc(db, "problems", id);
    await deleteDoc(problemDoc);
    navigate(0);
  };

  return (
    <div className="homePage">
      <div className="problemsType noselect">
        <h1>Problems</h1>
      </div>
      <p className="subtitle">
        <i>Click on the problem name to start solving</i>
      </p>
      <div className="titleNames">
        <div>
          <h4>Name</h4>
        </div>
        <div>
          <h4>Author</h4>
        </div>
        <div>
          <h4>Official</h4>
        </div>
        <div>
          <h4>Rating</h4>
        </div>
      </div>
      <div className="problems">
        {problemList.map((post) => {
          return (
            <div className="post">
              <div className="problemContainer">
                <h3 >
                  <Link
                    to={`/problems/${post.id}`}
                    className="problemLink"
                  >
                    {post.title}
                  </Link>
                </h3>
              </div>
              <div className="problemContainer">
                <h4 className="postAuthor">{post.author.name}</h4>
              </div>
              <div className="problemContainer">
                <p className={post.official && "officialPost"}>
                  {post.official ? "Official" : "User submitted"}
                </p>
              </div>
              <div className="problemContainer finalPost">
                <p
                  className={
                    post.rating < 300
                      ? "easyPost"
                      : post.rating < 600
                      ? "mediumPost"
                      : "hardPost"
                  }
                >
                  {post.rating}
                </p>
              </div>
            </div>
          );
        })}
        <Link to="/newProblem">
          <button className="newProblem">+</button>
        </Link>
      </div>
    </div>
  );
}
