import React from 'react';
import axios from "axios";
import ChatElement from "../components/ChatElement";


function Chat() {
    const object_chats = [];

    axios.get("http://127.0.0.1:8000/chat/get_chats", {headers:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            console.log(response);
            const object_chats = response.data.chats
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
            <div>
                {object_chats.map(function(object, i){
                    <ChatElement obj={object} key={i} />;
                })}
            </div>
        </div>
    );
}

export default Chat;
