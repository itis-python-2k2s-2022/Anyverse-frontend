import React from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios";


const TreadElement = (props) => {
    const move = () => {
        window.location.replace("/thread/" + props.item._id)
    }

    const update = () => {
        window.location.replace("/thread/update/" +  props.item._id);
    };

    const del_thread = async e => {
        axios
            .delete("http://127.0.0.1:8000/category_app/thread/delete_thread",
                { data: {thread_id: props.item._id, creator: localStorage.getItem('token')}})
            .then(function (response) {
                console.log(response);
                const el_user = document.getElementById(props.item._id)
                el_user.remove()
            })
            .catch(function (error) {
                console.log(error, "error");
            });
     };


    return (
        <>
        <Card
            id={props.item._id}
            title={props.item.name}
            type={"inner"}
            extra={
                <>
                {props.flag && (
                    <>
                        <Button onClick={update} style={{marginRight: 6}} type={"primary"} ghost>Изменить</Button>
                        <Button onClick={del_thread} type={"primary"} danger ghost>Удалить</Button>
                    </>
                )}
                </>
                }
        >
        {/*<a href={"/thread/" + props.item._id}>*/}
            <div onClick={move}>
                <Space>
                    <Avatar shape="square" size={64} src={"http://127.0.0.1:8000/" + props.item.image} />
                    <div>
                        {props.item.description}
                    </div>
                </Space>
            </div>
        {/*</a>*/}
        </Card>
        </>
    );
};

export default TreadElement;