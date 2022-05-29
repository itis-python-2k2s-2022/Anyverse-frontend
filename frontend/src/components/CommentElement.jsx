import React from 'react';
import ReactDOM from "react-dom";
import UpdateComment from "./UpdateComment";
import {Card, Button} from "antd";
import axios from "axios";

const CommentElement = (props) => {
    const update = () => {
          ReactDOM.render(
                    <UpdateComment text={props.comment} id={props.id}/>,
                    document.getElementById(props.id + "update")
                );
    };

    const del_comment = async e => {
        axios
            .delete("http://127.0.0.1:8000/category_app/comment/delete_comment",
                { data: {comment_id: props.id, creator: localStorage.getItem('token')}})
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
        <>
            <Card
                id={props.id}
                title={props.user}
                type={"inner"}
                extra={
                    <>
                    {props.flag && (
                        <>
                            <Button onClick={update} style={{marginRight: 6}} type={"primary"} ghost>Изменить</Button>
                            <Button onClick={del_comment} type={"primary"} danger ghost>Удалить</Button>
                        </>
                    )}
                    </>
                    }
            >
                <div id={props.id +"text"}>
                    {props.comment}
                    <div id={props.id + "update"}> </div>
                </div>
            </Card>
            </>
    );
};

export default CommentElement;
