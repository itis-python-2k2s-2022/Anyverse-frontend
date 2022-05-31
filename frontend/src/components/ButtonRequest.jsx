import axios from "axios";
import {Button} from "antd";
import React from "react";

const ButtonRequest = (props) => {

     const be_friend = async e => {

        axios
            .post(`${process.env.REACT_APP_API_URL}/user_app/friendlist/friend_request_confirm`,
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
        window.location.reload()
    };

     console.log('lllll')
    return (
        <div>
            <Button
                htmlType='submit'
                className='rounded-md bg-blue-300'
                onClick={be_friend}
                style={{margin : 2}}
            >
                {props.title}
            </Button>
        </div>
    );
}

export default ButtonRequest;
