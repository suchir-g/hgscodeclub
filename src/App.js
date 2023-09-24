import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Problems from "./pages/Problems";
import NewProblem from "./pages/NewProblem";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Problem from "./pages/Problem";
import Register from "./pages/Register";

import { useState } from "react";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {isAuth && <Link to="/newProblem">Create</Link>}
        {isAuth && <Link to="/profile">Profile</Link>}
        {!isAuth && <Link to="/login">Login</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/problems" element={<Problems isAuth={isAuth} />} />
        <Route path="/problems/:problemId" element={<Problem />} />
        <Route path="/newProblem" element={<NewProblem isAuth={isAuth} />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/register" element={<Register isAuth={isAuth} setIsAuth={setIsAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/profile"
          element={<Profile isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
