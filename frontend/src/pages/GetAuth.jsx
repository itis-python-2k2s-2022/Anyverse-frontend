import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

const GetAuth = () => {
    const navigate = useNavigate();
    let token = document.location.href

    token = token.split('#access_token=')[1]
    token = token.split('&')[0]
    console.log(token)

    axios.get("http://127.0.0.1:8000/auth/oauth",
        {params: {access_token: token}})
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                navigate("/profile/get_profile_info");
            }
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <h1>Подождите</h1>
        </div>
    );
};

export default GetAuth;