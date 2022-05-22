import axios from "axios";
import {Button} from "antd";
import React from "react";

const ButtonDeleteFriend = (props) => {

     const be_friend = async e => {

        axios
            .delete("http://127.0.0.1:8000/friendlist/delete_friend",
                {
                requester: localStorage.getItem('token'),
                receiver: props.nickname
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
     };

    return (
        <div>
            <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={be_friend}>
                Удалить из друзей
            </Button>
        </div>
    );
}

export default ButtonDeleteFriend;
