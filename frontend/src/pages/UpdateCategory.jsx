import React, {useState} from 'react';
import axios from "axios";
import {Button, Form, Input, message, Upload} from "antd";
import {useParams} from "react-router-dom";
import ReactDOM from "react-dom";
import CategoryField from "../components/CategoryField";
import {useNavigate} from "react-router";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";

let count = 0;
let elem_list = [];
let result_list = [];
let id_category = ""

const UpdateCategory = () => {

    const navigate = useNavigate();
    const params = useParams();
    const category_id = params.category;

    const [file, setFile] = useState(null);

    axios.get(`${process.env.REACT_APP_API_URL}/category_app/category/get_category_settings`,
{headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
        .then(response => {
            let length_fields = 0;
            id_category = response.data.category._id;
            document.getElementById("category_name").defaultValue = response.data.category.name
            document.getElementById("category_description").defaultValue = response.data.category.description
            response.data.category.additional_fields.map((element) => {
                elem_list.push(length_fields)
                const elements = document.getElementById("fields");
                const member_chat = document.createElement("div");
                member_chat.setAttribute('id', String(length_fields) + "div");
                elements.append(member_chat);
                ReactDOM.hydrate(
                    <CategoryField id={length_fields} defaultValue={element.name}/>,
                    document.getElementById(String(length_fields)+"div")
                );
                document.getElementById(String(length_fields)).value = element;
                length_fields += 1;
            })
            count = length_fields;
        })
        .catch(function (error) {
            console.log(error, "error");
        });


     function add(e) {
        const elements = document.getElementById("fields");
        const member_chat = document.createElement("div");
        elem_list.push(String(count));
        member_chat.setAttribute('id', String(count) + "div");
        elements.append(member_chat);
        ReactDOM.hydrate(
            <CategoryField id={String(count)} />,
            document.getElementById(String(count)+"div")
        );
        count += 1
    }

    const update = () => {
         const form = document.forms.fields;
         const name_category = form.elements.category_name.value;
         const description = form.elements.category_description.value;
         elem_list.map((element) => {
            const el_value = form.elements.namedItem("a" + element).value
            if (el_value !== ""){
                result_list.push(el_value)
            }
        });

         axios.put(`${process.env.REACT_APP_API_URL}/category_app/category/update_category`,
        {
            category_id: id_category,
            name: name_category,
            description: description,
            additional_fields:  result_list
        })
        .then(response => {
            console.log(file);
            if (file) {
                const formData = new FormData();
                formData.append('file', file.fileList[0].originFileObj)
                const category = response.data.category_id
            axios
             .put("http://localhost:8000/category_app/category/update_category_image/" + category,  formData)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error, "error");
            });
            }
            navigate("/category/subscriptions");
            message.success(response.data.response_message);
        })
          .catch(function (error) {
                console.log(error, "error");
            });
         result_list = []
    }

    return (
        <div>
            <Form
                id="fields"
                name="fields"
                layout={"horizontal"}
                initialValues={{ remember: true }}
                onFinish={update}
                autoComplete="off"
            >
                <Form.Item
                    name={"name"}
                    label="Название категории"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input
                        id="category_name"
                        placeholder={"Название"}
                        type={"text"}
                    />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Описание категории"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input
                        id="category_description"
                        placeholder={"Описание"}
                        type={"text"}
                    />
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
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateCategory;
