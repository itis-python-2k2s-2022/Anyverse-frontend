import React from 'react';
import "../styles/App.css";
import {Avatar, Card, Space} from "antd";

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
                            <Avatar
                              size={90}
                              shape={"square"}
                              id={"user_image"}
                              src={"http://127.0.0.1:8000/" + props.item.image}
                            />
                        </div>
                        <div className={"col"}>
                            <p className={"fs-4 center"}>{props.item.nickname}</p>
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

