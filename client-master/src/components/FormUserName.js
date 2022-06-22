import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom"
import axios from "axios";
const FormUserName = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
}) => {
  
  const [userName, setUserName] = useState("");
  const history = useHistory();

  const first_name = firstName;
  const last_name = lastName ;
  const  user_name = userName ;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/post/user',{
      first_name,
      last_name,
      email,
      password,
      user_name
    })
      .then(res => {
        console.log(res);
        console.log("Hello");
        history("/profile");
        setUserName(userName)
      })
        .catch(err => {
          console.log("Something went wrong");
        })
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello {firstName}</h1>
      <h2>Pick a user name for your account</h2>
      <label>User Name</label>
      <TextField
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
S      />
    </form>
  );
};

export default FormUserName;
