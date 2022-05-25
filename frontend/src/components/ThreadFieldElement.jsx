import React from 'react';
import "../styles/App.css"
import {Form, Input, Col, Row,} from "antd";


const ThreadFieldElement = (props) => {
    return (
        <div>
            <h1 name={"title" + props.id} >{ props.label}</h1>
            <Form.Item>
                <Input id={props.id} name={"answer" + props.id} type="text" placeholder={props.placeholder}/>
            </Form.Item>
        </div>
    );
}

export default ThreadFieldElement;
