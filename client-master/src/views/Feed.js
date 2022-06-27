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
  const [error, setError] = useState("");
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                   AXIOS GET FOR EVERY POST
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const grabEveryPost = () => {
    axios
      .get("/following/posts")
      .then((res) => {
        pullPost(res.data);
        setError("")
      })
      .catch((err) => console.log("err from Feed.js axios call", err));
  };
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                                     ADD POINT TO POST 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const addPoint = (id) => {
    axios.post("/add/point", {
      id
    })
      .then(res => {
        if (res.data["error"] === "You already liked this post!") {
          setError(res.data["error"])
          return "error"
        }
        console.log("add point to post axios post", res)
        setError("")
      })
      .catch(err => {
        console.log("err from add point axios post", err);
      })
  }
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

  let grabPoints = (id) => {
    axios.post("/count/points", {
      id
    })
      .then(res => {
        console.log("resesdsesssesessee", res.data['points'])
        let points = 0
        points = res.data["points"]
        console.log(points);
        return 
      })
      .catch(err => console.log(err))
    console.log("COUNT THEM POINTS BOOIIII! -- ");
    return 
  }
  
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                   Grab keys put into array and grab each post 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullPost = (dict) => {
    console.log(dict);
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
    <div id="mainBodyHomePage" >
      {/* LEFT SIDE */}
      <IconNav
        setPostForm={props.setPostForm}
        postForm={props.PostForm}
        renderPost={props.renderPost}
      />
      {/* Middle */}
      <div className="w-2/3">
        <div className="align-center border-4 bg-blue-300  w-full shadow-lg shadow-blue-300"
          style={{ marginLeft: "2%", width: "54.5vw" }}>
          <p className="hover:underline-offset-4">
            <PersonIcon className="mt-6 hover:border-b-4 hover:cursor-none"
              sx={{ fontSize: 100 }}
              onClick={() => history.push("/profile")}
            />
          </p>
          <h2 className="text-6xl text-blue-900 
              font-bold underline  ml-60">
            Home
          </h2>

        </div>
        {error}
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
                      {/* <> {(grabPoints(post.id))} </> */}
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
