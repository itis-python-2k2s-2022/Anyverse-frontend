import React, {useState} from 'react';
import {Button, Form, Input, Upload} from "antd";
import CategoryField from "../components/CategoryField";
import ReactDOM from "react-dom";
import axios from "axios";
import {useNavigate} from "react-router";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons"


let count = 0;
let elem_list = [];
let additional_fields = [];

const AddCategory = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    function add(e) {
        const elements = document.getElementById("new-fields");
        const member_chat = document.createElement("div");
        elem_list.push(String(count));
        member_chat.setAttribute('id', String(count) + "div");
        elements.append(member_chat);
        ReactDOM.hydrate(
            <CategoryField id={String(count)} defaultValue={""}/>,
            document.getElementById(String(count)+"div")
        );
        count += 1
    }

    function create(e) {
        const formData = new FormData();
        console.log(formData);
        formData.append('file', file.fileList[0].originFileObj)
        const form = document.forms.addCategoryForm;
        console.log(form);
        const name_category = form.elements.name.value;
        const description = form.elements.description.value;
         // const additional_fields = elem_list.map((element) =>
         //     form.elements.namedItem("a" + element).value
         // );
        console.log(elem_list);
        {elem_list && elem_list.map((element) => {
            const el_value = form.elements.namedItem("a" + element).value
            if (el_value !== ""){
                additional_fields.push(el_value)
            }
        })}
        console.log(additional_fields)
         // for (let step = 0; step < count; step++) {
         //    const val = "a" +  String(step)
         //    const comp = form.elements.namedItem(val).value
         //    additional_fields.push(comp);
         //    console.log(additional_fields);
         // }
        axios
            .post("http://127.0.0.1:8000/category_app/category/create_category", {
                name: name_category,
                description: description,
                creator: localStorage.getItem('token'),
                additional_fields:  additional_fields
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data.category_id)
                const category = response.data.category_id
                  axios
            .put("http://localhost:8000/category_app/category/update_category_image/" + category,  formData)
            .then(function (response) {
              console.log(response);
              navigate("/category/subscriptions");
            })
            .catch(function (error) {
              console.log(error, "error");
            });
            })
            .catch(function (error) {
                console.log(error, "error");
            });
         additional_fields=[]
     }

    return (
        <div>
            <Form
                id={"addCategoryForm"}
                name={"fields"}
                layout={"horizontal"}
                initialValues={{ remember: true }}
                onFinish={create}
                autoComplete="off"
            >
                <Form.Item
                    name={"name"}
                    label="Название категории: "
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input name={"name"}/>
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Описание категории: "
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input name="description"/>
                </Form.Item>
                <Form.Item
                    name={"fileinfo"}
                    label={"Фото:"}
                    valuePropName={"fileList"}
                    getValueFromEvent={setFile}
                  >
                    <Upload
                        id={"category_img"}
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
                <div id={"new-fields"} />
                <Form.Item>
                    <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                        Добавить поле
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='rounded-md bg-blue-300'
                    >
                        Создать категорию
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCategory;
