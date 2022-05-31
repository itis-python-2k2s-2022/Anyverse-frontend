import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import DefaultChat from "./DefaultChat";
import ReactDOM from "react-dom";
import UpdateComment from "../components/UpdateComment";

const OpenChat = () => {
     const params = useParams();
    const nickname = params.nickname;

    axios.get(`${process.env.REACT_APP_API_URL}/user_app/chat/open_chat/` + nickname,
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            console.log(response.data.chat_id)
            const data_me = []
            const datas = response.data.messages

            for (const element in response.data.messages){
                console.log( response.data.messages[element])
                data_me.push(response.data.messages[element])
            }console.log(datas)
            console.log(data_me)
            ReactDOM.render(
                <DefaultChat user_nickname={response.data.user_nickname} nickname={nickname} chat_id={response.data.chat_id} messages={data_me}/>,
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