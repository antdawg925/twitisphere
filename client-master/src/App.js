
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./views/Main";
import Reg from "./views/SimpleLoginReg/Reg";
import Login from "./views/SimpleLoginReg/Login";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import AboutTheDev from "./views/AboutTheDev";
import FindUsers from "./views/FindUsers";
import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";
import { Notifications } from "./views/Notifications";
import { Chat } from "./views/Chat";

function App() {

  const [postForm, setPostForm] = useState(false);

  const renderPost = () => {
    setPostForm(true);
  };


  return (
    <BrowserRouter>

      <Switch>

        <Route exact path="/" >
          <Main />
        </Route >

        <Route exact path="/register">
          <Reg />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/home/feed" >
          <Feed postForm={postForm} setPostForm={setPostForm} renderPost={renderPost} />
        </Route>

        <Route exact path="/find/users">
          <FindUsers />
        </Route>

        <Route exact path="/profile" >
          <Profile postForm={postForm} setPostForm={setPostForm} renderPost={renderPost} />
        </Route>

        <Route exact path="/about/dev" >
          <AboutTheDev />
        </Route>

        <Route exact path="/edit/profile" >
          <EditProfile />
        </Route>

        <Route exact path="/chat" >
          <Chat />
        </Route>

        

        <Route exact path="/notifications" >
          <Notifications />
        </Route>

        <Route exact path="/settings" >
          <Settings />
        </Route>

        <Route path="*" >
          <Profile />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
