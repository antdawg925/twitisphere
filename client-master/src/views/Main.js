
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Main.css";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Orbital } from "../components/Orbital";

const Main = () => {
  //  history.push("/") is used to navigate to other routes
  const history = useHistory();

  const checkLoggedIn = () => {
    if (localStorage.getItem("logged_in") === "yes") {
      history.push('/profile')
    }
  }
  // useEffect
  useEffect(() => {
    checkLoggedIn();
  }, [])


  return (
    <div id="leftCol">
      <img src="https://cdn-icons-gif.flaticon.com/6172/6172532.gif" alt="roto" style={{marginLeft:"6%"}} />

      <div id="rightCol">

        <h2>Join "Twitisphere" today.</h2>

        <button className="bg-teal-300 border-solid border-4 p-1 rounded border-blue-800" onClick={() => history.push("/register")}>Sign up with an email</button>

        <h3>Already have an account?</h3>

        <button className="bg-teal-300 border-solid border-4 p-1 rounded border-blue-800" onClick={() => history.push("/login")}>Sign in</button>

      </div>
    </div>
  );
};

export default Main;
