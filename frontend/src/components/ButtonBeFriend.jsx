import axios from "axios";
import {Button} from "antd";
import React from "react";

const ButtonBeFriend = (props) => {

     const be_friend = async e => {

        axios
            .post("http://127.0.0.1:8000/user_app/friendlist/send_friend_request",
                {
                requester: localStorage.getItem('token'),
                receiver: props.nickname,
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        window.location.reload()
    };

     console.log('lllll')
    return (
        <div>
            <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={be_friend}>
                {props.label}
            </Button>
        </div>
    );
}

export default ButtonBeFriend;
