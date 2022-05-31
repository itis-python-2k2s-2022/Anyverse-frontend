import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import FriendElement from "../components/FriendElement";
import {Button, Form, Input} from "antd";

const RecommFriends = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user_app/friendlist/get_recommended_friends`,
         {headers: {token: localStorage.getItem('token')}
         })
            .then(response => {
                for (let number of response.data.friends) {
                            const el_people = document.getElementById("people_list")
                    console.log(number)
                    let member_category = document.createElement("div");
                    member_category.setAttribute('id', number.nickname)
                    el_people.append(member_category)
                }
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

    return (
         <div>
             <div id="people_list">
             </div>
        </div>
    );
};


export default RecommFriends;