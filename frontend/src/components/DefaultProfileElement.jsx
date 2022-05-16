import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export const DefaultProfileElement  = () => {

    axios.get("http://127.0.0.1:8000/profile/get_profile_info/")
      // axios
      //       .post("/profile/get_profile_info/", {
      //           token: localStorage.getItem('token')
      //       })
        .then(response => {
            console.log(response);

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
        </>
      );
}