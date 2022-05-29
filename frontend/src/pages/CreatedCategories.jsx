import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";


const CreatedCategories = () => {

  axios.get("http://127.0.0.1:8000/category_app/category/get_created_categories",
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data.categories);

             response.data.categories.map((number) =>
                 {console.log(number)
                  const elements = document.getElementById("categories");
                  const member_category = document.createElement("div");
                  member_category.setAttribute('id', number.name)
                  elements.append(member_category)
                 }
             );

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
            <h1>Мои категории</h1>
            <div id="categories"> </div>
        </div>
    );

};

export default CreatedCategories;