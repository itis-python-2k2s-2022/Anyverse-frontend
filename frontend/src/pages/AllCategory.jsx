import React from 'react';
import axios from "axios";
import Category from "../components/Category";

const AllCategory = () => {

    axios.get("http://127.0.0.1:8000/category/get_subscriptions",
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <Category/>
            <h1>Подписки</h1>
        </div>
    );
};

export default AllCategory;