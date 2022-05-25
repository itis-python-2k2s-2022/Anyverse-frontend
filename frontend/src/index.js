import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Chats from "./pages/Chats";
import NoPage from "./pages/NoPage";
import DefaultProfile from "./pages/DefaultProfile";
import Friendlist from "./pages/Friendlist";
import Category from "./components/Category";
import Registration from "./pages/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import EditPassword from "./pages/EditPassword";
import ProfileEdit from "./pages/ProfileEdit";
import DefaultChat from "./pages/DefaultChat";
import AllCategory from "./pages/AllCategory";
import CategoryLayout from "./pages/CategoryLayout";
import CreatedCategories from "./pages/CreatedCategories";
import AddCategory from "./pages/AddCategory";
import DefaultCategory from "./pages/DefaultCategory";
import RecommCategory from "./pages/RecommCategory";
import AddThread from "./pages/AddThread";
import SearchCategory from "./pages/SearchCategory";
import UpdateCategory from "./pages/UpdateCategory";
import SearchFriend from "./pages/SearchFriend";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element = {<Main />}/>
            <Route path="/auth/login" element = {<Login />}/>
            <Route path="/profile/get_profile_info" element = {<Profile />}/>
            <Route path="/update_password_info" element = {<EditPassword />}/>
            <Route path="/update_profile_info" element = {<ProfileEdit />}/>
            <Route path="/auth/register" element = {<Registration />}/>
            <Route path="/chat/get_chats" element = {<Chats />}/>
            <Route path="/friendlist/get_friends" element = {<Friendlist/>}/>
            <Route path="/search_friend" element = {<SearchFriend/>}/>
            <Route path="*" element={<NoPage />} />
            <Route path="default_profile/get_profile_info/" element={<DefaultProfile />}>
              <Route path=":nickname" element={<DefaultProfile />}/>
            </Route>
            <Route path="/chat/open_chat/" element = {<DefaultChat />}>
                <Route path=":nickname" element = {<DefaultChat />}/>
            </Route>
            <Route path="/category/subscriptions" element={<AllCategory/>}/>
            <Route path="/category/my_category" element={<CreatedCategories/>}/>
            <Route path="/category/update_category" element={<UpdateCategory/>}>
                   <Route path=":category" element={<UpdateCategory/>}/>
            </Route>
            <Route path="/category/create_category" element={<AddCategory/>}/>
            <Route path="/category/search" element={<SearchCategory/>}/>
            <Route path="/category/recommended_categories" element={<RecommCategory/>}/>
            <Route path="/category/" element = {<DefaultCategory />}>
                <Route path=":category" element = {<DefaultCategory />}/>
                <Route path=":category" element = {<DefaultCategory />}/>
            </Route>
            <Route path="/thread/create_thread" element={<AddThread/>}>
                 <Route path=":category" element={<AddThread/>}/>
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