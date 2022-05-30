import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import DefaultChat from "./DefaultChat";
import ReactDOM from "react-dom";
import UpdateComment from "../components/UpdateComment";

const OpenChat = () => {
     const params = useParams();
    const nickname = params.nickname;

    axios.get("http://127.0.0.1:8000/user_app/chat/open_chat/" + nickname,
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            console.log(response.data.chat_id)
            ReactDOM.render(
                <DefaultChat nickname={nickname} chat_id={response.data.chat_id} messages={response.data.messages}/>,
                document.getElementById("my_chat")
            );
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <div id="my_chat">

            </div>
            <div id="old_m">

            </div>
        </div>
    );
};

export default OpenChat;