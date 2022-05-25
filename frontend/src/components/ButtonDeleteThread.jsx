import React from 'react';
import axios from "axios";
import {Button} from "antd";

const ButtonDeleteThread = (props) => {

     const del_thread = async e => {
        axios
            .delete("http://127.0.0.1:8000/category_app/thread/delete_thread",
                { data: {thread_id: props.id, creator: localStorage.getItem('token')}})
            .then(function (response) {
                console.log(response);
                const el_user = document.getElementById(props.id)
                el_user.remove()
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
                onClick={del_thread}>
                Удалить пост
            </Button>
        </div>
    );
};

export default ButtonDeleteThread;