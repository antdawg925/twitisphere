// \\\\\\<$A$>///////\\\\\\<$A$>///////  ___________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

const Login = () => {
    //  history.push("/") is used to navigate to other routes
    const history = useHistory()
    // STATE VARIABLES 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkLoggedIn = () => {
        if (localStorage.getItem("logged_in") == "yes") {
            history.push('/profile')
        }
    }
    // useEffect
    useEffect(() => {
        checkLoggedIn();
    }, [])

    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //                         LETS USER LOGIN TO THEIR ACCOUNT
    // ______________________________________________________________________________________________________
    let loginUser = (e) => {
        e.preventDefault();
        console.log("Lets log the email! --", email);
        axios.post("/login", {
            email,
            password
        })
            .then(res => {
                console.log("*************** email axios res -- ", res);
                localStorage.setItem("logged_in", "yes");
                history.push('/profile')
            })
            .catch(err => {
                console.log("err from axios post Login.js -- ", err);
                // console.log("email or password is hopefullly just wrong Login.js ");
            })
    }
    //  ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


    return (
        <div className='bg-slate-100 ' style={{ height: "100vh" }}>
            <h1 className="text-center text-4xl tex w-full h-14 pt-2 mb-20 bg-blue-400 shadow-2xl shadow-blue-500">Login </h1>
            <form onSubmit={loginUser} method="POST" className="ml-20  ">

                <div className="mb-5">
                    <h3 className='font-bold text-lg'>Email</h3>
                    <input type="email" value={email} name="email" className="text-2xl rounded p-1"

                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <h3 className='font-bold text-lg'>Password</h3>
                    <input type="password" value={password} name="password" className="text-2xl rounded p-1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="rounded m-2 border-4 p-1 h-1/10 border-blue-300 text-stone-500">Submit!</button>
                <a href="/register" className="rounded m-2 border-4 p-1 h-1/10 border-blue-300 text-stone-500">Register Now!</a>
            </form>
        </div>
    )
}
export default Login;