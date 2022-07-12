// \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
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
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

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

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                               GET ALL USERS POSTS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getUsersPosts = () => {
    axios.get("/users/posts")
      .then((res) => {
        pullPosts(res.data);
      })
      .catch(err => console.log(err, "**** AXIOS GET POSTS ERR ****"))
  }
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                              GET ALL USERS POSTS AND USERS INFO
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getUserInfo = () => {
    axios.get("/user/info")
      .then((res) => {
        console.log(res);
        setUserInfo(res.data)
      })
      .catch(err => console.log(err, "**** AXIOS GET USER INFO ERR ****"))
  }
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                   GET ALL FOLLOWS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                             HANDLE ALL INFORMATION RECEIVED FROM SQL QUERY AND 
  //                                       PROCESS ALL USERS POSTS 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullPosts = (dict) => {
    let postKeys = Object.keys(dict)
    let postObj = {};
    let postArr = [];
    for (let i = 0; i < postKeys.length; i++) {
      postArr.push(dict[postKeys[i]].post)
    }
    for (let i = 0; i < postObj.length; i++) {
      postArr.push(postObj[i], "")
    }
    setUsersPosts(postArr)
  };
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
  

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                          USEEFFECT-OOOO
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  useEffect(() => {
    getUsersPosts();
  }, [])
// ------------------
  useEffect(() => {
    getUserInfo();
  }, [])
// ------------------
  useEffect(() => {
    getFollows();
  }, [])
  // // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

  return (
    <div id="mainBodyHomePage">
      {/* ICON NAV BAR */}
      <IconNav setPostForm={props.setPostForm} postForm={props.PostForm} renderPost={props.renderPost} />
      {/* MAIN CONTENT OF PROFILE PAGE */}
      <div className="m-3 w-2/3">
        {/* HEADER OF USER PROFILE */}
        {/* USERS BACKGROUND AND PROFILE PIC WILL BE DISPLAYED HERE */}
        <div>
          {/* BIG IMAGE HERE */}
          {/* DELETE THIS DIV WHEN IMAGE IS READY */}
          <div id="tempImage"></div>
          {/* SMALL IMAGE HERE */}
          <div id="bottomOfPicture">
            <PersonIcon sx={{ fontSize: 100 }} id="userPic" />
            <p
              onClick={() => {
                setSettings(true)
              }}>
              <SettingsSuggestIcon sx={{ fontSize: 100 }} />
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
              // <h1>--{everyPost[1]}</h1>
              usersPosts.map((post, idx) => {
                return (
                  <div key={idx} className="
                  mb-5 p-3 rounded
                  border-blue-900	bg-blue-200  
                  shadow-xl shadow-blue-300
                ">
                    <p> {post} </p>
                    {/* <p> <DoneAll /> </p> */}
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
      {/* NEWS SIDE OF CONTENT */}
      <NewsAPI />
    </div>
  );
};

export default Profile;
