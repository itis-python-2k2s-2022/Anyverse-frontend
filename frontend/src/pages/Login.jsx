import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { fetchToken } from "../components/Auth";
import { Button, Form, Input } from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import AuthButton from "../components/AuthButton";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //check to see if the fields are not empty
    const login = async e => {

        // make api call to our backend. we'll leave thisfor later
        axios
            .post("http://127.0.0.1:8000/auth/login", {
                email: email,
                password: password,
            })
            .then(function (response) {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    navigate("/profile/get_profile_info");
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        // }
    };

    return (
        <div style={{minHeight: 800, marginTop: 30}}>
            <h1>login page</h1>
            <div style={{marginTop: 30}}>
                {fetchToken() ? (
                  <p>you are logged in</p>
                ) : (
                <div>
                    <Form>
                        <Form.Item
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            {/*<label style={{ marginRight: 10 }}>Input Username</label>*/}
                            <Input
                                onChange={e => setEmail(e.target.value)}
                                prefix={<UserOutlined className='site-form-item-icon'/>}
                                placeholder='email'/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            {/*<label style={{ marginRight: 10 }}>Input Password</label>*/}
                            <Input
                                onChange={e => setPassword(e.target.value)}
                                prefix={<LockOutlined className='site-form-item-icon'/>}
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
                    <AuthButton/>
                </div>
                )}
            </div>
        </div>
    );
}
