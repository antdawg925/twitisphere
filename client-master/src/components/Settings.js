// \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import React, { useState } from "react";
import "../CSS/EditProfile.css";
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

const Settings = (props) => {

  // STATE VARIABLES 
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <div className="center">
      <h1 className="title text-4xl">User Settings</h1>
      <div className=" flex justify-between p-5 ">
        <button className="edit-btn   "
          onClick={() => {
            setEditEmail(true)
            setEditPassword(false)
          }}>Edit Email</button>
        <button className="edit-btn "
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
      <button className="cancel"
        onClick={() => props.setSettings(false)}>Cancel</button>
    </div>
  );
};
export default Settings;
