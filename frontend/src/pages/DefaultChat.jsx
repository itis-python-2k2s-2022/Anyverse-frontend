import React from "react";

import Chat from "../components/Chat";

const DefaultChat = (props) => {
    let ws = new WebSocket("ws://localhost:8000/ws/" + props.chat_id);
    return (
        <div>
         <Chat ws={ws} user_nickname={props.user_nickname} nickname={props.nickname} messages={props.messages}/>
        </div>
    );
}

export default DefaultChat;