import React from 'react';
import axios from "axios";
import ChatElement from "../components/ChatElement";
import {useParams} from "react-router-dom";


function Chat() {
    const params = useParams();
    const user_nickname = params.nickname;

    axios.get("http://127.0.0.1:8000/chat/open_chat/" + user_nickname, {headers:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error, "error");
        })
        .finally(response => {
            // const object_chats = response.data.chats
        });



    return (
        <div>
            <p>Чат с </p>
            {user_nickname}
            <p>Тут нужно сделать чат</p>
        </div>
    );
}

export default Chat;
