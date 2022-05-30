import React, {Component, useEffect, useState} from "react";
import {Button, Form, Input, List, Avatar, Skeleton, Divider } from "antd";
import axios from "axios";
import VirtualList from 'rc-virtual-list';
import MessageElement from "../components/MessageElement";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import {Link} from "react-router-dom";
import MessageListItem from "../components/MessageListItem";
import {fetchToken} from "../components/Auth";
import {Profile_} from "../components/ProfileElement";

let count = 0;

const DefaultChat = (props) => {
    const [data, setData] = useState(props.messages);
    // console.log(props.messages)
    // for (const element in props.messages){
    //         let messages = document.getElementById("old_m")
    //     console.log(messages)
    //     let message = document.createElement('div')
    //     message.innerText = props.messages[element].message
    //     // setData(props.messages[element].message)
    //     // message.appendChild(content)
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
    console.log(data)

    ws.onmessage = function (event) {
        setData(data.concat({_id: count, message: event.data, from_user: true}))
        // var messages = document.getElementById('messages')
        // var message = document.createElement('div')
        // var content = document.createTextNode(event.data)
        // message.appendChild(content)
        // messages.appendChild(message)
    };

    ws.addEventListener('close', (event) => {
  console.log('The connection has been closed successfully.');
});

    function sendMessage(e) {
        var input = document.getElementById("messageText")
        post_message(input.value)
        count += 1;
        ws.send(input.value)
        input.value = ''
        e.preventDefault()
    }

    return (
        <div>
            <List>
      <VirtualList
          id="message_list"
        data={data}
        height={400}
        itemHeight={47}
        itemKey="_id"
      >
        {element => (
          <List.Item id={element._id} key={element._id}>
              {element.from_user ? (
                <List.Item.Meta
              title={props.user_nickname}
              description={element.message}/>
                ) : (
                    <List.Item.Meta
              title={props.nickname}
              description={element.message}
            />
                )}
          </List.Item>
        )}
      </VirtualList>
    </List>
            <p/>
            <Form action="" className="flex-end">
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