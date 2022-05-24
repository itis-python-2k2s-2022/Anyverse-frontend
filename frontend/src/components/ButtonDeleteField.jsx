import React from 'react';
import {Button} from "antd";

const ButtonDeleteField = (props) => {
    function del(e) {
        console.log('aga');
        const element = document.getElementById( props.id + "div");
        element.remove();
        const index = props.list.indexOf(props.id)
        props.list.splice(index, 1)
        console.log(index)
        console.log(props)
    }
    return (
        <div>
            <Button
             onClick={del}>
             Убрать поле
            </Button>
        </div>
    );
};

export default ButtonDeleteField;