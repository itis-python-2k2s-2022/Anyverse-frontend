import React from 'react';
import "../styles/App.css"
import {Button, Form, Input, Col, Row,} from "antd";
import {UserOutlined} from "@ant-design/icons";
import ReactDOM from "react-dom";
import {fetchToken} from "./Auth";
import {Profile_} from "./Profile_element";


const ThreadFieldElement = (props) => {
    return (
        <div>
            {props.flag ? (
                <Input.Group size="large">
                    <Row gutter={8}>
                        <Col span={8}>
                            <Input  id={props.id} name={"title" + props.id} placeholder={props.label} />
                        </Col>
                        <Col span={8}>
                            <Input name={"answer" + props.id} placeholder={props.placeholder} />
                        </Col>
                    </Row>
                </Input.Group>
            ) : (
                <div>
                    <h1 name={"title" + props.id} >{ props.label}</h1>
                    <Form.Item>
                        <Input id={props.id} name={"answer" + props.id} type="text" placeholder={props.placeholder}/>
                    </Form.Item>
                </div>
                )}
            <div id={props.id + "del"}>
            </div>
        </div>
    );
}

export default ThreadFieldElement;
