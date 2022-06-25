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
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


const Feed = (props) => {

  //  history.push("/") is used to navigate to other routes
  const history = useHistory();
  // STATE VARIABLE
  const [everyPost, setEveryPost] = useState([]);
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                   AXIOS GET FOR EVERY POST
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const grabEveryPost = () => {
    axios
      .get("/every/post")
      .then((res) => {
        pullPost(res.data);
      })
      .catch((err) => console.log("err from Feed.js axios call", err));
  };
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                     ADD POINT TO POST 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const addPoint = (id) => {
    console.log("This is the id being sent into axios for add point", id);
    axios.post("/add/point", {
      id
    })
      .then(res => {
        console.log("add point to post axios post", res)
      })
      .catch(err => {
        console.log("err from add point axios post", err);
      })
  }
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                   Grab keys put into array and grab each post 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullPost = (dict) => {
    let postKeys = Object.keys(dict)
    let postArr = [];
    for (let i = 0; i < postKeys.length; i++) {
      postArr.push(dict[postKeys[i]])
    }
    setEveryPost(postArr)
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
        <p className="flex w-full">
          <PersonIcon className="mt-6"
            sx={{ fontSize: 100 }}
            onClick={() => history.push("/profile")}
          />
          <h2 className="text-6xl text-blue-800 font-bold 
            underline mt-10 ml-60"> Home </h2>
        </p>
        <div style={{ margin: "2%" }}>
          {
            everyPost ? (
              everyPost.map((post, idx) => {
                return (
                  <div key={idx} className="flex flex-row 
                    justify-between mb-5 p-3 rounded
                    border-blue-900	bg-blue-200  
                    shadow-xl shadow-blue-300
                  ">
                    <div>
                      <p> @{post.user_name} </p>
                      <p> {post.post} </p>
                    </div>
                    <div>
                      <>- { } -</>
                      <p className=" " onClick={() => (addPoint(post.id))}> <DoneAll /> </p>
                    </div>
                  </div>
                )
              })
            ) : "Sorry posts aren't loading. Please try refreshing."
          }
        </div>
        {props.postForm ? <Post setPostForm={props.setPostForm} everyPost={everyPost} setEveryPost={setEveryPost} /> : null}
      </div>
      {/* RIGHT SIDE */}
      <NewsAPI />
    </div>
  );
};

export default Feed;
