import React, {useState} from "react";
import axios from "axios";
import "../CSS/EditProfile.css";

const EditProfile = (props) => {

  let selectedFileHandler = (e) => {
    console.log(e);
  }

   // Post image to API
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

  // const funct = (e) => {
  //   e.preventDefault()
  //   console.log(props.image);
  // }

  return (
    <div className="center1">
      <p className="pic">PROFILE IMAGE </p>
      {/* convert to base 64 string */}
      {/* ----------------------------------------------------------------------------------------------------------- */}
      <form onSubmit={axiosImage}>
        <input type="file" onChange={(e) => props.setImage(e.target.value)} />
        <button className="edit-btn" onClick={(e)=> axiosImage(e)}>Save changes</button>
      </form>
      {/* ----------------------------------------------------------------------------------------------------------- */}
      <form >
       
          <input type="text" className="input" placeholder="First Name"/> 

          <input type="text" className="input" placeholder="Last Name"/>  

          <input type="text" className="input" placeholder="Bio:" />

          <input type="text" className="input" placeholder="Location:" />

        <button className="edit-btn">Submit</button>

      </form>
      <h1>-- {JSON.stringify(props.image)} --</h1>
      <button className="edit-btn btm"
        onClick={()=> {
          props.setEditProfile(false)
          props.setSettings(true)
        }}>Adjust Your Settings!</button><br/>
      <button className="cancel"
        onClick={()=> props.setEditProfile(false)}>Cancel</button>

    </div>
  );
};
export default EditProfile;
