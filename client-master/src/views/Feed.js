// \\\\\\<$A$>///////\\\\\\<$A$>///////  _________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/HomePage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import IconNav from "../components/IconNav";
import Post from "../components/Post";
import NewsAPI from "../components/NewsAPI";
import DoneAll from "@mui/icons-material/DoneAll";


// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// -------------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


const Feed = (props) => {

//  history.push("/") is used to navigate to other routes
  const history = useHistory();

  const [everyPost, setEveryPost] = useState([]);
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                                  AXIOS GET FOR EVERY POST
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 
  const grabEveryPost = () => {
    axios
      .get("/every/post")
      .then((res) => {
        // console.log("** RES FOR EVERY POST **", res);
        // console.log("** OBJECT KEYS **", Object.keys(res.data));
        // setEveryPost(res);
        pullPost(res.data);
      })
      .catch((err) => console.log("err from Feed.js axios call", err));
  };
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

const addPoint = (id) => {
  console.log("This is the id being sent into axios for add point",id);
  axios.post("/add/point", {
    id
  })
    .then(res => {
      console.log("add point to post axios post",res)
    })
    .catch(err =>{
      console.log("err from add point axios post",err);
    } )
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                   Grab keys put into array and grab each post 
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullPost = (dict) => {
    let postKeys = Object.keys(dict)
    // let postObj = {};
    let postArr = [];
    for (let i=0; i < postKeys.length ; i++) {
      // console.log(dict[postKeys[i]].post, "-- is dict[i]");
      postArr.push(dict[postKeys[i]])
      // postObj.push(dict[postKeys[i]].post)
    }
    // console.log("Mystery of what is postObj -- ", postObj);
    // console.log("Mystery of what postObj is!! -- ",postObj[1]);
    // for ( let i=0; i < postObj.length; i++){
    //   postArr.push(postObj[i], "")
    // }

    // console.log("****", postObj);
    console.log("++++ EVERY POST IN SQL ++++", postArr);
    setEveryPost(postArr)
    // console.log("++++++++", everyPost.map(post => post), "++++++++");
  };
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                                          USEEFFECT-OOOO
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  useEffect(() => {
    grabEveryPost();
  }, []);
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ



  return (
    <div id="mainBodyHomePage">
      {/* LEFT SIDE */}
      <IconNav
        setPostForm={props.setPostForm}
        postForm={props.PostForm}
        renderPost={props.renderPost}
      />

      {/* Middle */}
      <div id="allContent">
        <h2>Home</h2>

        <p className="flex">
          <PersonIcon
            sx={{ fontSize: 100 }}
            onClick={() => history.push("/profile")}
          />
          <input placeholder="What's happening?" />
        </p>
        {JSON.stringify(everyPost)}
        <div style={{margin:"2%"}}>
          {/* {JSON.stringify(everyPost)} */}
          {
            everyPost ? (
              // <h1>--{everyPost[1]}</h1>
              everyPost.map((post, idx) => {
                return(
                  <div key={idx} className="flex flex-row 
                    justify-between 
                    mb-5 p-3
                    rounded
                    border-blue-900	bg-blue-200  
                    shadow-xl shadow-blue-300
                  ">
                    <p> {post.post} </p>
                    {/* <p > {post.id} </p> */}
                    <div>
                      <>0</>
                      <>- {} -</>
                      <p className=" " onClick={() => (addPoint(post.id))}> <DoneAll /> </p>
                    </div>
                  </div>
                )
              })
            ) :"XXXXXXXXXXXXXXXX"

          }
          
        </div>

        <h4>{JSON.stringify(everyPost.data)}</h4>

        {props.postForm ? <Post setPostForm={props.setPostForm} /> : null}
      </div>
      {/* RIGHT SIDE */}

      <NewsAPI />
    </div>
  );
};

export default Feed;
