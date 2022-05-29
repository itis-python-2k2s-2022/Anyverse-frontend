import React from 'react';
import {Space, Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";


const CategoryElement = (props) => {
      return (
        <a href={"/category/" + props.item._id}>
            <div className="post" id={props.item.name}>
                <Space>
                    <Avatar
                        shape="square"
                        size={64}
                        src={"http://127.0.0.1:8000/" + props.item.image}
                    />
                    <div>
                        {props.item.name}
                    </div>
                </Space>
            </div>
        </a>
    );
};

export default CategoryElement;