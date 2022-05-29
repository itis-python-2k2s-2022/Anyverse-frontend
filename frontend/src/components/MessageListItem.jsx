import React from 'react';
import {List, Skeleton} from "antd";

const MessageListItem = (props) => {
  // var messages = document.getElementById('messages')
  //       var message = document.createElement('li')
  //       var content = document.createTextNode(event.data)
  //       message.appendChild(content)
  //       messages.appendChild(message)
    return (
        <div id={props.id}>
            {props.message}
        </div>
    );
};

export default MessageListItem;