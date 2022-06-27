import React, {useState, useEffect} from "react"
import axios from "axios"
const Following = () => {

    const [following, setFollowing] = useState("")

    const getFollowing = () => {
        axios.get('/follows')
            .then (res => {
                console.log("??????????",res.data["following"]);
                // setFollowing(res.data['following'])
                pullFollowing(res.data["following"])
                console.log("following -- ",following);
                
            })
    }
    
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                             HANDLE ALL INFORMATION RECEIVED FROM SQL QUERY AND 
  //                                       PROCESS ALL USERS POSTS 
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullFollowing = (dict) => {
    console.log(dict,")))))))");
    let postObj = {};
    let postArr = [];

    for (let i = 0; i < dict.length; i++) {
      postArr.push(dict[i].user_name)
    }
    for (let i = 0; i < postObj.length; i++) {
      postArr.push(postObj[i], "")
    }
    console.log("EERRERER",postArr)
    setFollowing(postArr)
    console.log(following, "_________");
    return following
  };
  // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
  
    useEffect(() => {
        getFollowing()
    }, [])
    return ( 
        <div>
            <h1>Following comp</h1>
            {
                following ? (
                    following.map((following, idx) => {
                        <div key={idx}>
                            <h5>{following[idx]}</h5>
                        </div>
                    })

                ) : null
            }
        </div>
    )
}
export default Following