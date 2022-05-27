import { useNavigate } from "react-router";
import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { fetchToken } from "../components/Auth";
import { Button, Form, Input } from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import AuthButton from "../components/AuthButton";
import {Container} from "react-bootstrap";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState("");


    //check to see if the fields are not empty
    const login = async e => {

        // make api call to our backend. we'll leave thisfor later
        axios
            .post("http://127.0.0.1:8000/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    navigate("/profile/get_profile_info");
                }
            })
            .catch((error) => {
                console.log(error.response.data.response_message);
                if (error) {
                    setFormErrors(error.response.data.response_message);
                }
            });
        // }
    };

    return (
        <Container>
            <p className="fs-3 text-center">Вход</p>
                {fetchToken() ? (
                  <p className="fs-4 text-center">Вы уже авторизованы</p>
                ) : (
                <div>
                    <Form
                      name={'loginForm'}
                      layout={'vertical'}
                      initialValues={{ remember: true }}
                      onFinish={login}
                      autoComplete="off"
                    >
                        <Form.Item
                            name='email'
                            label={'Email: '}
                            rules={[
                                {required: true, message: 'Пожалуйста, введите email!'},
                                {type: "email", message: "Некорректно введен email!"}
                            ]}
                        >
                            <Input
                                onChange={e => setEmail(e.target.value)}
                                prefix={<UserOutlined className='site-form-item-icon'/>}
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label={'Пароль: '}
                            rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                        >
                            <Input
                                onChange={e => setPassword(e.target.value)}
                                prefix={<LockOutlined className='site-form-item-icon'/>}
                                type='password'
                            />
                        </Form.Item>
                        {formErrors && (
                            <p className='pb-2' style={{ color: 'red' }}>
                              {formErrors}
                            </p>
                          )}
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='rounded-md bg-blue-300'
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <AuthButton/>
                </div>
                )}
        </Container>
    );
}
