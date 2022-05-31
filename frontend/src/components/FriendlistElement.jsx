import React from 'react';
import "../styles/App.css"
import axios from "axios";
import ButtonRequest from "./ButtonRequest";
import ButtonDeleteFriend from "./ButtonDeleteFriend";
import {Avatar, Card, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";


const FriendlistElement = (props) => {

     const be_friend = async e => {

        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/login`, {headers:
            {token: localStorage.getItem('token')}
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });

        // }
    };

    return (
        <div>
            {console.log(props.flags)}
                <div id={props.key}>
                        <Card
                            type={"inner"}
                            style={{marginTop: 5, marginBottom: 5}}
                            extra={
                                props.flags ? (
                                    <ButtonDeleteFriend nickname={props.item.nickname}/>
                                    ) : (
                                        <Space>
                                            <ButtonRequest
                                                nickname={props.item.nickname}
                                                confirm={true}
                                                title={"Согласиться на дружбу"}
                                            />
                                            <ButtonRequest
                                                nickname={props.item.nickname}
                                                confirm={false}
                                                title={"Отклонить дружбу"}
                                            />
                                        </Space>
                                    )

                            }
                        >
                            <a href={"../default_profile/get_profile_info/" + props.item.nickname}>
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
                                        <p className={"fs-4 center"}>{props.item.nickname}</p>
                                        <div>
                                            <Space>
                                                <p className={"fs-5"}>{props.item.name}</p>
                                                <p className={"fs-5"}>{props.item.surname}</p>
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Card>
                </div>
        </div>
    );
}

export default FriendlistElement;
