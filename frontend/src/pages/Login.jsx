import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../components/Auth";
import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //check to see if the fields are not empty
  const login = () => {

      // make api call to our backend. we'll leave thisfor later
      axios
        .post("http://127.0.0.1:8000/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    // }
  };

  return (
    <div style={{ minHeight: 800, marginTop: 30 }}>
      <h1>login page</h1>
      <div style={{ marginTop: 30 }}>
        {/*{fetchToken() ? (*/}
        {/*  <p>you are logged in</p>*/}
        {/*) : (*/}
          <div>
            <Form>
              <Form.Item
                name='name'
                onChange={(e) => setUsername(e.target.value)}
              >
              {/*<label style={{ marginRight: 10 }}>Input Username</label>*/}
              <Input
                 prefix={<UserOutlined className='site-form-item-icon' />}
                 placeholder='name' />
              </Form.Item>
              <Form.Item
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              >
              {/*<label style={{ marginRight: 10 }}>Input Password</label>*/}
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
                       onClick={login}>
                    Войти
                  </Button>
            </Form.Item>
            </Form>
          </div>
        {/*)}*/}
      </div>
    </div>
  );
}