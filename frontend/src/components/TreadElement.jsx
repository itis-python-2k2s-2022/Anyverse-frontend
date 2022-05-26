import React from 'react';
import ButtonDeleteThread from "./ButtonDeleteThread";

const TreadElement = (props) => {
    const update = () => {
        window.location.replace("/thread/update/" +  props.item._id);
    };
    return (
        <div id={props.item._id}>
        <a href={"/thread/" + props.item._id}>
            <div className="post" >
                <div className="post__content">
                     <img src={"http://127.0.0.1:8000/" + props.item.image}/>
                    <div>
                        {props.item.name}
                    </div>
                </div>
            </div>
        </a>
            {props.flag ? ( //this is my friend
                <div>
                    <ButtonDeleteThread id={props.item._id}/>
                    <button onClick={update}>Изменить пост</button>
                </div>
                ) : (
                    <></>
            )}
        </div>
    );
};

export default TreadElement;