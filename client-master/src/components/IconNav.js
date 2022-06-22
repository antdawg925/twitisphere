import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import People from "@mui/icons-material/People";
import "../CSS/HomePage.css";
import { useHistory } from "react-router-dom";
import Post from "../components/Post";

const IconNav = (props) => {
  const history = useHistory();
  const handleHome = () => {
    history.push("/home/feed");
  };




  return (
    <div id="icons" className="min-w-fit">
      <HomeIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <NotificationsIcon sx={{ fontSize: 100 }} />
      <ChatBubbleIcon sx={{ fontSize: 100 }} />
      <People sx={{ fontSize: 100 }} onClick={() => (history.push("/find/users"))}/>

      <button className="
        button-10 rounded 
        font-bold text-smS
        p-2 w-1/2 min-w-fit 
        absolute left-6 bottom-5" 
        onClick={() => props.renderPost()}
      >
        Create Post
      </button>
      {/* {postForm ? <Post setPostForm={setPostForm} /> : ""} */}
    </div>
  );
};

export default IconNav;
