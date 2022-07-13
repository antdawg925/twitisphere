import React, { useState, useEffect, useReducer } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import SettingsAccessibility from "@mui/icons-material/SettingsAccessibility";

const FindUsers = () => 
{
  //  history.push("/") is used to navigate to other routes
  const history = useHistory();
  // STATE VARIABLE
  const [everyUser, setEveryUser] = useState([]);
  const [error, setError] = useState("");


  //  CHECK TO SEE IF USER IS LOGGED IN
  const checkLoggedIn = () => {
    if (localStorage.getItem("logged_in") != "yes") {
      history.push('/')
    }
  }


  //  GRAB EVERY USER FROM SQL
  const grabEveryUser = () => {
    axios
      .get("/every/user")
      .then((res) => {
        pullUsers(res.data);
      })
      .catch((err) => console.log("err from FindUsers.js axios call", err));
  };


  // Grab keys put into array and grab each post 
  let pullUsers = (dict) => {
    let userKeys = Object.keys(dict)
    let userArr = [];
    for (let i = 0; i < userKeys.length; i++) {
      userArr.push(dict[userKeys[i]]);
    }
    setEveryUser(userArr)
  };

  //  FUNCTION TO FOLLOW A USER
  let followUser = (id) => {
    //Check if following already
    axios.post("/follow", {
      id
    })
      .then(res => {
        if(res.data["error"] === "You already follow them!"){
          // console.log("I caught the error message! -- ",res.data["error"])
          setError(res.data["error"])
          return error
        }
        setError("")
        // console.log("follow shoulda been successful", res);
      })
      .catch(err => {
        console.log("follow axios errrr", err);
      })

  }


  useEffect(() => {
    checkLoggedIn();
  }, [])
  useEffect(() => {
    grabEveryUser();
  }, []);
 
  return (
    <div className="">
      <h1 className="bg-blue-900 text-white text-center text-xl h-16 pt-4">Find other users!</h1>
      <p className="cursor-pointer bg-blue-900 
              w-20 p-1 m-2 text-center 
              text-white rounded  hover:bg-slate-500"
        onClick={() => (history.push("/home/feed"))}>Home</p>
        {
          error ? (
            <h3 className="text-center font-bold  text-red-500 text-xl">{error}</h3>
          ):null
        }
      {
        everyUser.map((user, idx) => {
          return (
            <div key={idx} style={{ marginLeft: "25%" }}
              className="border-solid border-2
                    border-gray-500
                      h-10  m-2 mb-3 w-1/2 
                      rounded flex flex-row 
                      justify-between">
              <p className="ml-2" > @Name : {user.user_name}</p>
              <p className=""> Users Name : {user.first_name} {user.last_name} </p>
              <p className="mr-6 hover:cursor-cell" onClick={() => followUser(user.id)}> <SettingsAccessibility /> </p>
            </div>
          )
        })
      }
    </div>
  )
}
export default FindUsers
