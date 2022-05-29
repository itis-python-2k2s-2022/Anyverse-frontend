import React from 'react';
import "../styles/App.css"
import {Form, Input, Col, Row,} from "antd";


const ThreadFieldElement = (props) => {
    return (
        <div>
            <Form.Item
                label={props.label}
                rules={[
                    {required: true, message: 'Пожалуйста, заполните это поле!'},
                  ]}
            >
                <Input
                    id={props.id}
                    name={"answer" + props.id}
                    type="text"
                    placeholder={"Ваши мысли"}
                />
            </Form.Item>
        </div>
    );
}

export default ThreadFieldElement;
