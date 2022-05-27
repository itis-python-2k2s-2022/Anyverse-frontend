import React from 'react';
import ButtonDeleteComment from "./ButtonDeleteComment";
import ReactDOM from "react-dom";
import UpdateComment from "./UpdateComment";

const CommentElement = (props) => {
    const update = () => {
          ReactDOM.render(
                    <UpdateComment text={props.comment} id={props.id}/>,
                    document.getElementById(props.id + "update")
                );
    };
    return (
        <div id={props.id}>
            <div className="post" >
                {props.user}
                <div id={props.id +"text"}>
                    {props.comment}
                </div>
            </div>
            {props.flag ? (
                <div>
                    <ButtonDeleteComment id={props.id}/>
                    <button onClick={update}>Изменить комментарий</button>
                    <div id={props.id + "update"}>
                    </div>
                </div>
                ) : (
                    <></>
            )}
        </div>
    );
};

export default CommentElement;
