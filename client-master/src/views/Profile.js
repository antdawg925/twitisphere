// \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import React, {useState, useEffect} from "react";
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
// import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "../CSS/ProfilePage.css";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";
import Post from "../components/Post"
import axios from "axios";
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ



const Profile = (props) => {
  // let arrow = "<-";
  
  // STATE VARIABLES
  const [userId, setUserId] = useState(0)
  const [editProfile, setEditProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [image, setImage] = useState();
  const [userName, setUserName] = useState();
  const [usersPosts, setUsersPosts] = useState([""]);
  const [userAndPosts, setUserAndPosts] = useState([[]]);

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                   GET ALL USERS POSTS
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getUsersPosts = () => {
    axios.get("/users/posts")
      .then((res) => {
        pullPosts(res.data);
        // console.log(res,"****** users posts res from axios *****");
      })
      .catch(err => console.log(err, "**** AXIOS GET POSTS ERR ****"))
  }
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                 GET ALL USERS POSTS AND USERS INFO
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getUserAndPosts = () => {
    axios.get("/user/and/posts")
      .then((res) => {
        pullUserAndPosts(res.data);
        // console.log(res,"****** users posts res from axios *****");
      })
      .catch(err => console.log(err, "**** AXIOS GET POSTS ERR ****"))
  }
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                   GET LOGGED IN USERS ID
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const getUserId = () => {
    axios.get("/get/user/id")
      .then((res) => {
        console.log(res.data['id'],"****** get user id res from axios *****");
        // setUserId(res);
        setUserId(res.data['id'])
        console.log("userId in state -- ", userId);
        if(userId === 0){
          setUserId(res.data["id"])
          console.log("userId reInstated -- ", userId);

        }
      })
      .catch(err => console.log(err, "**** GET USER NAME AXIOS FAIL ****"))
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
  for (let i=0; i < postKeys.length ; i++) {
    postArr.push(dict[postKeys[i]].post)
  }
  for ( let i=0; i < postObj.length; i++){
    postArr.push(postObj[i], "")
  }

  // console.log("****", dict);
  // console.log("++++ EVERY POST IN SQL ++++", postArr);
  setUsersPosts(postArr)
  // console.log("++++++++", everyPost.map(post => post), "++++++++");
};
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                              HANDLE ALL INFORMATION RECEIVED FROM SQL QUERY AND 
//                                    PROCESS ALL USERS POSTS AND INFO
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
let pullUserAndPosts = (dict) => {
  let postKeys = Object.keys(dict)
  let postObj = {};
  let postArr = [];
  // console.log("**** PULL USER AND POSTS ********");
  for (let i=0; i < postKeys.length ; i++) {
    postArr.push(dict[postKeys[i]])
  }
  for ( let i=0; i < postObj.length; i++){
    postArr.push(postObj[i], "")
  }

  // console.log("****", postObj);
  // console.log("++++** EVERY POST IN SQL **++++", postArr);
  setUserAndPosts(postArr)
  // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
  // console.log("++++++++", everyPost.map(post => post), "++++++++");
};
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                                    GRAB USER NAME
//                                  STILL HAVING TROUBLE
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
let pullUserName = (dict) => {
  let postKeys = Object.keys(dict)
  let postObj = {};
  let postArr = [];
  console.log("**** PULL USER NAME ********");
  for (let i=0; i < postKeys.length ; i++) {
    postArr.push(dict[postKeys[i]])
  }
  for ( let i=0; i < postObj.length; i++){
    postArr.push(postObj[i], "")
  }
  // console.log("****", postObj);
  console.log("++++** EVERY POST IN SQL **++++", postArr);
  setUserAndPosts(postArr)
  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
  // console.log("++++++++", everyPost.map(post => post), "++++++++");
};
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                                          USEEFFECT-OOOO
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   // useEffect
   useEffect(() => {
    getUsersPosts();
  }, [])
   // useEffect
   useEffect(() => {
    getUserAndPosts();
  }, [])
   // useEffect
   useEffect(() => {
    getUserId();
  }, [])
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // let imageUpload = (e) => {
  //   console.log(e.target.files);
  //   setImage(e.target)
  // }

  return (
    <div id="mainBodyHomePage">
      {/* ICON NAV BAR */}
      <IconNav setPostForm={props.setPostForm} postForm={props.PostForm} renderPost={props.renderPost}/>
      {/* MAIN CONTENT OF PROFILE PAGE */}
      <div id="profilePageUser" className="m-3">
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
              onClick={()=>setEditProfile(true)}>
              <SettingsSuggestIcon sx={{ fontSize: 100 }} />
            </p>
          </div>
          {
            userAndPosts[0] ? (
              <div>
                <h2>{userAndPosts[0].first_name}</h2>
                <p>@{userAndPosts[0].user_name}</p> 
                <div className="flex">
                  <p>X :Following</p>
                  <p>X :Followers</p>
                </div>
                <h1>Posts:{usersPosts.length}</h1>
                <hr />
              </div>

            ) : (
            <div> 
              <h2>Name</h2>
              <p>@Name</p> 
                <div className="flex">
                <p>X :Following</p>
                <p>X :Followers</p>
              </div>
              <h1>Posts:</h1>
              <hr />
            </div>
            )
          }

          <h1 className="bg-red-400">X{JSON.stringify(userName)}X</h1>
          {
            userName ? (
              <h1>HELLOOO ****{userName.email}</h1>

            ):""
          }
          {
            usersPosts ? (
              // <h1>--{everyPost[1]}</h1>
              usersPosts.map((post, idx) => {
                return(
                  <div key={idx} className="border-2 border-blue-900 rounded	bg-blue-200 mb-1 p-3 ">
                    <p> {post} </p>
                    {/* <p> <DoneAll /> </p> */}
                  </div>
                )
              })
            ) :"Users posts aren't loading!!"

          }
          -- {JSON.stringify(userAndPosts)} --
          -- {JSON.stringify(userId)} --
        </div>
        { props.postForm ? <Post setPostForm={props.setPostForm}  /> : null }

        {
          editProfile ? (
            <EditProfile setImage={setImage} image={image} setEditProfile={setEditProfile} setSettings={setSettings}/>
          ) : ""
        }
        {
          settings ? (
            <Settings setSettings={setSettings} />
          ) : ""
        }
      </div>
      {/* NEW SIDE OF CONTENT */}
      <NewsAPI />
    </div>
  );
};

export default Profile;
