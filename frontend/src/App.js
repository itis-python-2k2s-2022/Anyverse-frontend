import React, {useState} from "react";
import {fetchToken, RequireToken} from "./components/Auth";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Main from "./pages/Main";
import "./styles/App.css";
import Registration from "./pages/Registration";
import {Navbar} from "react-bootstrap";

function App() {
  return (
      {}
      // <RequireToken>
      // <div>
      //      {fetchToken() ? (
      //             <Route exact path="/profile/get_profile_info" elemnt={<Profile />}/>
      //             <p>you are logged in</p>
      //           ) : (
      //     <Route exact path="/auth/login" element={<Login />} />

          // {/*<Route exact path="/" element={<Main />} />*/}
          // <Route path="/auth/register" element = {<Registration />}/>
               // )}
      // </div>
      // </RequireToken>
      // <Route
      //     path="/profile/get_profile_info"
      //     element={
      //       <RequireToken>
      //         <Profile />
      //       </RequireToken>
      //     }
      // />
      // <div>
      //   <Navbar />
      //   <div className="container">
      //     <article>
      //       <h1>What is Lorem Ipsum? </h1>
      //       Lorem Ipsum is simply dummy text of the printing and typesetting industry...
      //     </article>
      //   </div>
      // </div>
  );
}

export default App;
