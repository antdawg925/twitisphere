import axios from 'axios';
import {useHistory} from 'react-router-dom'
import React, { useState } from 'react'

const Reg = () => {

    const history = useHistory()
    const [first_name, setFirstName] = useState("");
    const [user_name, setUserName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const createUser = (e) => {
        // if( confirm_password === password ) {
            e.preventDefault();
            axios.post('/create/user', {
                first_name,
                last_name,
                user_name,
                email,
                password,
            })
            .then(res =>  {
                console.log(res,"axios posted for /create/user");
                // store username into local storage
                // localStorage.clear();
                // localStorage.setItem("email", email);
                // console.log(localStorage.getItem("email -- ","users email -- "), "***********************");
                history.push('/home/feed')
            })
            .catch(err => {
                console.log(err, "WTFFFFFFFFFF");
            })
        // } else {
        //     console.log("Password and Confirm Password do not Match!!!");
        // }
    }

    return (
        <div>
            <form onSubmit={createUser} method="POST" className="reg">
                <h1 className="title">Register Now</h1>
                <div className="column spc_btwn">
                    <h3>User Name</h3>
                    <input type="text" value={user_name}
                    onChange={ (e) => setUserName(e.target.value)}
                    placeholder="User Name..."/>
                </div>
                <div className="column spc_btwn">
                    <h3>First Name</h3>
                    <input type="text" value={first_name}
                    onChange={ (e) => setFirstName(e.target.value)}
                    placeholder="Your first name..."/>
                </div>
                <div className="column spc_btwn">
                    <h3 className="column">Last Name</h3>
                    <input type="text" value={last_name}
                    onChange={ (e) => setLastName(e.target.value)}
                    placeholder="Your last name..."/>
                </div>
                <div className="column spc_btwn"> 
                    <h3>Email</h3>
                    <input type="email" value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    placeholder="Your email..."/> 
            </div>
                <div className="column spc_btwn"> 
                    <h3>Password</h3>
                    <input type="text" value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    placeholder="Create Password..."/> 
                </div>
                <div className="column spc_btwn "> 
                    <h3>Confirm password</h3>
                    <input type="text" value={confirm_password}
                    onChange={ (e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password..."/> 
                </div>

                <input type="submit" value='Submit' className="button-15"/>
                <a href="/login" className="button-15">Already have an account!!</a>

            </form>
        </div>
    )
}
export default Reg;