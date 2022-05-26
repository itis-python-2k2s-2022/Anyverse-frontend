import React from 'react';
import axios from "axios";
import Category from "../components/Category";
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import ReactDOM from "react-dom";
import CategoryField from "../components/CategoryField";
import ButtonDeleteField from "../components/ButtonDeleteField";
import {useNavigate} from "react-router";

let count = 0;
let elem_list = [];
let result_list = [];
let id_category = ""

const UpdateCategory = () => {

    const navigate = useNavigate();
    const params = useParams();
    const category_id = params.category;

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
                ReactDOM.hydrate(
                    <ButtonDeleteField count={count} id={String(length_fields )} list={elem_list}/>,
                    document.getElementById(String(length_fields )+"del")
                );
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
            <CategoryField id={String(count)}
                           label={"Ваше новое поле"}
                           placeholder={"введите название поля"}/>,
            document.getElementById(String(count)+"div")
        );
        ReactDOM.hydrate(
            <ButtonDeleteField count={count} id={String(count)} list={elem_list}/>,
            document.getElementById(String(count)+"del")
        );
        count += 1
    }

    const update = () => {
        const someFile = document.getElementById("upload_file").files[0]
        console.log(someFile)
        const formData = new FormData();
        formData.append('file', someFile)
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
         result_list = []
    }

    return (
        <div>
            <Category/>
            <Form id="fields" name="fields">
                <Form.Item  label="Название категории">
                    <Input id="name" name="name" placeholder=""/>
                </Form.Item>
                <Form.Item  label="Описание категории">
                    <Input id="description" placeholder="" name="description"/>
                </Form.Item>
                <Button
                onClick={add}>
                Добавить поле
                </Button>
                <Button
                    onClick={update}>
                    Сохранить
                </Button>
            </Form>
            <div id="fields">

            </div>
            <form id="fileinfo">
                <input type="file" id="upload_file" name="file" accept="image/png, image/jpg, image/jpeg" multiple />
            </form>
        </div>
    );
};

export default UpdateCategory;
