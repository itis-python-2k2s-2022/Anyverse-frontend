import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import {setToken} from "../components/Auth";
import {useState} from "react";


export default function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPassword_repeat] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");


    const login = () => {
          axios
            .post("http://127.0.0.1:8000/register", {
              username: username,
              password: password,
              password_repeat: password_repeat,
              usersurname: usersurname,
              nickname: nickname,
              email: email
            })
            .then(function (response) {
              console.log(response.data.token, "response.data.token");
              if (response.data.token) {
                setToken(response.data.token);
                navigate("/login");
              }
            })
            .catch(function (error) {
              console.log(error, "error");
            });
      };

  return (
    <div style={{ minHeight: 800, marginTop: 30 }}>
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
            <Form.Item
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              // rules={[makeRequiredFormFieldRule("Please enter password")]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item
              name='password2'
              onChange={(e) => setPassword_repeat(e.target.value)}
              // rules={[makeRequiredFormFieldRule("Please enter password")]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='rounded-md bg-blue-300 p-1'
                onClick={login}
              >
                Зарегестрироваться
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
}