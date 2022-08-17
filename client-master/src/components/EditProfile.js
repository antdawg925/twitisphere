
import React, { useState } from "react";
import axios from "axios";
import "../CSS/EditProfile.css";


const EditProfile = (props) => {
  // Post image to API
  //---------- NOT YET IMPLEMENTED -----
  const axiosImage = (e) => {
    e.preventDefault();
    axios.post("https://api.imgbb.com/1/upload?expiration=600&key=d5ed21ef35be30a8aa6fb22713ce529f&image=" + props.image)
      .then((res) => {
        // const {apiData} = res.data; 
        console.log(res.data)
        props.setImage(props.image.files[0]);
        console.log(props.image.files[0]);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="center1">
      <p className="text-slate-700 ml-14 my-8 border-2 border-blue-900 w-1/6 text-center rounded-full">PROFILE <br /> IMAGE </p>
      {/* convert to base 64 string */}
      {/* ----------------------------------------------------------------------------------------------------------- */}
      <h1 style={{marginLeft:"3.45rem"}}>{props.image}</h1>
      <form onSubmit={axiosImage}>
        <input type="file" className="mx-14 text-base block text-slate-700" onChange={(e) => props.setImage(e.target.value)} />
        <button className="edit-btn mx-14 my-4" onClick={(e) => axiosImage(e)}>Save changes</button>
      </form>
      {/* ----------------------------------------------------------------------------------------------------------- */}
      <form className="flex flex-col">

        <input type="text" className="text-base mx-14 my-2 p-1" placeholder="First Name" />

        <input type="text" className="text-base mx-14 my-2 p-1" placeholder="Last Name" />

        <input type="text" className="text-base mx-14 my-2 p-1" placeholder="Bio:" />

        <input type="text" className="text-base mx-14 my-2 p-1" placeholder="Location:" />

        <button className="edit-btn w-1/6 mx-14 my-4 min-w-fit">Submit</button>

      </form>
      <button className="edit-btn btm mx-14"
        onClick={() => {
          props.setEditProfile(false)
          props.setSettings(true)
        }}>Adjust Your Settings!</button><br />
      <button className="cancel"
        onClick={() => props.setEditProfile(false)}>Cancel</button>

    </div>
  );
};
export default EditProfile;
