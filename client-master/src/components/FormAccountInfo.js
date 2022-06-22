import React from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Register.css";

const FormAccountInfo = ({
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
  return (
    <div id="accountDetails">
      <p>
        <label>First Name </label>
        <TextField
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </p>

      <p>
        <label>Last Name </label>
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </p>

      <p>
        <label>Email </label>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
      </p>

      <p>
        <label>Password </label>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>

      <p>
        <label>Confirm Password </label>
        <TextField
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </p>
    </div>
  );
};

export default FormAccountInfo;
