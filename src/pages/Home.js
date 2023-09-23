import React, { useEffect, useState } from "react";
import Terminal from "./Terminal/Terminal";
export default function Home({ isAuth }) {
  return (
      <div>Home
        <Terminal isAuth={isAuth}/>
      </div>
  );
}
