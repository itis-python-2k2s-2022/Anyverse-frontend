import React from 'react';
import "../styles/App.css"
import {Form, Input, Col, Row, Space,} from "antd";


const TreadOpenElement = (props) => {
    return (
        <Space>
            <p className={"fs-4"} name={"title" + props.id}>{ props.label}: </p>
            <p className={"fs-5"} name={"answer" + props.id}>{props.placeholder}</p>
        </Space>
    );
};

export default TreadOpenElement;
