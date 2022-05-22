import React from 'react';
import "../styles/App.css"
import {fetchToken} from "./Auth";
import {Profile_} from "./Profile_element";
import {Button} from "antd";
import axios from "axios";
import ButtonBeFriend from "./ButtonBeFriend";
import ButtonRequest from "./ButtonRequest";


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


    console.log('lllll')
    return (
        <div>
            {props.flags ? ( //this is my friend
                  <a href={"default_profile/get_profile_info/" + props.item.nickname}>
                            <div className="post" id={props.key}>
                                {console.log(';;;;;')}
                                <div className="post__content">
                                    <strong> </strong>
                                    <div>
                                        {props.item.nickname}
                                    </div>
                                     <ButtonBeFriend nickname={props.item.nickname}/>
                                </div>
                            </div>
                        </a>
                ) : ( // this is not my friend, but it wants to be friends with me
                     <a href={"default_profile/get_profile_info/" + props.item.nickname}>
                            <div className="post" id={props.key}>
                                {console.log(';;;;;')}
                                <div className="post__content">
                                    <strong> </strong>
                                    <div>
                                        {props.item.nickname}
                                    </div>
                                    <ButtonRequest
                                        nickname={props.item.nickname}
                                        confirm={true}
                                        title={"согласиться на дружбу"}/>
                                    <ButtonRequest
                                        nickname={props.item.nickname}
                                        confirm={false}
                                        title={"отклонить дружбу"}/>
                                </div>
                            </div>
                        </a>
                )}
        </div>
    );
}

export default FriendlistElement;
