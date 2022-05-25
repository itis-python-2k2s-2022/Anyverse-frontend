import React from 'react';
import "../styles/App.css"
import {Button, Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import ReactDOM from "react-dom";


const CategoryField = (props) => {
    return (
        <div>
        <h1>{props.label}</h1>
         <Form.Item>
             <Input id={props.id} name={"a" + props.id} type="text" placeholder={props.placeholder}/>
         </Form.Item>
            <div id={props.id + "del"}>

            </div>
        </div>
    );
}

export default CategoryField;
