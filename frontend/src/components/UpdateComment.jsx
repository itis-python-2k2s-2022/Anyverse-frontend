import React from 'react';
import {Button, Form, Input, message} from "antd";
import axios from "axios";
const { TextArea } = Input;

const UpdateComment = (props) => {

    const send = async e => {
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
                message.success(response.data.response_message);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }
    return (
        <div id={props.id + "del"}>
          <Form
              id="comm"
              name="comm"
              layout={'vertical'}
              initialValues={{ remember: true }}
              onFinish={send}
              autoComplete="off"
          >
            <Form.Item
                name={"fix_comm"}
                label="Исправить комментарий"
                rules={[
                    {required: true, message: 'Пожалуйста, введите комментарий!'},
                ]}
            >
                <TextArea
                    name="comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    id="thread"
                    defaultValue={props.text}
                />
            </Form.Item>
            <Button
                htmlType='submit'
            >
                Сохранить
            </Button>
          </Form>
        </div>
    );
};

export default UpdateComment;