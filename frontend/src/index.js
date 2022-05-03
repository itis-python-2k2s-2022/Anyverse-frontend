import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import NoPage from "./pages/NoPage";
import Registration from "./pages/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element = {<Main />}/>
            <Route path="/auth/login" element = {<Login />}/>
            <Route path="/profile" element = {<Profile />}/>
            <Route path="/auth/register" element = {<Registration />}/>
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));