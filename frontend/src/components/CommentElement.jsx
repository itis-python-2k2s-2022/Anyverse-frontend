import React from 'react';
import ButtonDeleteThread from "./ButtonDeleteThread";

const CommentElement = (props) => {
    const update = () => {
        window.location.replace("/thread/update/" +  props.id);
    };
    return (
        <div id={props.id}>
            <div className="post" >
                <div>
                    {props.comment}
                </div>
            </div>
            {props.flag ? (
                <div>
                    <ButtonDeleteThread id={props.id}/>
                    <button onClick={update}>Изменить комментарий</button>
                </div>
                ) : (
                    <></>
            )}
        </div>
    );
};

export default CommentElement;
