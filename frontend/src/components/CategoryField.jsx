import React from 'react';
import "../styles/App.css"
import {Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";


const CategoryField = (props) => {
    console.log('lllll')
    return (
        <div>
        <h1>kkkkkk</h1>
         <Form.Item>
             <Input name={"a" + props.id} type="text" id={props.id}/>
         </Form.Item>
        </div>
    );
}

export default CategoryField;
