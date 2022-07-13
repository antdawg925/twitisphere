
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import People from "@mui/icons-material/People";
import "../CSS/HomePage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";


const IconNav = (props) => {
  //  history.push("/") is used to navigate to other routes
  const history = useHistory();
  const handleHome = () => {
    history.push("/home/feed");
  };

  const logOut = () => {
    axios.get("/logout")
      .then(res => {
        console.log("users logout axios has been triggered -- ", res);
        localStorage.setItem("logged_in", "no")
        history.push("/")
      })
      .catch(err => {
        console.log("logout axios somehting went wrong -- ", err);
      })
  }


  return (
    <div id="icons" className="min-w-fit px-2">
      <HomeIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <NotificationsIcon sx={{ fontSize: 100 }} />
      <ChatBubbleIcon sx={{ fontSize: 100 }} />
      <People sx={{ fontSize: 100 }} onClick={() => (history.push("/find/users"))} />

      <button className="
        button-10 rounded 
        font-bold text-base
        p-2 w-2/3 min-w-fit 
        absolute left-6 bottom-16"
        onClick={() => props.renderPost()}
      >
        Create Post
      </button>
      <button className="button-10 rounded 
        font-bold text-base
        p-2 w-2/3 
        absolute left-6 bottom-5"
        onClick={() => logOut()}>
        LOG OUT
      </button>
      {/* {postForm ? <Post setPostForm={setPostForm} /> : ""} */}
    </div>
  );
};

export default IconNav;
