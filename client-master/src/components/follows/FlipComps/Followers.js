
import React, { useState, useEffect } from "react"
import axios from "axios"
const Followers = () => {

    const [follower, setFollower] = useState([])

    const getFollower = () => {
        axios.get('/follows')
            .then(res => {
                console.log("Got the follower Obj from GET request", res.data);
                setFollower(res.data['followers'])
            })
            .then(() => {
                console.log("follower -- ", follower);
            })
            .catch(err => console.log(err))
    } 
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

    useEffect(() => {
        getFollower()
    }, [])
    return (
        <div className="rounded">
            <h1 className="bg-blue-200 rounded-t-md h-10 mb-6 pt-2 shadow-xl shadow-blue-300 text-xl">Follower </h1>
            {
                follower ? (
                    follower.map((user, idx) => {
                        console.log("user -- ", user);
                        return (
                            <div key={idx}>
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
