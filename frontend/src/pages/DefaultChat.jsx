import React, {Component, useState} from "react";
import {Button, Form, Input, List} from "antd";
import axios from "axios";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import {Link} from "react-router-dom";
import MessageListItem from "../components/MessageListItem";

let count = 0;

const DefaultChat = (props) => {

    // for (const element in props.messages){
    //         var messages = document.getElementById('messages')
    //     var message = document.createElement('div')
    //     var content = document.createTextNode(props.messages.message)
    //     message.appendChild(content)
    //     messages.appendChild(message)
    // }

    var ws = new WebSocket("ws://localhost:8000/ws/" + props.chat_id);


    const post_message = async (message) => {
        axios.post("http://127.0.0.1:8000/user_app/chat/send_message",
            {
                sender: localStorage.getItem('token'),
                receiver: props.nickname,
                message: message
            })
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }
    console.log(props.chat_id)

    ws.onmessage = function (event) {
        // ReactDOM.render(
        //     <MessageListItem message={event.data} id={count}/>,
        //     document.getElementById("messages")
        // );
        // count += 1;
        var messages = document.getElementById('messages')
        var message = document.createElement('div')
        var content = document.createTextNode(event.data)
        message.appendChild(content)
        messages.appendChild(message)
    };

    function sendMessage(e) {
        var input = document.getElementById("messageText")
        post_message(input.value)
        ws.send(input.value)
        input.value = ''
        e.preventDefault()
    }

    return (
        <div>
            <div id="old_message">

            </div>
            <h1>WebSocket Chat</h1>
            <Form action="">
                <Input type="text" id="messageText" autoComplete="off"/>
                <Button onClick={sendMessage}>Send</Button>
            </Form>
            {/*<ul id='messages'>*/}
            {/*</ul>*/}
            <div id='messages'>
            </div>
        </div>
    );
}

export default DefaultChat;
