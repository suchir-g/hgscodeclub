import { React, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { terminalResponses } from "./TerminalResponses";
import "./Terminal.css";

export default function Terminal({ isAuth }) {
  const [input, setInput] = useState("");
  const [testNewOutput, setTestNewOutput] = useState([]);
  const [jackState, setJackState] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={jackState ? "inverted terminalHolder" : "terminalHolder"}>
      <div className="terminalOutput" style={{ color: "#e5e5e5" }}>
        {testNewOutput.map((d) => (
          <p>
            <span style={{ color: "#e24e4e" }}>$ </span> {d}
          </p>
        ))}
        {!testNewOutput && "help clist problems login register post home clear"}
      </div>
      <div className="terminalInput">
        <div>
          <span style={{ color: "#f2f245" }}>$ </span>
          {"   "}
          <input
            className="terminalInputSingle"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="help"
            onKeyDown={async (e) => {
              // Jack i know your here
              // Stop snooping around...
              if (e.key === "Enter") {
                let clear = false;
                let newOutput = input + "\n";
                if (input.toLowerCase() in terminalResponses) {
                  newOutput += terminalResponses[input];
                } else {
                  switch (input.toLowerCase()) {
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
                      break;
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
                      clear = true;
                      break;
                    case "post":
                      navigate("/newProblem");
                      break;
                    case "create":
                      navigate("/newProblem");
                      break;
                    case "never gonna give you up":
                      newOutput += "never gonna let you down";
                      window.location =
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                      break;
                    case "ayan":
                      window.location =
                        "https://youtu.be/lQtaZ90V1SA?si=gKdEsgbMjeixjAHu";
                      newOutput +=
                        "ching cheng hanji song! (nav idea obviouly)";
                      break;
                    case "jack robinson":
                      setJackState(true);
                      newOutput += "stop snooping around... you'll regret it";
                      setTestNewOutput([newOutput + "\n", ...testNewOutput]);
                      await delay(5000);
                      for (let i = 0; i < 10; i++) {
                        window.open(
                          "https://www.entrepreneur.com/growing-a-business/jeff-bezos-biography-how-he-started-amazon-and-more/197608"
                        );
                      }
                      break;
                    default:
                      newOutput +=
                        "Unknown command. Type 'clist' for a list of all commands.";
                      break;
                  }
                }
                !clear
                  ? setTestNewOutput([newOutput + "\n", ...testNewOutput])
                  : setTestNewOutput(["clear" + "\n"]);
                setInput("");
              }
            }}
          />
        </div>
      </div>
      <script src="./fancyEffects.js"></script>
    </div>
  );
}
