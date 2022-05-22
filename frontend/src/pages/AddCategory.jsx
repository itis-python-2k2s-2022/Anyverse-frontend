import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import CategoryField from "../components/CategoryField";
import ReactDOM from "react-dom";
import ChatElement from "../components/ChatElement";
import axios from "axios";
import Category from "../components/Category";

let count = 0;
let additional_fields = [];

const AddCategory = () => {

    function add(e) {
        console.log('ogo');
        const elements = document.getElementById("fields");
        const member_chat = document.createElement("div");
        console.log(count)
        member_chat.setAttribute('id', String(count));
        elements.append(member_chat);
        ReactDOM.hydrate(
            <CategoryField id={String(count)}/>,
            document.getElementById(String(count))
                 );
        count += 1
    };

     // function create(e) {
     //     const form = document.forms.fields;
     //     const name_category = form.elements.name.value;
     //     console.log(name_category);
     //     const description = form.elements.description.value;
     //     console.log(description);
     //     const elements = form.elements.answer;
     //     console.log(elements[0].value)
     //     for (let step = 0; step <= count; step++) {
     //         if (elements[step].value) {
     //             additional_fields.push(elements[step].value);
     //             console.log(additional_fields);
     //         }
     //     }
     //     post_add(name_category, description, additional_fields)
     // }
    function add_fields(form) {
        for (let step = 0; step < count; step++) {
            const val = "a" +  String(step)
            const comp = form.elements.namedItem(val).value
            additional_fields.push(comp);
                 console.log(additional_fields);
         }
    }
     function create(e) {
         const form = document.forms.fields;
         const name_category = form.elements.name.value;
         const description = form.elements.description.value;
         for (let step = 0; step < count; step++) {
            const val = "a" +  String(step)
            const comp = form.elements.namedItem(val).value
            additional_fields.push(comp);
            console.log(additional_fields);
         }
         axios
            .post("http://127.0.0.1:8000/category/create_category", {
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