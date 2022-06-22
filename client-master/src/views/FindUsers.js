import React, { useState, useEffect, useReducer } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import SettingsAccessibility from "@mui/icons-material/SettingsAccessibility";


const FindUsers = () => {
    const history = useHistory();
    const [everyUser, setEveryUser] = useState([]);
    const grabEveryUser = () => {
        axios
          .get("/every/user")
          .then((res) => {
            // console.log("** RES FOR EVERY POST **", res);
            // console.log("** OBJECT KEYS **", Object.keys(res.data));
            // setEveryUser(res.data)
            console.log(res, "RESSSSEESSES.DATA");
            pullUsers(res.data);
          })
          .catch((err) => console.log("err from FindUsers.js axios call", err));
      };

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                              Grab keys put into array and grab each post 
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  let pullUsers = (dict) => {
    let userKeys = Object.keys(dict)
    let userArr = [];
    console.log("user dicts -- ", dict);
    for (let i=0; i < userKeys.length ; i++) {
      console.log(dict[userKeys[i]], "-- is first name dict[i]*********************");
      userArr.push( dict[userKeys[i]] );
      console.log("userArr --  ", userArr);
    }
    console.log("++++++++", userArr);
    setEveryUser(userArr)
  };
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

let followUser = (id) => {
  id.preventDefault();
  axios.post("/follow",{
    id
  })
  console.log(id);
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                                          USEEFFECT-OOOO
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  useEffect(() => {
    grabEveryUser();
  }, []);
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

    return(
        <div>
            <h1 className="bg-blue-900 text-white text-center text-xl h-16 pt-4">Find other users!</h1>
            {/* <h2>{JSON.stringify(everyUser)}</h2> */}
            {

                everyUser.map((user, idx) => {
                  return(
                    <div key={idx} className="border-solid border-2 h-10 border-gray-500 m-2 mb-3 rounded flex flex-row justify-between">
                      <p className="ml-6"> Users ID :{user.id} </p>
                      <p className=""> Users Name : {user.first_name} </p>
                      <p className="" > Username : {user.user_name}{user.last_name} </p>
                      <p className="mr-6" onClick={()=> followUser(user.id)}> <SettingsAccessibility /> </p>
                    </div>
                  )
              })

            }
            
            <p className="cursor-pointer bg-blue-900 w-fit text-white rounded p-1 m-2 hover:bg-slate-500" onClick={() => (history.push("/home/feed"))}>Home</p>
        </div>
    )}
export default FindUsers