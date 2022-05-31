import React, {useState} from 'react';
import axios from "axios";
import TreadElement from "../components/TreadElement";
import ReactDOM from "react-dom";
import {Button, Form, Input, Space, Upload, message} from "antd";
import {useParams} from "react-router-dom";
import ThreadFieldElement from "../components/ThreadFieldElement";
import {useNavigate} from "react-router";
import {UploadOutlined} from "@ant-design/icons";
import EditThreadImage from "../components/EditThreadImage";

const { TextArea } = Input;
let count = 0;
let length_fields = 0;
let elem_list = [];
let result_list = {};
let fields = [];
let category_id = "";
let additional_fields = {}

const UpdateThread = () => {
    const navigate = useNavigate();
    const params = useParams();
    const thread_id = params.thread;

    const [file, setFile] = useState(null);

    axios.get(`${process.env.REACT_APP_API_URL}/category_app/thread/get_thread`,
        {headers: { token: localStorage.getItem('token'),
                          thread_id: thread_id}})
        .then(response => {
            category_id = response.data.thread.category;
            // console.log(response.data.thread)
            const additional = JSON.stringify(response.data.thread)
            additional_fields = JSON.parse(additional);
            // console.log(additional_fields)
            document.getElementById("thread_name").defaultValue = response.data.thread.name;
            document.getElementById("thread_description").defaultValue = response.data.thread.description;
            axios.get(`${process.env.REACT_APP_API_URL}/category_app/category/get_category_settings`,
                {headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
                .then(response => {
                    fields = response.data.category.additional_fields
                     for (var element in fields) {
                         elem_list.push(length_fields)
                         const elements = document.getElementById("new-fields");
                         const member_chat = document.createElement("div");
                         member_chat.setAttribute('id', String(length_fields) + "div");
                         elements.append(member_chat);
                           ReactDOM.hydrate(
                             <ThreadFieldElement id={element}
                                                 label={fields[element]}
                                                 defaultValue={additional_fields[fields[element]]}/>,
                             document.getElementById(String(length_fields) + "div"));
                           document.getElementById(String(length_fields)).value = additional_fields[fields[element]];
                           length_fields += 1;
                     }})
                    // fields.map((element) =>
                .catch(function (error) {console.log(error, "error");});
        })
        .catch(function (error) {
            console.log(error, "error");
        });

        const updateThread = () => {
            const form = document.forms.fields;
            const name_thread  = form.elements.name.value;
            const description = form.elements.description.value;
            console.log(elem_list)
            for (var element in elem_list) {
                const el_value = form.elements.namedItem("answer" + element).value
                if (el_value !== ""){
                    // console.log(fields[element]+"lll")
                    result_list[fields[element]] = el_value
                    // result_list.push(el_value)
                }
            }
            if (file) {
                const formData = new FormData();
                formData.append('file', file.fileList[0].originFileObj)
                axios
                    .put("http://localhost:8000/category_app/thread/update_thread_image/" + thread_id, formData)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error, "error");
                    })
            }
         axios
             .put(`${process.env.REACT_APP_API_URL}/category_app/thread/update_thread`,
            {
                thread_id: thread_id,
                creator_id: localStorage.getItem('token'),
                name: name_thread,
                description: description,
                additional_fields:  result_list
            })
            .then(response => {
                console.log(response);
                navigate("/category/" + category_id);
                message.success(response.data.response_message);
                // alert(response.data.response_message)
            })
              .catch(function (error) {
                    console.log(error, "error");
                });
             result_list = []
    }

    return (
         <div>
             <Space>
                <p className={"fs-4 text-center"}>Изменить пост </p>
                <p className={"fs-4 text-center strong"} id={"name"}/>
            </Space>
            <Form
                id="fields"
                name="fields"
                layout={"vertical"}
                initialValues={{ remember: true }}
                onFinish={updateThread}
                autoComplete="off"
            >
                 <Form.Item
                     name={"name_form"}
                     label={"Название поста"}
                     rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                 >
                    <Input
                        name="name"
                        id="thread_name"
                        type={"text"}
                        placeholder={"Название поста"}
                    />
                </Form.Item>
                <Form.Item
                    name={"description_form"}
                    label="Описание поста"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <TextArea
                        name="description"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        id="thread_description"
                        type={"text"}
                        placeholder={"Описание поста"}
                    />
                </Form.Item>
                <div id={"new-fields"} />
                <Button
                    type='primary'
                    htmlType='submit'
                    className='rounded-md bg-blue-300'
                >
                    Сохранить изменения тектовое
                </Button>
            </Form>
             <EditThreadImage />
        </div>
    );
};

export default UpdateThread;