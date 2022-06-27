// \\\\\\<$A$>///////\\\\\\<$A$>///////  ____________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                   -----------------------------------------
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const Reg = () => {
    //  history.push("/") is used to navigate to other routes
    const history = useHistory()
    // STATE VARIABLES 
    const [first_name, setFirstName] = useState("");
    const [user_name, setUserName] = useState("");
    const [user_name_error, setUserNameError] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [confirm_password_error, setConfirmPasswordError] = useState("");

    const checkLoggedIn = () => {
        if (localStorage.getItem("logged_in") === "yes") {
            history.push('/profile')
        }
    }
    // useEffect
    useEffect(() => {
        checkLoggedIn();
    }, [])

    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //                           CREATE USER ON COMPLETION OF REG.JS FORM
    // ______________________________________________________________________________________________________
    const createUser = (e) => {
        e.preventDefault();
        if (confirm_password === password) {
            axios.post('/create/user', {
                first_name,
                last_name,
                user_name,
                email,
                password,
            })
                .then(res => {
                    console.log(res, "axios posted for /create/user");
                    if(res.data['error']=== "That email is already used!"){
                        let error = {
                            "error": "That email is already used!"
                        }
                        setEmailError(error)
                        return emailError
                        
                    }
                    if(res.data['error']=== "That user name is already used!"){
                        let error = {
                            "error": "That user name is already used!"
                        }
                        setUserNameError(error)
                        return user_name_error
                        
                    }
                    localStorage.setItem("logged_in", "yes");
                    history.push('/home/feed')
                })
                .catch(err => {
                    console.log(err, "Why you no want to RegIsSTer!! (Reg.js)");
                })
        } else {
            setConfirmPasswordError("Passwords did not match!")
            console.log("Password and Confirm Password do not Match!!!",confirm_password_error);
            return confirm_password_error
        }
    }
    //  ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


    return (
        <div className='bg-slate-100 ' style={{ height: "100vh" }}>
            <h1 className="text-center text-4xl tex w-full h-14 pt-2 mb-20 bg-blue-400 shadow-2xl shadow-blue-500">Register Now</h1>
            <form onSubmit={createUser} method="POST" className="ml-20">
                <div className="mb-5 ">
                    {user_name_error}
                    <h3 className='font-bold text-lg'>User Name</h3>
                    <input type="text" minlength="3"  value={user_name} className='text-2xl p-1'
                        onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <h3 className='font-bold text-lg'>First Name</h3>
                    <input type="text" minlength="3"  value={first_name} className="text-2xl p-1"
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <h3 className="font-bold text-lg">Last Name</h3>
                    <input type="text" minlength="3" value={last_name} className="text-2xl p-1"
                        onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-5">
                    {emailError['error']}
                    <h3 className='font-bold text-lg'>Email</h3>
                    <input type="email" value={email} minlength="6" className="text-2xl p-1"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                {confirm_password_error}
                <div className="mb-5">
                    <h3 className='font-bold text-lg'>Password</h3>
                    <input type="password" value={password} minlength="8" className="text-2xl p-1"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-5 ">
                    <h3 className='font-bold text-lg'>Confirm password</h3>
                    <input type="password" value={confirm_password} minlength="8" className="text-2xl p-1"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button type="submit" className="rounded m-2 border-4 p-1 h-1/10 border-blue-300 text-stone-500">Submit</button>
                <a href="/login" className="rounded m-2 border-4 h-1/10 p-1.5 border-blue-300 text-stone-500">Already have an account??</a>

            </form>
        </div>
    )
    // return (
    //     <div>
    //         <h1 className="title">Register Now</h1>
    //         <form onSubmit={createUser} method="POST" className="w-2/5 p-8 reg border-4 border-blue-900">
    //             <div className="column spc_btwn ">
    //                 <h3 className='font-bold bg-zink-800 '>User Name</h3>
    //                 <input type="text" className='block text-lg text-slate-500 ' 
    //                 value={user_name}
    //                 onChange={ (e) => setUserName(e.target.value)}
    //                 placeholder="User Name..."/>
    //             </div>
    //             <div className="column spc_btwn">
    //                 <h3>First Name</h3>
    //                 <input type="text" value={first_name}
    //                 onChange={ (e) => setFirstName(e.target.value)}
    //                 placeholder="Your first name..."/>
    //             </div>
    //             <div className="column spc_btwn">
    //                 <h3 className="column">Last Name</h3>
    //                 <input type="text" value={last_name}
    //                 onChange={ (e) => setLastName(e.target.value)}
    //                 placeholder="Your last name..."/>
    //             </div>
    //             <div className="column spc_btwn"> 
    //                 <h3>Email</h3>
    //                 <input type="email" value={email}
    //                 onChange={ (e) => setEmail(e.target.value)}
    //                 placeholder="Your email..."/> 
    //         </div>
    //             <div className="column spc_btwn"> 
    //                 <h3>Password</h3>
    //                 <input type="text" value={password}
    //                 onChange={ (e) => setPassword(e.target.value)}
    //                 placeholder="Create Password..."/> 
    //             </div>
    //             <div className="column spc_btwn "> 
    //                 <h3>Confirm password</h3>
    //                 <input type="text" value={confirm_password}
    //                 onChange={ (e) => setConfirmPassword(e.target.value)}
    //                 placeholder="Confirm Password..."/> 
    //             </div>

    //             <input type="submit" value='Submit' className="button-15"/>
    //             <a href="/login" className="border-2">Already have an account!!</a>

    //         </form>
    //     </div>
    // )
}
export default Reg;