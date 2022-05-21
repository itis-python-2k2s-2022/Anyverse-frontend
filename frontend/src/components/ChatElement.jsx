import React from 'react';
import "../styles/App.css"


const ChatElement = (props) => {
    console.log('lllll')
    return (
        <a href={"/chat/open_chat/" + props.item.nickname}>
            <div className="post" id={props.key}>
                {console.log(';;;;;')}
                <div className="post__content">
                    <strong> </strong>
                    <div>
                        {props.item.nickname}
                    </div>
                    {/*<div>*/}
                    {/*    {props.item}*/}
                    {/*</div>*/}
                </div>
            </div>
        </a>
    );
}

export default ChatElement;
