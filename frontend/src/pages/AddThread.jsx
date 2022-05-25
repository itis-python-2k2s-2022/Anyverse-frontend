import React from 'react';
import {Button, Form, Input} from "antd";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import Category from "../components/Category";
import ButtonDeleteField from "../components/ButtonDeleteField";
import {useParams} from "react-router-dom";
import ThreadFieldElement from "../components/ThreadFieldElement";

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

    axios.get("http://127.0.0.1:8000/category_app/category/get_category_settings",
{headers: { token: localStorage.getItem('token')}, params: {category: category_id}})
        .then(response => {
            fields = response.data.category.additional_fields
            document.getElementById("name").innerText = response.data.category.name
            response.data.category.additional_fields.map((element) => {
                elem_list.push(length_fields)
                const elements = document.getElementById("fields");
                const member_chat = document.createElement("div");
                member_chat.setAttribute('id', String(length_fields ) + "div");
                elements.append(member_chat);
                ReactDOM.hydrate(
                    <ThreadFieldElement id={length_fields }
                                   label={element}
                                   value={"Ваши мысли"}
                                   placeholder={"Ваши мысли"}/>,
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
        elem_list.map((element) => {
            console.log("title" + element)
            console.log(fields[element])
            const el_answer = form.elements.namedItem("answer" + element).value
            if (el_answer !== ""){
                additional_fields[fields[element]] =  el_answer
            }
        });
        console.log(additional_fields)
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
                navigate("/category/" + category_id);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        additional_fields = {}
     }

    return (
        <div>
            <Category/>
            <div id="name">
            </div>
            <Form id="fields" name="fields">
                 <Form.Item  label="Название поста">
                    <Input name="name"/>
                </Form.Item>
                <Form.Item  label="Описание поста">
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} name="description"/>
                </Form.Item>
                <Button
                    onClick={create}>
                    Создать
                </Button>
            </Form>
        </div>
    );
};

export default AddThread;
