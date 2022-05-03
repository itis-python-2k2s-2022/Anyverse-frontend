import React, {useState} from "react";
import { RequireToken } from "./components/Auth";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Profile from "./pages/Profile";
import "./styles/App.css";

function App() {
  return (
      <Route
          path="/profile"
          element={
            <RequireToken>
              <Profile />
            </RequireToken>
          }
      />
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
