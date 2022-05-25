import React from 'react';
import axios from "axios";
import TreadElement from "../components/TreadElement";
import ReactDOM from "react-dom";
import {useParams} from "react-router-dom";
import ThreadFieldElement from "../components/ThreadFieldElement";
import Category from "../components/Category";
import {Button, Form, Input} from "antd";
import TreadOpenElement from "../components/TreadOpenElement";
import CommentElement from "../components/CommentElement";

let length_fields = 0;
const { TextArea } = Input;
let elem_list = [];
let result_list = {};
let fields = [];
let category_id = "";
let additional_fields = {}

const DefaultThread = () => {
    const params = useParams();
    const thread_id = params.thread;

         axios.get("http://127.0.0.1:8000/category_app/thread/get_thread",
        {headers: { token: localStorage.getItem('token'),
                          thread_id: thread_id}})
        .then(response => {
            document.getElementById("thread_name").innerText  = response.data.thread.name
            document.getElementById("thread_description").innerText  = response.data.thread.description
            category_id = response.data.thread.category
            const additional = JSON.stringify(response.data.thread)
            additional_fields = JSON.parse(additional);
            axios.get("http://127.0.0.1:8000/category_app/category/get_category_settings",
                {headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
                .then(response => {
                    fields = response.data.category.additional_fields
                     for (var element in fields) {
                         elem_list.push(length_fields)
                         const elements = document.getElementById("fields");
                         const member_chat = document.createElement("div");
                         member_chat.setAttribute('id', String(length_fields) + "div");
                         elements.append(member_chat);
                           ReactDOM.hydrate(
                             <TreadOpenElement id={element}
                                                 label={fields[element]}
                                                 value={additional_fields[fields[element]]}
                                                 placeholder={additional_fields[fields[element]]}/>,
                             document.getElementById(String(length_fields) + "div"));
                           length_fields += 1;
                     }})
                    // fields.map((element) =>
                .catch(function (error) {console.log(error, "error");});
        })
        .catch(function (error) {
            console.log(error, "error");
        });

          const send = () => {
              const form = document.forms.fields;
              const message = form.elements.comment.value;
              axios
            .post("http://127.0.0.1:8000/category_app/comment/create_comment", {
                thread: thread_id,
                creator: localStorage.getItem('token'),
                text: message,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
          }

          axios.get("http://127.0.0.1:8000/category_app/comment/get_thread_comments",
        {headers: { token: localStorage.getItem('token'), thread_id: thread_id}})
        .then(response => {
            console.log(response);
            // const thread_list = response.data.threads;
            const thread_list = response.data.threads.map((item) =>
                // console.log(item.is_creator+"llll")
                 <CommentElement
                     flag={item.is_creator}
                     comment={item}
                     id={item.thread}/>
             );
            ReactDOM.render(
                     thread_list,
                     document.getElementById("tread_")
                 )
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <div id="name">
            </div>
            <div name="name" id="thread_name" >
            </div>
            <div name="description" id="thread_description">
            </div>
            <div id="fields">
            </div>
            <Form id="fields" name="fields">
                <Form.Item  label="написать комментарий" placeholder="">
                    <TextArea name="comment" autoSize={{ minRows: 3, maxRows: 5 }} id="thread_comment"/>
                </Form.Item>
                <Button
                    onClick={send}>
                    Отправить
                </Button>
            </Form>
            <div name="comment_list">

            </div>
        </div>
    );
};

export default DefaultThread;