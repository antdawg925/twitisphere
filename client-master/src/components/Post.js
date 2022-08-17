
import React, { useState } from "react";
import axios from "axios";
import '../CSS/Post.css'

const Post = (props) => {
  // STATE VARIABLES 
  const [post, setPost] = useState([])

  const postPost = (e) => {
    e.preventDefault();
    console.log("POSTING THE POST");
    axios.post('/post/post', {
      post
    })
      .then(res => {
        console.log(res, "axios posted for /post/post");
        setPost(post)
        console.log("The post -- ", post);
        // props.setEveryPost([...props.everyPost, post])
        props.setPostForm(false)
      })
      .catch(err => {
        console.log(err, "WTFFFFFFFFFF");
      })
  }


  return ( 
    <div className="main rounded justify-center w-2/5">

      <h3 className="headliner">
        Post Now!
      </h3>

      <form className="h-18 w-full"
        onSubmit={postPost}
        method="POST"
      >
        <input
          className="w-4/5 h-80 text-sm
                      m-2 p-3
                      rounded
                      border-solid border-2 
                      whitespace-normal
                    bg-slate-300 border-blue-900 "
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />

        <button className="button3">Post</button> <br />

        <button
          onClick={() => props.setPostForm(false)}
          className="but-del"
        >
          Cancel
        </button>

      </form>

    </div>

  );
  
};
export default Post;
