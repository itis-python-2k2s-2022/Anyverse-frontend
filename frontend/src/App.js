import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import NavbarElement from "./components/NavbarElement";
import EditPassword from "./pages/EditPassword";
import ProfileEdit from "./pages/ProfileEdit";
import GetAuth from "./pages/GetAuth";
import Chats from "./pages/Chats";
import Friendlist from "./pages/Friendlist";
import SearchFriend from "./pages/SearchFriend";
import NoPage from "./pages/NoPage";
import DefaultProfile from "./pages/DefaultProfile";
import DefaultChat from "./pages/DefaultChat";
import AllCategory from "./pages/AllCategory";
import CreatedCategories from "./pages/CreatedCategories";
import UpdateCategory from "./pages/UpdateCategory";
import AddCategory from "./pages/AddCategory";
import SearchCategory from "./pages/SearchCategory";
import RecommCategory from "./pages/RecommCategory";
import DefaultCategory from "./pages/DefaultCategory";
import AddThread from "./pages/AddThread";
import DefaultThread from "./pages/DefaultThread";
import UpdateThread from "./pages/UpdateThread";
import UpdateComment from "./components/UpdateComment";
import Category from "./components/Category";
import {Container} from "react-bootstrap";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecommFriends from "./pages/RecommFriends";
import OpenChat from "./pages/OpenChat";
import Comment from "./pages/Comment";
import EditImageProfile from "./pages/EditImageProfile";
import EditThreadImage from "./components/EditThreadImage";
import {fetchToken} from "./components/Auth";


function App() {
  return (
      <>
        <Router>
          <NavbarElement />
          <Category />
          <Container>
            <Routes>
                <Route path="/" element = {<Main />}/>
                <Route path="/auth/login" element = {<Login />}/>
                <Route path="/auth/register" element = {<Registration />}/>
                <Route path="/auth/oauth" element={<GetAuth/>}/>
                <Route path="*" element={<NoPage />} />
                <Route path="/profile/get_profile_info" element = {<Profile />}/>
                {fetchToken() ? (
                    <>
                        <Route path="default_profile/get_profile_info/" element={<DefaultProfile/>}>
                            <Route path=":nickname" element={<DefaultProfile />}/>
                        </Route>
                        <Route path="/search_friend" element = {<SearchFriend/>}/>
                        <Route path="/category/search" element={<SearchCategory/>}/>
                        <Route path="/category/" element = {<DefaultCategory />}>
                            <Route path=":category" element = {<DefaultCategory />}/>
                        </Route>
                        <Route path="/thread/" element={<DefaultThread/>}>
                            <Route path=":thread" element={<DefaultThread/>}/>
                        </Route>
                        <Route path="/update_password_info" element = {<EditPassword />}/>
                        <Route path="/update_profile_info" element = {<ProfileEdit />}>
                            <Route path=":nickname" element={<ProfileEdit />}/>
                        </Route>
                        <Route path="/update_profile_image" element = {<EditImageProfile />}>
                            <Route path=":nickname" element={<EditImageProfile />}/>
                        </Route>
                        <Route path="/chat/get_chats" element = {<Chats />}/>
                        <Route path="/friendlist/get_friends" element = {<Friendlist/>}/>
                        <Route path="/recommended_friends" element={<RecommFriends/>}/>
                        <Route path="/chat/open_chat/" element = {<OpenChat />}>
                            <Route path=":nickname" element = {<OpenChat />}/>
                        </Route>
                        <Route path="/category/subscriptions" element={<AllCategory/>}/>
                        <Route path="/category/my_category" element={<CreatedCategories/>}/>
                        <Route path="/category/update_category" element={<UpdateCategory/>}>
                            <Route path=":category" element={<UpdateCategory/>}/>
                        </Route>
                        <Route path="/category/create_category" element={<AddCategory/>}/>
                        <Route path="/category/recommended_categories" element={<RecommCategory/>}/>
                        <Route path="/thread/create_thread" element={<AddThread/>}>
                            <Route path=":category" element={<AddThread/>}/>
                        </Route>
                        <Route path="/thread/update" element={<UpdateThread/>}>
                            <Route path=":thread" element={<UpdateThread/>}/>
                        </Route>
                        <Route path="/comment/update/" element={<UpdateComment/>}>
                            <Route path=":comment" element={<UpdateComment/>}/>
                        </Route>
                    </>
                ):(
                    <>
                    </>
                )}
            </Routes>
          </Container>
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
