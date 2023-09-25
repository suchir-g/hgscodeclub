import { React, useRef, useState, useEffect } from "react";
import "./Terminal.css";
import { useNavigate } from "react-router-dom";

export default function Terminal({ isAuth }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="terminalHolder">
      <div className="terminalOutput">{output || "help clist problems login register post home clear"}</div>
      <div className="terminalInput">
        <input
          className="terminalInputSingle"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              let newOutput = "";
              newOutput = output + "\n\n" + "$ " + input + "\n";
              switch (input) {
                case "help":
                  newOutput +=
                    "Use the terminal to get around this website. The commands will be listed for you if you type 'clist' into the text box. \n\n If you are still struggling, hover at the top of the screen to access the menu.";
                  break;
                case "clist":
                  newOutput +=
                    "problems: lists the problems \n weekly: shows the weekly problem \n login: login page \n profile: profile page \n users: look at all users \n about-us: tells you about us";
                  break;
                case "problems":
                  newOutput += "Navigating to problems";
                  navigate("/problems");
                  break;
                case "home":
                  newOutput += "Navigating to home";
                  navigate("/");
                  break;
                case "login":
                  if (isAuth) {
                    newOutput +=
                      "You are already logged in. Did you mean 'profile'?";
                  } else {
                    newOutput += "Navigating to login";
                    navigate("/login");
                  }
                  break;
                case "signup":
                  if (!isAuth) {
                    newOutput += "Navigating to signup";
                    navigate("/register");
                  } else {
                    newOutput +=
                      "You are already logged in. Did you mean 'profile'?";
                  }
                  break;
                case "register":
                  if (!isAuth) {
                    newOutput += "Navigating to signup";
                    navigate("/register");
                  } else {
                    newOutput +=
                      "You are already logged in. Did you mean 'profile'?";
                  }
                case "weekly":
                  newOutput += "we don# have that yet mb"
                case "profile":
                  if (isAuth) {
                    newOutput += "Navigating to profile";
                    navigate("/profile");
                  } else {
                    newOutput +=
                      "You aren't logged in yet. Did you mean 'login'?";
                  }
                  break;
                case "clear":
                  newOutput = "$ " + input;
                  break;
                case "ayan":
                  newOutput += "Go back FOREST!";
                  break;
                case "post":
                  navigate("/newProblem")
                  break;
                case "create":
                  navigate("/newProblem")
                default:
                  newOutput +=
                    "Unknown command. Type 'clist' for a list of all commands.";
                  break;
              }
              setOutput(newOutput);
              setInput("");
            }
          }}
        />
      </div>
    </div>
  );
}
