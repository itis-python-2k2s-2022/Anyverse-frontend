import React from 'react';
import "../styles/App.css";
import {Avatar, Card, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";

const FriendElement = (props) => {
    return (
        <div
            id={props.item.nickname}
            style={{marginTop: 16}}
        >
            <a href={"../default_profile/get_profile_info/" + props.item.nickname}>
                <Card
                    id={props.item.nickname}
                >
                    <div className={"row"}>
                        <div className={"col-1"}>
                            {props.item.image ? (
                                <Avatar
                                  size={90}
                                  shape={"square"}
                                  id={"user_image"}
                                  src={`${process.env.REACT_APP_API_URL}/` + props.item.image}
                                />
                            ) : (
                                <Avatar
                                  size={90}
                                  shape={"square"}
                                  id={"user_image"}
                                  icon={<SmileOutlined />}
                                />
                            )}

                        </div>
                        <div className={"col"}>
                            <p className={"fs-4"}>{props.item.nickname}</p>
                            <div>
                                <Space>
                                    <p className={"fs-5"}>{props.item.name}</p>
                                    <p className={"fs-5"}>{props.item.surname}</p>
                                </Space>
                            </div>
                        </div>
                    </div>
                </Card>
            </a>
        </div>
    );
}
export default FriendElement;

