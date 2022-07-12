
import React, { useState, useEffect } from "react"
import axios from "axios"
const Followers = () => {

    const [follower, setFollower] = useState([])

    const getFollower = () => {
        axios.get('/follows')
            .then(res => {
                console.log("Got the follower Obj from GET request", res.data);
                setFollower(res.data['followers'])
                // pullFollower(res.data["follower"])
            })
            .then(() => {
                console.log("follower -- ", follower);
            })
            .catch(err => console.log(err))
    }

    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //                             HANDLE ALL INFORMATION RECEIVED FROM SQL QUERY AND 
    //                                       PROCESS ALL USERS POSTS 
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    let pullFollower = (dict) => {
        console.log("Received obj", dict);
        let postArr = [];

        for (let i = 0; i < dict.length; i++) {
            postArr.push(dict[i].user_name)
        }

        console.log("ARR OF follower - ", postArr)
        console.log(follower, "follower state var!");
        return follower
    };
    // ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

    useEffect(() => {
        getFollower()
    }, [])
    return (
        <div>
            <h1>Follower comp</h1>
            {/* {JSON.stringify(follower)} */}
            {
                follower ? (
                    follower.map((user, idx) => {
                        console.log("user -- ", user);
                        return (
                            <div key={idx}>
                                {/* {JSON.stringify(user)} */}
                                <h5>{user.user_name}</h5>
                            </div>
                        )
                    })

                ) : <p>"Not working"</p>
            }
        </div>
    )
}
export default Followers