import React, { useEffect, useState } from "react";
import Terminal from "./Terminal/Terminal";

import "./css/Home.css";

export default function Home({ isAuth }) {
  return (
    <div className="container">
      <div className="mainContent">
        <div className="welcomeDiv">
          <div className="miniNestedDiv">
            <h1 className="welcome welcome-hi">Hi.</h1>
            <h1 className="welcome welcome-lt">Welcome to code club.</h1>
            <br />
            <i className="subtitle">
              {">"} Write commands in the terminal below to nagivate the site
            </i>
          </div>
        </div>
        <Terminal isAuth={isAuth} />
      </div>
    </div>
  );
}
