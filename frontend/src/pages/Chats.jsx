import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom'
import ChatElement from "../components/ChatElement";


function Chats() {;

    axios.get(`${process.env.REACT_APP_API_URL}/user_app/chat/get_chats`, {headers:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            const element = document.getElementById('user_name');


             const listItems = response.data.chats.map((number) =>
                 {console.log(number)
                  const elements = document.getElementById("chats");
                  const member_chat = document.createElement("div");
                  member_chat.setAttribute('id', number.nickname)
                  elements.append(member_chat)
                 }
             );
             console.log(listItems)
            console.log(response.data.chats)

             response.data.chats.map((item) =>
                 ReactDOM.hydrate(
                     <ChatElement item={item} key={item.nickname}/>,
                     document.getElementById(item.nickname)
                 )
             );

        })
        .catch(function (error) {
            console.log(error, "error");
        })
        .finally(response => {
            const object_chats = response.data.chats
        });


    return (
        <div>
            <h1>Чаты</h1>
            <div id="chats">
            </div>
        </div>
    );
}

export default Chats;
