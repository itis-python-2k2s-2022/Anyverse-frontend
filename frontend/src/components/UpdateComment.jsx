import React from 'react';
import {Button, Form, Input} from "antd";
import axios from "axios";
const { TextArea } = Input;

const UpdateComment = (props) => {
    const send = () => {
        const form = document.forms.comm;
        const name_category = form.elements.comment.value;
         axios
            .put("http://127.0.0.1:8000/category_app/comment/update_comment",
                {comment_id: props.id, text: name_category})
            .then(function (response) {
                console.log(response);
                const el_user = document.getElementById(props.id + "del")
                const comment = document.getElementById(props.id +"text")
                comment.innerText = name_category;
                el_user.remove()
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }
    return (
        <div id={props.id + "del"}>
              <Form id="comm" name="comm">
            <Form.Item  label="исправить комментарий" placeholder="">
                    <TextArea name="comment" autoSize={{ minRows: 3, maxRows: 5 }} id="thread" defaultValue={props.text}/>
                </Form.Item>
                <Button
                    onClick={send}>
                    Сохранить
                </Button>
              </Form>
        </div>
    );
};

export default UpdateComment;