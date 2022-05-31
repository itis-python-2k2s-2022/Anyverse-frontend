import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Button, Form, Input, List, message} from "antd";
import VirtualList from "rc-virtual-list";

let count = 0;
const ContainerHeight = 500;

const Chat = (props) => {
  const [me, setMe] = useState(false)
  const [data, setData] = useState(props.messages);
  const error = () => {
  message.error('Пустое сообщение нельзя отправить(');
};

    const post_message = async (message) => {
        axios.post(`${process.env.REACT_APP_API_URL}/user_app/chat/send_message`,
            {
                sender: localStorage.getItem('token'),
                receiver: props.nickname,
                message: message
            })
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

    props.ws.onmessage = function (event) {
        setMe(false)
        setData(data.concat({_id: count, message: event.data, from_user: me}))
    };

    props.ws.addEventListener('close', (event) => {
  console.log('The connection has been closed successfully.');
});

    function sendMessage(e) {
        var input = document.getElementById("messageText")
        if (input.value.replace(/\s/g, '') === ""){
            error()
        } else {
            setMe(true)
            post_message(input.value)
            count += 1;
            props.ws.send(input.value)
            input.value = ''
            e.preventDefault()
        }

    }

     const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {

    }}

    return (
        <div>
            <List>
      <VirtualList
          scrollToIndex={0}
          scrollToAlignment='bottom'
          id="message_list"
        data={data}
        height={500}
        itemHeight={10}
        itemKey="_id"
          onScroll={onScroll}
      >
        {element => (
          <List.Item id={element._id} key={element._id}>
              {element.from_user ? (
                <List.Item.Meta
              title={props.user_nickname}
              description={element.message}/>
                ) : (
                    <List.Item.Meta
              title={props.nickname}
              description={element.message}
            />
                )}
          </List.Item>
        )}
      </VirtualList>
    </List>
            <p/>
            <Form action="" className="flex-end">
                <Input type="text" id="messageText" autoComplete="off"/>
                <Button onClick={sendMessage}>Send</Button>
            </Form>
            {/*<ul id='messages'>*/}
            {/*</ul>*/}
            <div id='messages'>
            </div>
        </div>
    );
};

export default Chat;