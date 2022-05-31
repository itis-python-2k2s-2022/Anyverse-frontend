import React from 'react';
import { useNavigate } from "react-router";
import {Button} from "antd";
import axios from "axios";
import {useParams} from "react-router-dom";
import ButtonBeFriend from "../components/ButtonBeFriend";
import {fetchToken} from "../components/Auth";
import {Profile_} from "../components/ProfileElement";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import ButtonForAnotherUser from "../components/ButtonForAnotherUser";

let status = 0;

function DefaultProfile() {
    const navigate = useNavigate();

    // const useParams = ReactRouterDOM.useParams;
    const params = useParams();
    const user_nickname = params.nickname;

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
                surname: response.data.user.surname
            }
            const block = document.getElementById("user_name")
            block.innerText = user.name
            const block1 = document.getElementById("user_nickname")
            block1.innerText = user.nickname
            const block2 = document.getElementById("user_surname")
            block2.innerText = user.surname
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
      <><h1>ИМЯ:</h1>
            <div id="user_name">
            </div>
          <h1>НИКНЕЙМ:</h1>
             <div id="user_nickname">
             </div>
          <h1>ФАМИЛИЯ:</h1>
             <div id="user_surname">
             </div>
          <div id="buttons">
          </div>
      </>
  );
}

export default DefaultProfile;