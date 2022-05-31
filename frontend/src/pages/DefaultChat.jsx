import React, {Component, useEffect, useState} from "react";
import {Button, Form, Input, List, Avatar, Skeleton, Divider } from "antd";
import axios from "axios";
import VirtualList from 'rc-virtual-list';
import MessageElement from "../components/MessageElement";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import {Link} from "react-router-dom";
import MessageListItem from "../components/MessageListItem";
import {fetchToken} from "../components/Auth";
import {Profile_} from "../components/ProfileElement";
import Chat from "../components/Chat";

const DefaultChat = (props) => {
    var ws = new WebSocket("ws://localhost:8000/ws/" + props.chat_id);
    return (
        <div>
         <Chat ws={ws} user_nickname={props.user_nickname} nickname={props.nickname} messages={props.messages}/>
        </div>
    );
}

export default DefaultChat;