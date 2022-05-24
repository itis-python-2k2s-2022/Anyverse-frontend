import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import {Button, Form, Input} from "antd";
import FriendElement from "../components/FriendElement";

const SearchFriend = () => {
    function search(e) {
        const el_people = document.getElementById("people_list")
        while(el_people.firstChild){
            el_people.removeChild(el_people.firstChild);
        }
        const form = document.forms.form_search;
        const query = form.elements.search.value;
        const el_common = document.createElement("div");
        el_common.setAttribute('id', "people_list");
        axios.get("http://127.0.0.1:8000/user_app/friendlist/get_searched_users",
         {params: {query: query}
         })
            .then(response => {
                const listItems = response.data.friends.map((number) =>
                {console.log(number)
                    const member_category = document.createElement("div");
                    member_category.setAttribute('id', number.nickname)
                    el_people.append(member_category)
                });
                response.data.friends.map((item) =>
                    ReactDOM.hydrate(
                        <FriendElement item={item}/>,
                        document.getElementById(item.nickname)
                    )
                );
            })
            .catch(function (error) {
                console.log(error, "error");
            })
            .finally(response => {});
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
                 <div id="people_list"></div>
             </div>
        </div>
    );
};

export default SearchFriend;