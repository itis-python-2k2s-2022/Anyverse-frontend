import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";
import NoPage from "./pages/NoPage";
import DefaultProfile from "./pages/DefaultProfile";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import EditPassword from "./pages/EditPassword";
import ProfileEdit from "./pages/ProfileEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/*<Link to="/default_profile/get_profile_info/nick?q=nickname">DefaultProfile</Link>*/}
            <Route path="/" element = {<Main />}/>
            <Route path="/auth/login" element = {<Login />}/>
            <Route path="/profile/get_profile_info" element = {<Profile />}/>
            {/*<Route path="/default_profile/get_profile_info/:nickname" render={(props) => {<DefaultProfile nickname={props.match.params.nickname}/>}} element={<DefaultProfile />}/>*/}
            {/*<Route path="/default_profile/get_profile_info/:nickname" component={<DefaultProfile />} element={<Main/>}/>*/}
            <Route path="/update_password_info" element = {<EditPassword />}/>
            <Route path="/update_profile_info" element = {<ProfileEdit />}/>
            <Route path="/auth/register" element = {<Registration />}/>
            <Route path="/chat/get_chats" element = {<Chats />}/>

            <Route path="*" element={<NoPage />} />
            <Route path="default_profile/get_profile_info/" element={<DefaultProfile />}>
              {/*<Link to="/:nickname">Link</Link>*/}
              {/*<Route exact path="/:nickname" render={(props => <DefaultProfile{...props}/>)}/>*/}
              <Route path=":nickname" element={<DefaultProfile />}/>
            </Route>
            <Route path="/chat/open_chat/" element = {<Chat />}>
                <Route path=":nickname" element = {<Chat />}/>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// export const getDefaultProfile = ( nickname: string ): string => {
//   return `/default_profile/get_profile_info/${nickname}`;
// };
//

ReactDOM.render(<App />, document.getElementById("root"));