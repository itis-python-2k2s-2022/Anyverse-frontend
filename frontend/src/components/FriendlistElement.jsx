import React from 'react';
import "../styles/App.css"
import axios from "axios";
import ButtonRequest from "./ButtonRequest";
import ButtonDeleteFriend from "./ButtonDeleteFriend";


const FriendlistElement = (props) => {

     const be_friend = async e => {

        axios
            .post("http://127.0.0.1:8000/auth/login", {headers:
            {token: localStorage.getItem('token')}
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        // }
    };

    return (
        <div>
            {console.log(props.flags)}
            {props.flags ? ( //this is my friend
                <div id={props.key}>
                    <a href={"../default_profile/get_profile_info/" + props.item.nickname}>
                            <div className="post">
                                {console.log(';;;;;')}
                                <div className="post__content">
                                    <strong> </strong>
                                    <div>
                                        {props.item.nickname}
                                    </div>

                                </div>
                            </div>
                        </a>
                    <ButtonDeleteFriend nickname={props.item.nickname}/>
                </div>
                ) : ( // this is not my friend, but it wants to be friends with me
                <div>
                     <a href={"../default_profile/get_profile_info/" + props.item.nickname}>
                            <div className="post" id={props.key}>
                                {console.log(';;;;;')}
                                <div className="post__content">
                                    <strong> </strong>
                                    <div>
                                        {props.item.nickname}
                                    </div>
                                </div>
                            </div>
                        </a>
                    <ButtonRequest
                        nickname={props.item.nickname}
                        confirm={true}
                        title={"согласиться на дружбу"}/>
                    <ButtonRequest
                        nickname={props.item.nickname}
                        confirm={false}
                        title={"отклонить дружбу"}/>
                </div>
                )}
        </div>
    );
}

export default FriendlistElement;
