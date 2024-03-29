
import React, { useState } from "react";
import "../CSS/EditProfile.css";

const Settings = (props) => {

  // STATE VARIABLES 
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <div className="center">
      <h1 className="shadow-xl shadow-blue-300 bg-blue-200 p-3 text-4xl">User Settings</h1>
      <div className=" flex justify-between p-5 ">
        <button className="
          edit-btn w-1/2 m-3"
          onClick={() => {
            setEditEmail(true)
            setEditPassword(false)
          }}>Edit Email</button>
        <button className="edit-btn w-1/2 m-3 "
          onClick={() => {
            setEditEmail(false)
            setEditPassword(true)
          }}>Change Password</button><br />
      </div>
      {
        editEmail ? (
          <div>
            <input type='text' className="text-base mx-14 my-2 p-1 w-4/5" placeholder="New email to use" />
            <input type='text' className="text-base mx-14 my-2 p-1 w-4/5" placeholder="Confirm new email" />
          </div>
        ) : ''
      }
      {
        editPassword ? (
          <div>
            <input type='text' className="text-base ml-14 my-2 p-1 w-4/5" placeholder="Enter old password" />
            <input type='text' className="text-base ml-14 my-2 p-1 w-4/5" placeholder="Enter new password" />
            <input type='text' className="text-base ml-14 my-2 p-1 w-4/5" placeholder="Confirm new password" />
          </div>
        ) : ''
      }
      <h2 className="m-3"> This feature will be added in version 2! </h2>
      <button className="cancel"
        onClick={() => props.setSettings(false)}>Cancel</button>
    </div>
  );
};
export default Settings;
