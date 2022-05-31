import React from 'react';
import "../styles/App.css";

const FriendElement = (props) => {
    return (
        <div id={props.item.nickname}>
            <a href={"../default_profile/get_profile_info/" + props.item.nickname}>
                <div className="post">
                    <div className="post__content">
                         <img src={`${process.env.REACT_APP_API_URL}/` + props.item.image}/>
                        <div>
                            {props.item.nickname}
                        </div>

                    </div>
                </div>
            </a>
        </div>
    );
}
export default FriendElement;

