
import React, { useState, useEffect } from "react";
import Follows from "../components/follows/Follows"
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "../CSS/ProfilePage.css";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";
import Post from "../components/Post"
import axios from "axios";
const Profile = (props) => {

  // STATE VARIABLES
  const [userInfo, setUserInfo] = useState({})
  const [editProfile, setEditProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [image, setImage] = useState({});
  const [followers, setFollowers] = useState({});
  const [following, setFollowing] = useState({});
  const [usersPosts, setUsersPosts] = useState([""]);

  // State variables for follows component
  const [followsComp, setFollowsComp] = useState(false)
  const [followersComp, setFollowersComp] = useState(false)
  const [followingComp, setFollowingComp] = useState(false) 

  const getUsersPosts = () => {
    axios.get("/users/posts")
      .then((res) => {
        pullPosts(res.data);
      })
      .catch(err => console.log(err, "**** AXIOS GET POSTS ERR ****"))
  }
  
  const getUserInfo = () => {
    axios.get("/user/info")
      .then((res) => {
        console.log(res);
        setUserInfo(res.data)
      })
      .catch(err => console.log(err, "**** AXIOS GET USER INFO ERR ****"))
  }
  const getFollows = () => {
    axios.get("/follows")
      .then((res) => {
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      })
      .catch(err => {
        console.log("**** AXIOS GET FOLLOWS ERR ****", err)
      })
  }
  
  let pullPosts = (dict) => {
    let postKeys = Object.keys(dict)
    let postArr = [];
    for (let i = 0; i < postKeys.length; i++) {
      postArr.push(dict[postKeys[i]])
    }
    setUsersPosts(postArr)
  };

  useEffect(() => {
    getUsersPosts();
    getUserInfo();
    getFollows();
  }, [])

  

  return (
    <div id="mainBodyHomePage">
      <IconNav setPostForm={props.setPostForm} postForm={props.PostForm} renderPost={props.renderPost} />
      <div className="m-3 w-2/3">
        <div>
          <div id="tempImage"></div>
          <div id="bottomOfPicture">
            <PersonIcon sx={{ fontSize: 100 }} id="userPic" />
            <p
              onClick={() => {
                setSettings(true)
              }}>
              <SettingsSuggestIcon sx={{ fontSize: 100 }}  />
            </p>
          </div>

          <div>
            <h2>{userInfo.first_name} {userInfo.last_name}</h2>
            <p>@{userInfo.user_name}</p>
            <div className="flex">
              <p className="mr-2"
              onClick={() => {
                setFollowsComp(true)
                setFollowingComp(true)
                setFollowersComp(false)
              }}>{following.length} :Following </p>
              <p onClick={() => {
                setFollowsComp(true)
                setFollowersComp(true)
                setFollowingComp(false)
              }}> {followers.length} :Followers</p>
            </div>
            <h1>Posts: {usersPosts.length}</h1>
            <hr />
          </div>

          {
            usersPosts ? (
              usersPosts.map((post, idx) => {
                return (
                  <div key={idx} className="
                    mb-5 p-4 rounded
                    border-blue-900	bg-blue-200  
                    shadow-xl shadow-blue-300 flex justify-between
                  ">
                    <p> {post.post} </p>
                    <p> Points: {post.points} </p>
                  </div>
                )
              })
            ) : "Users posts aren't loading!!"
          }
        </div>
        {props.postForm ? <Post setPostForm={props.setPostForm} /> : null}

        {
          editProfile ? (
            <EditProfile setImage={setImage} 
            image={image} 
            setEditProfile={setEditProfile} 
            setSettings={setSettings} />
          ) : ""
        }
        {
          settings ? (
            <Settings setSettings={setSettings} />
          ) : ""
        }
        {
          followsComp ? (
            <Follows 
              followsComp={followsComp}
              setFollowsComp={setFollowsComp}
              followersComp={followersComp}
              setFollowersComp={setFollowersComp}
              followingComp={followingComp}
              setFollowingComp={setFollowingComp}
              />
          ): ""
        }
      </div>
      <NewsAPI />
    </div>
  );
};

export default Profile;
