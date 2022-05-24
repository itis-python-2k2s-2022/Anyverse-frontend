import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import CategoryField from "../components/CategoryField";
import ReactDOM from "react-dom";
import ChatElement from "../components/ChatElement";
import axios from "axios";
import Category from "../components/Category";
import ButtonDeleteField from "../components/ButtonDeleteField";

let count = 0;
let elem_list = [];
let additional_fields = [];

const AddCategory = () => {

    function add(e) {
        console.log('ogo');
        const elements = document.getElementById("fields");
        const member_chat = document.createElement("div");
        // console.log(count)
        elem_list.push(String(count));
        console.log(elem_list)
        member_chat.setAttribute('id', String(count) + "div");
        elements.append(member_chat);
        ReactDOM.hydrate(
            <CategoryField id={String(count)}
                           label={"Ваше поле"}
                           value={"введите"}
                           placeholder={"введите название поля"}/>,
            document.getElementById(String(count)+"div")
        );
        ReactDOM.hydrate(
            <ButtonDeleteField count={count} id={String(count)} list={elem_list}/>,
            document.getElementById(String(count)+"del")
        );
        count += 1
    }

    function create(e) {
        const form = document.forms.fields;
        const name_category = form.elements.name.value;
        const description = form.elements.description.value;
         // const additional_fields = elem_list.map((element) =>
         //     form.elements.namedItem("a" + element).value
         // );
        elem_list.map((element) => {
            const el_value = form.elements.namedItem("a" + element).value
            if (el_value != ""){
                additional_fields.push(el_value)
            }
        });
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

            })
            .catch(function (error) {
                console.log(error, "error");
            });
         additional_fields=[]
     }

    return (
        <div>
            <Category/>
            <Form id="fields" name="fields">
                <Form.Item  label="Название категории">
                    <Input name="name"/>
                </Form.Item>
                <Form.Item  label="Описание категории">
                    <Input name="description"/>
                </Form.Item>
                <Button
                onClick={add}>
                Добавить поле
                </Button>
                <Button
                    onClick={create}>
                    Создать
                </Button>
            </Form>

        </div>
    );
};

export default AddCategory;
