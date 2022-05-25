import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import CategoryElement from "./CategoryElement";

const ThreadList = (props) => {
      axios.get("http://127.0.0.1:8000/tread/get_category_threads",
        {headers:
                {token: localStorage.getItem('token')}, params:{category_id: props.id_category}
        })
        .then(response => {
            console.log(response);
            const listItems = response.data.categories.map((number) =>
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


        </div>
    );
};

export default ThreadList;