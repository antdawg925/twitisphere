
import React, { useState } from "react";
import axios from "axios";
import '../CSS/Post.css'

const Post = (props) => {
  // STATE VARIABLES 
  const [post, setPost] = useState([])
  const [postError, setPostError] = useState("")

  const postPost = (e) => {
    e.preventDefault();
    if( post.length < 1 ){
      setPostError("A post must contain a message");
      return postError;
    } else {
      console.log("POSTING THE POST");
      axios.post('/post/post', {
        post
      })
      .then(res => {
        console.log(res, "axios posted for /post/post");
        setPost(post)
        console.log("The post -- ", post);
        // props.setEveryPost([...props.everyPost, post])
        props.setPostForm(false);
      })
      .catch(err => {
        console.log(err, "WTFFFFFFFFFF");
      })
    }
  }


  return (
    <div className="main rounded justify-center w-2/5">

      <h3 className="headliner text-xl m=p-2">
        Post Now!
      </h3>
      <p className="m-3">{postError}</p>
      <form className="h-18 w-full"
        onSubmit={postPost}
        method="POST"
      >
        <textarea
          rows="10" cols="50"
          className="
            w-4/5 text-sm
            m-8 pb-10 p-3
            rounded
            border-solid border-2 
            whitespace-normal
          bg-slate-300 border-blue-900 "
          onChange={(e) => setPost(e.target.value)}
          value={post}
        ></textarea>

        <button className="button3">Post</button> <br />
        <button
          onClick={() => props.setPostForm(false)}
          className="but-del"
        >
          Cancel
        </button>

      </form>

    </div >

  );

};
export default Post;
