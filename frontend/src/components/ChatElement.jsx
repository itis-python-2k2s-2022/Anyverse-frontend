import React from 'react';
import "../styles/App.css"
import {Avatar, Button, Card, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";


const ChatElement = (props) => {
    console.log(props.item)
    return (
        <a href={"/chat/open_chat/" + props.item.nickname}>
            <Card
                id={props.key}
                type={"inner"}
                style={{marginTop: 16}}
                title={
                    <Space>
                        {props.item.image ? (
                            <Avatar
                              src={`${process.env.REACT_APP_API_URL}/` + props.item.image}
                              size={50}
                            />
                        ) : (
                            <Avatar
                              icon={<SmileOutlined />}
                              size={50}
                            />
                        )}
                        <p className={"fs-5"}>{props.item.nickname}</p>
                    </Space>
                }
            >
                <Space>
                    <p className={"fs-5"}>{props.item.last_user}: </p>
                    <p className={"fs-5"}>{props.item.last_message}</p>
                </Space>
            </Card>
        </a>
    );
}

export default ChatElement;
