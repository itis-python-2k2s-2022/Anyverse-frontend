import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import {Button, Form, Input} from "antd";


const SearchCategory = () => {
    function search(e) {
        const el_category = document.getElementById("category_list")
        while(el_category.firstChild){
            el_category.removeChild(el_category.firstChild);
        }
        const form = document.forms.form_search;
        const query = form.elements.search.value;
     axios.get(`${process.env.REACT_APP_API_URL}/category_app/category/get_searched_categories`,
        {params: {query: query}
        })
        .then(response => {
             const listItems = response.data.categories.map((number) =>
                 {console.log(number)
                     const member_category = document.createElement("div");
                     member_category.setAttribute('id', number.name)
                     el_category.append(member_category)
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
     }

    return (
        <div>
            <Form id="form_search" name="form_search">
                <Form.Item  label="Искать">
                    <Input name="search"/>
                </Form.Item>
                <Button
                onClick={search}>
                Найти
                </Button>
           </Form>
             <div id="result_search">
                 <div id="category_list"> </div>
             </div>
        </div>
    );
};

export default SearchCategory;