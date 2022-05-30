import React from 'react';
import "../styles/App.css"
import {Form, Input, Col, Row,} from "antd";


const ThreadFieldElement = (props) => {
    return (
        <div>
            <Form.Item
                name={"thread_name"+props.id}
                label={props.label}
                rules={[
                    {required: true, message: 'Пожалуйста, заполните это поле!'},
                  ]}
            >
                <Input
                    id={props.id}
                    name={"answer" + props.id}
                    type={"text"}
                    defaultValue={props.defaultValue}
                    placeholder={"Ваши мысли"}
                />
            </Form.Item>
        </div>
    );
}

export default ThreadFieldElement;
