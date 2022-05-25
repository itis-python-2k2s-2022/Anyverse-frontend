import React from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import {useParams} from "react-router-dom";
import ButtonBeFriend from "../components/ButtonBeFriend";


function DefaultProfile() {
    const navigate = useNavigate();

    // const useParams = ReactRouterDOM.useParams;
    const params = useParams();
    const user_nickname = params.nickname;

    const send_message= () => {
    navigate("/chat/open_chat/" + user_nickname);
  };

    console.log(localStorage.getItem('token'))
    axios.get("http://127.0.0.1:8000/profile/get_profile_info/" + user_nickname,
        {headers:
                {token: localStorage.getItem('token')}
        })
      // axios
      //       .post("/profile/get_profile_info/", {
      //           token: localStorage.getItem('token')
      //       })
        .then(response => {
            console.log(response);
            const user = {
                name: response.data.user.name,
                nickname: response.data.user.nickname,
                surname: response.data.user.surname
            }
            const block = document.getElementById("user_name")
            // block.append(element)
            block.innerText = user.name
            // block.append(element)
            const block1 = document.getElementById("user_nickname")
            block1.innerText = user.nickname
            const block2 = document.getElementById("user_surname")
            block2.innerText = user.surname


        })
          .catch(function (error) {
                console.log(error, "error");
            });

  return (
      <><h1>ИМЯ:</h1>
            <div id="user_name"></div>
          <h1>НИКНЕЙМ:</h1>
             <div id="user_nickname"></div>
          <h1>ФАМИЛИЯ:</h1>
             <div id="user_surname"></div>
          <button onClick={send_message}>Написать сообщение</button>
          <ButtonBeFriend nickname={user_nickname}/>
      </>
  );
}

export default DefaultProfile;