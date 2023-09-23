import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { Link } from "react-router-dom";

export default function Problems({isAuth}) {
  const [problemList, setProblemList] = useState([]);
  const problemCollectionRef = collection(db, "problems");

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
  };

  return (
    <div className="homePage">
      {problemList.map((post) => {
        return (
          <div className="post">
            <h1>
              <Link to={`/problems/${post.id}`}>{post.title}</Link>
            </h1>
            <h3>{post.author.name}</h3>
            <p>{post.description}</p>
            <p>{post.code}</p>
            <p>{post.extraInfo}</p>
            <p>{post.rating}</p>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <div className="deletePost">
                <button
                  onClick={() => {
                    deleteProblem(post.id);
                  }}
                >
                  {" "}
                  &#128465;{" "}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
