import React from 'react';
import "../styles/App.css"
import {Avatar} from "antd";


const ChatElement = (props) => {
    console.log('lllll')
    return (
        <a href={"/chat/open_chat/" + props.item.nickname}>
            <div className="post" id={props.key}>
                {console.log(';;;;;')}
                <Avatar shape="square" size={64} src={"http://127.0.0.1:8000/" + props.item.image} />
                <div className="post__content">
                    <div>
                        {props.item.nickname}
                    </div>
                </div>
                <div>
                    {props.item.last_message}
                </div>
            </div>
        </a>
    );
}

export default ChatElement;
