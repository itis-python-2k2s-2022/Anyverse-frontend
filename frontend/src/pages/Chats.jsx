import React from 'react';
import axios from "axios";
import ChatElement from "../components/ChatElement";


function Chats() {
    const object_chats = [];
    const listItems = [];
    const result = [];

    axios.get("http://127.0.0.1:8000/chat/get_chats", {headers:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            // console.log(response.data.chats[0]);
             const listItems = response.data.chats.map((number) =>
                 // number
                 console.log(number)
                 // <li>{number.name}</li>
             );
             const result = listItems.map((number) =>
                 number
             );
             console.log(result)
            const object_chats = response.data.chats
            const block = document.getElementById("user_name")
            // block.append(element)
            block.innerText = object_chats[0]
        })
        .catch(function (error) {
            console.log(error, "error");
        })
        .finally(response => {
            const object_chats = response.data.chats
        });

    // const numbers = [1, 2, 3, 4, 5];
    // const listItems = object_chats.map((number) =>
    //     <li>{number}</li>
    // );


    return (
        <div>
            <h1>Чаты</h1>
            {result}
            <div id="user_name"></div>
            {object_chats}
            {/*<div>*/}
            {/*    {object_chats.map(function(object_chats, i =1){*/}
            {/*        return <ChatElement obj={object_chats} key={i} />;*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
}

export default Chats;
