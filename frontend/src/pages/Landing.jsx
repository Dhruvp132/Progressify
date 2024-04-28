import React, { useState } from "react";
import "./styles.css";
import LandingAdmin from "../components/Landing/LandingAdmin";
import LandingUser from "../components/Landing/LandingUser";

function Landing() {
    const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
    
      <div className={containerClass} id="container">
        <LandingAdmin  />
        <LandingUser />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hey There!</h1>
              <p>
               User, wanna explore your tasks?
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Let's Go
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello,</h1>
              <p>Admin, wanna assign task to users! </p>
      
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Landing;
