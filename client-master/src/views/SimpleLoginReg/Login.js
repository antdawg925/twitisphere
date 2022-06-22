// \\\\\\<$A$>///////\\\\\\<$A$>///////  ___________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import axios from "axios";
import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

const Login = () => {
    //  history.push("/") is used to navigate to other routes
    const history = useHistory()
    // STATE VARIABLES 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//                         LETS USER LOGIN TO THEIR ACCOUNT
// ______________________________________________________________________________________________________
    let loginUser = (e) => {
        e.preventDefault();
        // console.log("eee",e);
        console.log("Lets log the email! --", email);
        axios.post("/login",{
            email,
            password
        })
        .then(res => {
            console.log("***************");
            localStorage.clear();
            localStorage.setItem("email", email);
            history.push('/profile')
        })
        .catch(err => {
            console.log("err from axios post Login.js -- ", err);
            // console.log("email or password is hopefullly just wrong Login.js ");
        })
    }
//  ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


    return (
        <div>
            <form onSubmit={loginUser} method="POST" className="reg">
                <h1 className="title">Login </h1>
                
                <div className="column spc_btwn"> 
                    <h3>Email</h3>
                    <input type="email" value={email} name="email"
                    
                    onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div>
                <div className="column spc_btwn"> 
                    <h3>Password</h3>
                    <input type="text" value={password} name="password"
                    
                    onChange={(e) => setPassword(e.target.value)}
                    /> 
                </div>

                <input type="submit" value='Submit' className="button-15"/>
                <a href="/register" className="button-15">Register!</a>
            </form>
        </div>
    )
}
export default Login;