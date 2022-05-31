import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
// import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Card, Avatar, Space} from "antd";


let nick = ""

export const Profile_  = () => {
    const navigate = useNavigate();

    const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

    const password_edit= () => {
    navigate("/update_password_info");
  };

    const profile_edit= () => {
    navigate("/update_profile_info/" + nick);
  };

    const image_edit=() => {
        navigate("/update_profile_image/" + nick);
    }

    axios.get("http://127.0.0.1:8000/profile/get_profile_info/", {params:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            nick = response.data.user.nickname
            const user = {
                name: response.data.user.name,
                nickname: response.data.user.nickname,
                surname: response.data.user.surname,
                url: response.data.user.image,
            };

            const block = document.getElementById("user_name")
            // block.append(element)
            block.innerText = response.data.user.name
            // block.append(element)
            const block1 = document.getElementById("user_nickname")
            block1.innerText = response.data.user.nickname
            const block2 = document.getElementById("user_surname")
            block2.innerText = response.data.user.surname;
            document.getElementById("user_image").src = "http://127.0.0.1:8000/" + user.url;
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <>
            <Card
                id={"user_card"}
                actions={[
                    <div onClick={profile_edit}>Изменить данные</div>,
                    <div onClick={password_edit}>Изменить пароль</div>,
                    <div onClick={image_edit}>Изменить фотографию</div>,
                    <div onClick={signOut}>Выйти</div>,
                ]}
              >
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Avatar
                          size={300}
                          shape={"square"}
                          id={"user_image"}
                        />
                    </div>
                    <div className={"col-8"}>
                        <div>
                            <Space>
                                <p className={"fs-4"}>Никнейм: </p>
                                <p className={"fs-5"} id={"user_nickname"}/>
                            </Space>
                        </div>
                        <div>
                            <Space>
                                <p className={"fs-4"}>Имя: </p>
                                <p className={"fs-5"} id={"user_name"}/>
                            </Space>
                        </div>
                        <div>
                            <Space>
                                <p className={"fs-4"}>Фамилия: </p>
                                <p className={"fs-5"} id={"user_surname"}/>
                            </Space>
                        </div>
                    </div>
                </div>
            </Card>
        </>
      );
}