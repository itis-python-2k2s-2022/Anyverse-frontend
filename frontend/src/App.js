import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Main from "./pages/Main";
import "./styles/App.css";
import Registration from "./pages/Registration";
import Layout from "./pages/Layout";
import EditPassword from "./pages/EditPassword";
import ProfileEdit from "./pages/ProfileEdit";
import Chats from "./pages/Chats";
import NoPage from "./pages/NoPage";
import DefaultProfile from "./pages/DefaultProfile";
import Chat from "./pages/Chat";
import NavbarElement from "./components/NavbarElement";

function App() {
  return (
      <>
      <Router>
          <NavbarElement />
          <Routes>
                {/*<Link to="/default_profile/get_profile_info/nick?q=nickname">DefaultProfile</Link>*/}
                <Route exact path="/" element = {<Main />}/>
                <Route path="/auth/login" element = {<Login />}/>
                <Route path="/profile/get_profile_info" element = {<Profile />}/>
                {/*<Route path="/default_profile/get_profile_info/:nickname" render={(props) => {<DefaultProfile nickname={props.match.params.nickname}/>}} element={<DefaultProfile />}/>*/}
                {/*<Route path="/default_profile/get_profile_info/:nickname" component={<DefaultProfile />} element={<Main/>}/>*/}
                <Route path="/update_password_info" element = {<EditPassword />}/>
                <Route path="/update_profile_info" element = {<ProfileEdit />}/>
                <Route path="/auth/register" element = {<Registration />}/>
                <Route path="/chat/get_chats" element = {<Chats />}/>

                <Route path="*" element={<NoPage />} />
                <Route path="default_profile/get_profile_info/nick" element={<DefaultProfile />}>
                  {/*<Link to="/:nickname">Link</Link>*/}
                  {/*<Route exact path="/:nickname" render={(props => <DefaultProfile{...props}/>)}/>*/}
                  <Route path=":nickname" element={<DefaultProfile />}/>
                </Route>
                <Route path="/chat/open_chat/nick" element = {<Chat />}>
                    <Route path=":nickname" element = {<Chat />}/>
                </Route>
              </Routes>
        </Router>
      </>
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
