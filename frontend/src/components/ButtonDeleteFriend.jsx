import axios from "axios";
import {Button} from "antd";
import React from "react";

const ButtonDeleteFriend = (props) => {

     const del_friend = async e => {
        axios
            .delete("http://127.0.0.1:8000/user_app/friendlist/delete_friend",
                { data: {
                        requester: localStorage.getItem('token'),
                        delete: props.nickname
                    }})
            .then(function (response) {
                console.log(response);
                const el_user = document.getElementById(props.nickname)
                el_user.remove()
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        window.location.reload()
     };

    return (
        <div>
            <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={del_friend}>
                Удалить из друзей
            </Button>
        </div>
    );
}

export default ButtonDeleteFriend;
