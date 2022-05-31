import React, {useState} from 'react';
import {Button, Form, Input, message, Space, Upload} from "antd";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import {useParams} from "react-router-dom";
import ThreadFieldElement from "../components/ThreadFieldElement";
import {UploadOutlined} from "@ant-design/icons";


let count = 0;
let length_fields = 0;
let elem_list = [];
let fields = [];
let additional_fields = {}
const { TextArea } = Input;

const AddThread = () => {
    const navigate = useNavigate();
    const params = useParams();
    const category_id = params.category;

    const [file, setFile] = useState(null);

    axios.get("http://127.0.0.1:8000/category_app/category/get_category_settings",
{headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
        .then(response => {
            fields = response.data.category.additional_fields
            document.getElementById("category_name").innerText = response.data.category.name
            response.data.category.additional_fields.map((element) => {
                elem_list.push(length_fields)
                const elements = document.getElementById("new-fields");
                const member_chat = document.createElement("div");
                member_chat.setAttribute('id', String(length_fields ) + "div");
                elements.append(member_chat);
                ReactDOM.hydrate(
                    <ThreadFieldElement id={length_fields} label={element} defaultValue={''}/>,
                    document.getElementById(String(length_fields)+"div")
                );
                length_fields += 1;
            })
            count = length_fields;
        })
        .catch(function (error) {
            console.log(error, "error");
        });

    function create(e) {
        const form = document.forms.fields;
        const name_category = form.elements.name.value;
        const description = form.elements.description.value;
        {elem_list && elem_list.map((element) => {
            const el_answer = form.elements.namedItem("answer" + element).value
            if (el_answer !== ""){
                additional_fields[fields[element]] =  el_answer
            }
        })}
        axios
            .post("http://127.0.0.1:8000/category_app/thread/create_thread", {
                name: name_category,
                description: description,
                creator: localStorage.getItem('token'),
                category: category_id,
                additional_fields:  additional_fields
            })
            .then(function (response) {
                console.log(response);
                const thread = response.data.thread_id
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file.fileList[0].originFileObj)
                    axios
                        .put("http://localhost:8000/category_app/thread/update_thread_image/" + thread,  formData)
                        .then(function (response) {
                          console.log(response);
                        })
                        .catch(function (error) {
                          console.log(error, "error");
                        });
                }
                navigate("/category/" + category_id);
                message.success(response.data.response_message);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        additional_fields = {}
     }

    return (
        <div>
            <Space>
                <p className={"fs-4 text-center"}>Добавить пост к категории</p>
                <p className={"fs-4 text-center strong"} id={"category_name"}> </p>
            </Space>
            <Form
                id="fields"
                name="fields"
                layout={"vertical"}
                initialValues={{ remember: true }}
                onFinish={create}
                autoComplete="off"
            >
                 <Form.Item
                     name={"name"}
                     label={"Название поста:"}
                     rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                 >
                    <Input name="name"/>
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Описание поста"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} name="description"/>
                </Form.Item>
                <div id={"new-fields"} />
                <Form.Item
                    name={"fileinfo"}
                    label={"Фото:"}
                    valuePropName={"fileList"}
                    getValueFromEvent={setFile}
                  >
                    <Upload
                        id={"upload_file"}
                        name="file"
                        listType="picture"
                        maxCount={1}
                        accept="image/png, image/jpg, image/jpeg"
                        beforeUpload={() => false}
                    >
                      <Button icon={<UploadOutlined />}>
                          Нажмите, чтобы загрузить файл
                      </Button>
                    </Upload>
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='rounded-md bg-blue-300'
                >
                    Создать пост
                </Button>
            </Form>
        </div>
    );
};

export default AddThread;
