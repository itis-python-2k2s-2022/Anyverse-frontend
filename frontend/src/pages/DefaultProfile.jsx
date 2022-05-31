import React, {useState} from 'react';
import { useNavigate } from "react-router";
import {Avatar, Button, Card, Space} from "antd";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactDOM from "react-dom";
import ButtonForAnotherUser from "../components/ButtonForAnotherUser";
import {SmileOutlined} from "@ant-design/icons";

let status = 0;

function DefaultProfile() {
    const navigate = useNavigate();

    // const useParams = ReactRouterDOM.useParams;
    const params = useParams();
    const user_nickname = params.nickname;
    const [srcImage, setSrcImage] = useState(null)

    const send_message= () => {
    navigate("/chat/open_chat/" + user_nickname);
  };

    console.log(localStorage.getItem('token'))
    axios.get(`${process.env.REACT_APP_API_URL}/profile/get_profile_info/` + user_nickname,
        {headers:
                {token: localStorage.getItem('token')}
        })
      // axios
      //       .post("/profile/get_profile_info/", {
      //           token: localStorage.getItem('token')
      //       })
        .then(response => {
            console.log(response);
            status = response.data.user.user_state
            const user = {
                name: response.data.user.name,
                nickname: response.data.user.nickname,
                surname: response.data.user.surname,
                image: response.data.user.image
            }
            const block = document.getElementById("user_name")
            block.innerText = user.name
            const block1 = document.getElementById("user_nickname")
            block1.innerText = user.nickname
            const block2 = document.getElementById("user_surname")
            block2.innerText = user.surname
            setSrcImage(user.image);
            ReactDOM.hydrate(
                     <ButtonForAnotherUser user_nickname={user.nickname}
                     status={status}/>,
                     document.getElementById("buttons")
            )
        })
          .catch(function (error) {
                console.log(error, "error");
            });

  return (
      <>
          <Card
                id={"profile_card"}
                // actions={[
                //     <div onClick={profile_edit}>Изменить данные</div>,
                //     <div onClick={password_edit}>Изменить пароль</div>,
                //     <div onClick={signOut}>Выйти</div>,
                // ]}
              >
                <div className={"row"}>
                    <div className={"col-4"}>
                        {srcImage ? (
                            <Avatar
                              size={300}
                              shape={"square"}
                              id={"user_image"}
                              src={"http://127.0.0.1:8000/" + srcImage}
                            />
                        ) : (
                            <Avatar
                              size={300}
                              shape={"square"}
                              id={"user_image"}
                              icon={<SmileOutlined />}
                            />
                        )}
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
          <div id="buttons">
          </div>
      </>
  );
}

export default DefaultProfile;