import React from 'react';
import "../styles/App.css"
import {Button, Form, Input, Space} from "antd";
import {MinusCircleOutlined} from "@ant-design/icons";


const CategoryField = (props) => {
    function del(e) {
        const element = document.getElementById(props.id + "div");
        element.remove();
        const index = props.list.indexOf(props.id)
        props.list.splice(index, 1)
    }

    return (
        <div>
             <Form.Item
                 label={"Новое поле: "}
                 rules={[
                    {required: true, message: 'Пожалуйста, заполните это поле!'},
                  ]}
             >
                 <Space>
                     <Input
                         id={props.id}
                         name={"a" + props.id}
                         type="text"
                         defaultValue={props.defaultValue}
                         placeholder={"Введите название"}
                     />
                     <Button
                        className='rounded-md bg-blue-300'
                        onClick={del}
                    >
                     Убрать поле
                    </Button>
                 </Space>
             </Form.Item>
            <div id={props.id + "del"}/>
        </div>
    );
}

export default CategoryField;
