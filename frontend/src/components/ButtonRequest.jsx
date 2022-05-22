import axios from "axios";
import {Button} from "antd";
import React from "react";

const ButtonRequest = (props) => {

     const be_friend = async e => {

        axios
            .post("http://127.0.0.1:8000/friendlist/friend_request_confirm",
                {
                requester: props.nickname,
                receiver: localStorage.getItem('token'),
                confirm: props.confirm,
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    };

     console.log('lllll')
    return (
        <div>
            <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={be_friend}>
                {props.title}
            </Button>
        </div>
    );
}

export default ButtonRequest;
