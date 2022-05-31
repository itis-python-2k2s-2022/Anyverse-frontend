import React, { useState, useEffect } from 'react';
import {List, message, Avatar, Form, Input, Button} from 'antd';
import VirtualList from 'rc-virtual-list';
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;


const Comment = () => {
    const com = [{_id: "62951d3a5caeff09dac2e7cd", message: "hi", from_user: true},
        {_id: "62951d625caeff09dac2e7ce", message: "ololo", from_user: true},
 {_id: "62951d725caeff09dac2e7cf", message: "ggfg", from_user: true},
 {_id: "62951d805caeff09dac2e7d0", message: "gffgf", from_user: false},
{_id: "62951d895caeff09dac2e7d1", message: "gffgffggfg", from_user: false},
{_id: "62951d8b5caeff09dac2e7d2", message: "ggfgfg", from_user: true},
 {_id: "62951dad5caeff09dac2e7d3", message: "dddd", from_user: true},
 {_id: "629523310d994e99b1aa05af", message: "", from_user: true},
 {_id: "629523320d994e99b1aa05b0", message: "", from_user: true},
 {_id: "629523330d994e99b1aa05b1", message: "", from_user: true},
{_id: "629523340d994e99b1aa05b2", message: "", from_user: true},
 {_id: "6295233b0d994e99b1aa05b3", message: "xx", from_user: true}]

  return (
              <div>
            <List>
      <VirtualList
        data={com}
        height={400}
        itemHeight={47}
        itemKey="_id"
      >
        {element => (
          <List.Item key={element._id}>
            <List.Item.Meta
              title={element._id}
              description={element.message}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
            <Form action="" className="flex-end">
                <Input type="text" id="messageText" autoComplete="off"/>
                {/*<Button onClick={sendMessage}>Send</Button>*/}
                <Button>Send</Button>
            </Form>
            {/*<ul id='messages'>*/}
            {/*</ul>*/}
            <div id='messages'>
            </div>
        </div>
  );
};

export default Comment;