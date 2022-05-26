import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

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


    axios.get("http://127.0.0.1:8000/profile/get_profile_info/", {params:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            console.log(response);
            nick = response.data.user.nickname
            const user = {
                name: response.data.user.name,
                nickname: response.data.user.nickname,
                surname: response.data.user.surname,
                url: response.data.user.image,
            };
            console.log(user.name)

            const block = document.getElementById("user_name")
            // block.append(element)
            block.innerText = response.data.user.name
            // block.append(element)
            const block1 = document.getElementById("user_nickname")
            block1.innerText = response.data.user.nickname
            const block2 = document.getElementById("user_surname")
            block2.innerText = response.data.user.surname
            const images_user = document.createElement('img');
            images_user.src = "http://127.0.0.1:8000/" + user.url;
            const img_mom = document.getElementById("user_image");
            img_mom.append(images_user);
        })
          .catch(function (error) {
                console.log(error, "error");
            });


    return (
        <>
            <div id="user_image">
            </div>
            <h1>ИМЯ:</h1>
            <div id="user_name">
            </div>
            <h1>НИКНЕЙМ:</h1>
             <div id="user_nickname">
             </div>
            <h1>ФАМИЛИЯ:</h1>
             <div id="user_surname">
             </div>
            <button onClick={signOut}>выйти</button>
            <button onClick={profile_edit}>Изменить данные</button>
            <button onClick={password_edit}>Изменить пароль</button>
        </>
      );
}