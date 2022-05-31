import React, {useState} from 'react';
import axios from "axios";
import TreadElement from "../components/TreadElement";
import ReactDOM from "react-dom";
import {useParams} from "react-router-dom";
import ThreadFieldElement from "../components/ThreadFieldElement";
import {Avatar, Button, Card, Col, Form, Input, Rate, Row, Space} from "antd";
import TreadOpenElement from "../components/TreadOpenElement";
import CommentElement from "../components/CommentElement";
import data from "bootstrap/js/src/dom/data";

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

    const [currentValue, setCurrentValue] = useState(0)

    const returnBack = (e) => {

    }

    const change = (value, e) => {
        console.log(value)
        setCurrentValue(value)
   axios
       .put("http://127.0.0.1:8000/category_app/rating/update_rating",
                {
                    thread: thread_id,
                    creator: localStorage.getItem('token'),
                    rating: value
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

         axios.get("http://127.0.0.1:8000/category_app/thread/get_thread",
        {headers: { token: localStorage.getItem('token'),
                          thread_id: thread_id}})
        .then(response => {
            document.getElementById("thread_photo").src = "http://127.0.0.1:8000/" + response.data.thread.image;
            document.getElementById("thread_name").innerText  = response.data.thread.name
            document.getElementById("thread_description").innerText  = response.data.thread.description
            category_id = response.data.thread.category
            const additional = JSON.stringify(response.data.thread)
            additional_fields = JSON.parse(additional);
            axios.get("http://127.0.0.1:8000/category_app/category/get_category_settings",
                {headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
                .then(response => {
                    var myNode = document.getElementById("fields");
                         while (myNode.firstChild) {
                             myNode.removeChild(myNode.firstChild);
                         }
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
                ReactDOM.hydrate(
                    <a href={"/category/" + category_id}>
                        <Button>Вернуться к категории</Button>
                    </a>,
                    document.getElementById("return_button")
                )
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
                form.elements.comment.value = ""
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error, "error");
            });
          }

          axios.get("http://127.0.0.1:8000/category_app/comment/get_thread_comments",
        {headers: { token: localStorage.getItem('token'), thread_id: thread_id}})
        .then(response => {
            console.log(response.data.comments);
            const thread_list = response.data.comments.reverse().map((item) =>
                // console.log(item)
                 <CommentElement
                     flag={item.is_creator}
                     user={item.creator}
                     comment={item.text}
                     id={item._id}/>
             );
            ReactDOM.render(
                     thread_list,
                     document.getElementById("comment_list")
                 )
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <Card
                id={"thread_card"}
            >
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Avatar
                          size={300}
                          shape={"square"}
                          id={"thread_photo"}
                        />
                    </div>
                    <div className={"col-8"}>
                        <p className={"fs-3 text-center"} id={"thread_name"}/>
                        <Space>
                            <p className={"fs-4"}>Описание: </p>
                            <p className={"fs-5"} id={"thread_description"}/>
                        </Space>
                        <div id="fields">
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{textAlign: "center", marginTop: 1}}>
                    <div id="rating">
                        <Rate onChange={value => change(value)} value={currentValue} />
                    </div>
                </div>
            </Card>
            <p/>
            <div id={"return_button"}>
            </div>
            <p/>
            <Form
                id="fields"
                name="fields"
                layout={"vertical"}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name={"thread_comment"}
                    label={"Ваш комментарий: "}
                    rules={[
                        {required: true, message: 'Пожалуйста, напишите комментарий!'},
                    ]}
                >
                    <TextArea
                        name="comment"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        id="thread_comment"
                    />
                </Form.Item>
                <Button
                    onClick={send}
                >
                    Отправить
                </Button>
            </Form>
            <div id="comment_list">

            </div>
        </div>
    );
};

export default DefaultThread;