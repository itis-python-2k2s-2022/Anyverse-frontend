import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import {setToken} from "../components/Auth";
import React, {useState} from "react";


export default function ProfileEdit() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");


    const save = () => {


          axios
            .put("http://127.0.0.1:8000/profile/update_profile_info", {

                name: username,
                surname: usersurname,
                nickname: nickname,
                email: email,
                token: localStorage.getItem('token')
            })
            .then(function (response) {
              console.log(response);
                navigate("/profile/get_profile_info/");
              // }
            })
            .catch(function (error) {
              console.log(error, "error");
            });
      };

  return (
    <div style={{ minHeight: 800, marginTop: 30 }}>
        <h1 className="errorblock">Пока все хорошо)))</h1>
      <Form>
            <Form.Item
              name='name'
              onChange={(e) => setUsername(e.target.value)}
              rules={[
                // makeRequiredFormFieldRule("Please enter email"),
                { type: "string" },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='name'
              />
            </Form.Item>
            <Form.Item
              name='surname'
              onChange={(e) => setUsersurname(e.target.value)}
              rules={[
                // makeRequiredFormFieldRule("Please enter email"),
                { type: "string" },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='surname'
              />
            </Form.Item>
            <Form.Item
              name='nickname'
              onChange={(e) => setNick(e.target.value)}
              rules={[
                // makeRequiredFormFieldRule("Please enter email"),
                { type: "string" },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='nickname'
              />
            </Form.Item>
            <Form.Item
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                // makeRequiredFormFieldRule("Please enter email"),
                { type: "email" },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
              />
            </Form.Item>


            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={save}
              >
                Проверить и сохранить
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
}