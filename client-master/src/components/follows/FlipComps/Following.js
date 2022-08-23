import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const Following = () => {

    const [following, setFollowing] = useState([])

    const getFollowing = () => {
        axios.get('/follows')
            .then(res => {
                console.log("Got the following Obj from GET request", res.data["following"]);
                setFollowing(res.data['following'])
            })
            .then(() => {
                console.log("following -- ", following);
            })
            .catch(err => console.log(err))
    }
 
    let pullFollowing = (dict) => {
        console.log("Received obj", dict);
        let postArr = [];

        for (let i = 0; i < dict.length; i++) {
            postArr.push(dict[i].user_name)
        }

        console.log("ARR OF FOLLOWING - ", postArr)
        console.log(following, "following state var!");
        return following
    };
    const myRef = useRef(null);
    const scroll = () => scrollToRef(myRef)

    useEffect(() => {
        getFollowing()
    }, [])
    return (
        <div className="h-fit" onScroll={() => scroll()}>
            <h1 className="bg-blue-200 rounded-t-md h-10 mb-6 pt-2 shadow-xl shadow-blue-300 text-lg " >Following</h1>
            {
                following ? (
                    following.map((user, idx) => {
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
export default Following
