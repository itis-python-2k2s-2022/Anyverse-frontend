import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";


const AllCategory = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/category_app/category/get_subscriptions`,
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
            response.data.categories.map((number) =>
            {console.log(number)
                const elements = document.getElementById("sub");
                  const member_category = document.createElement("div");
                  member_category.setAttribute('id', number.name)
                  elements.append(member_category)
                 });
            response.data.categories.map((item) =>
                 ReactDOM.hydrate(
                     <CategoryElement item={item}/>,
                     document.getElementById(item.name)
                 )
             );
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
        <div>
            <h1>Подписки</h1>
            <div id="sub"> </div>
        </div>
    );
};

export default AllCategory;