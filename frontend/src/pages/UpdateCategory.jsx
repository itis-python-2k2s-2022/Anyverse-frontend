import React, {useState} from 'react';
import axios from "axios";
import {Button, Form, Input, Upload} from "antd";
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

    axios.get("http://127.0.0.1:8000/category_app/category/get_category_settings",
{headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
        .then(response => {
            let length_fields = 0;
            id_category = response.data.category._id;
            document.getElementById("name").placeholder = response.data.category.name
            document.getElementById("name").value = response.data.category.name
            document.getElementById("description").placeholder = response.data.category.description
            document.getElementById("description").value = response.data.category.description
            response.data.category.additional_fields.map((element) => {
                elem_list.push(length_fields)
                const elements = document.getElementById("fields");
                const member_chat = document.createElement("div");
                member_chat.setAttribute('id', String(length_fields ) + "div");
                elements.append(member_chat);
                ReactDOM.hydrate(
                    <CategoryField id={length_fields }
                                   label={"Ваше поле"}
                                   value={element}
                                   placeholder={element}/>,
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
         const name_category = form.elements.name.value;
         const description = form.elements.description.value;
         elem_list.map((element) => {
            const el_value = form.elements.namedItem("a" + element).value
            if (el_value !== ""){
                result_list.push(el_value)
            }
        });

         axios.put("http://127.0.0.1:8000/category_app/category/update_category",
        {
            category_id: id_category,
            name: name_category,
            description: description,
            additional_fields:  result_list
        })
        .then(response => {
            console.log(response);
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
                    name={"category_name"}
                    label="Название категории"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input id="name" name="name" placeholder=""/>
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Описание категории"
                    rules={[
                        {required: true, message: 'Пожалуйста, заполните это поле!'},
                      ]}
                >
                    <Input id="description" placeholder="" name="description"/>
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
