import React, { useEffect, useState } from "react";
import Terminal from "./Terminal/Terminal";

import "./css/Home.css";

export default function Home({ isAuth }) {
  return (
    <div className="container">
      <div className="welcomeDiv">
        <h1 className="welcome">Welcome to code club</h1>
        <p>Write commands in the terminal below to nagivate the site</p>
      </div>
      <Terminal isAuth={isAuth} />
    </div>
  );
}
