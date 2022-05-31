import React from 'react';
import {Space, Avatar, Card} from "antd";
import {UserOutlined, TeamOutlined } from "@ant-design/icons";


const CategoryElement = (props) => {
      return (
        <a
            href={"/category/" + props.item._id}
        >
            <Card
                id={props.item._id}
                style={{marginTop: 8}}
            >
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-1"}>
                    <Avatar
                        shape="square"
                        size={64}
                        src={`${process.env.REACT_APP_API_URL}/` + props.item.image}
                    />
                    </div>
                    <div className={"col-10"}>
                        {props.item.name}
                    </div>
                    <div className={"col-1"}>
                        <TeamOutlined /> {props.item.subscriptions}
                    </div>
                </div>
            </Card>
        </a>
    );
};

export default CategoryElement;