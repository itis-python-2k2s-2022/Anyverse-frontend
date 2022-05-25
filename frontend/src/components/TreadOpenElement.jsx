import React from 'react';
import "../styles/App.css"
import {Form, Input, Col, Row,} from "antd";


const TreadOpenElement = (props) => {
    return (
        <div>
            <h1 name={"title" + props.id} >{ props.label}</h1>
            <h1 name={"answer" + props.id}>{props.placeholder}</h1>
        </div>
    );
};

export default TreadOpenElement;
