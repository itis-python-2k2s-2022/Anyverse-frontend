import React from 'react';

import axios from "axios";
import ReactDOM from 'react-dom'
import FriendlistElement from "../components/FriendlistElement"

const Friendlist = () => {
    const object_chats = [];
    const listItems = [];
    const result = [];

    axios.get("http://127.0.0.1:8000/user_app/friendlist/get_friends", {headers:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
             const listItems = response.data.friends.map((number) =>
                 {console.log(number)
                  const elements = document.getElementById("friends");
                  const member_chat = document.createElement("div");
                  member_chat.setAttribute('id', number.nickname)
                  elements.append(member_chat)
                 }
             );
             console.log(listItems)
             response.data.friends.map((item) =>
                 ReactDOM.hydrate(
                     <FriendlistElement item={item} flags={true} key={item.nickname}/>,
                     document.getElementById(item.nickname)
                 )
             );

        })
        .catch(function (error) {
            console.log(error, "error");
        })
        .finally(response => {
            const object_chats = response.data.friends
        });

    axios.get("http://127.0.0.1:8000/user_app/friendlist/get_requests", {headers:
            {token: localStorage.getItem('token')}
       })
        .then(response => {
             const listItems = response.data.requests.map((number) =>
                 {console.log(number)
                  const elements = document.getElementById("requests");
                  const member_chat = document.createElement("div");
                  member_chat.setAttribute('id', number.nickname)
                  elements.append(member_chat)
                 }
             );
             console.log(listItems)
             response.data.requests.map((item) =>
                 ReactDOM.hydrate(
                     <FriendlistElement item={item} flags={false} key={item.nickname}/>,
                     document.getElementById(item.nickname)
                 )
             );

        })
        .catch(function (error) {
            console.log(error, "error");
        })
        .finally(response => {
            const object_chats = response.data.requests
        });


    return (
        <div>
            <h1>?????? ????????????</h1>
            <div id="friends"></div>
            <h1>?????????? ???? ???????? ??????????????</h1>
            <div id="requests"></div>
        </div>
    );
}

export default Friendlist;