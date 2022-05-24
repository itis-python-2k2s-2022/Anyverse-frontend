import React from 'react';
import axios from "axios";
import Category from "../components/Category";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";

const RecommCategory = () => {
axios.get("http://127.0.0.1:8000/category_app/category/get_recommended_categories",
        {headers:
                {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data.categories);

             const listItems = response.data.categories.map((number) =>
                 {console.log(number)
                  const elements = document.getElementById("recomm");
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
            <Category />
            <h1>Мои категории</h1>
            <div id="recomm"></div>

        </div>
    );
};

export default RecommCategory;