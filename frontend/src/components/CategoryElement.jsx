import React from 'react';
import {Space, Avatar} from "antd";
import {UserOutlined, TeamOutlined } from "@ant-design/icons";


const CategoryElement = (props) => {
      return (
        <a href={"/category/" + props.item._id}>
            <div className="post" id={props.item.name}>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-1"}>
                    <Avatar
                        shape="square"
                        size={64}
                        src={"http://127.0.0.1:8000/" + props.item.image}
                    />
                    </div>
                    <div className={"col-10"}>
                        {props.item.name}
                    </div>
                    <div className={"col-1"}>
                        <TeamOutlined /> {props.item.subscriptions}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default CategoryElement;