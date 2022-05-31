import {Button, Form, Input, message} from "antd";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";
import AuthButton from "../components/AuthButton";
import {Container} from "react-bootstrap";


export default function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPassword_repeat] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");

    const [formErrors, setFormErrors] = useState("");
    // const [image, setImage] = useState("");


    const login = () => {
          axios
            .post(`${process.env.REACT_APP_API_URL}/auth/register`, {

                name: username,
                password: password,
                password_check: password_repeat,
                surname: usersurname,
                nickname: nickname,
                email: email,
            })
            // }, {
            //     params: {
            //     user_key_id: 9,
            //     },
            //     headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            .then(function (response) {
              console.log(response);


              // console.log(response.data);
              // console.log(response.statusText);
              // console.log(response.headers);
              // console.log(response.config);
              // if (response.data.token) {
              //   setToken(response.data.token);
                navigate("/auth/login");
                message.success(response.data.response_message);
              // }
            })
            .catch(function (error) {
              console.log(error, "error");
              if (error) {
                  setFormErrors(error.response.data.response_message);
              }
            });
      };

  return (
    <Container>
        <p className={'fs-3 text-center'}>Регистрация</p>
      <Form
          name={'registrationForm'}
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={login}
          autoComplete="off"
      >
            <Form.Item
              name='name'
              label={'Имя:'}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
                {type: "string", message: "Это поле может содержать только буквы" },
              ]}
            >
              <Input
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              name='surname'
              label={'Фамилия:'}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
                {type: "string", message: "Это поле может содержать только буквы" },
              ]}
            >
              <Input
                onChange={(e) => setUsersurname(e.target.value)}
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              name='nickname'
              label={'Никнейм:'}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
                {type: "string", message: "Это поле может содержать только буквы" },
              ]}
            >
              <Input
                onChange={(e) => setNick(e.target.value)}
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              name='email'
              label={"Email:"}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
                {type: "email", message: "Некорректно введен email!"},
              ]}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>
            <Form.Item
              name='password'
              label={"Пароль:"}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
              ]}
            >
              <Input
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
              />
            </Form.Item>
            <Form.Item
              name='password2'
              label={"Повторите пароль:"}
              rules={[
                {required: true, message: 'Пожалуйста, заполните это поле!'},
              ]}
            >
              <Input
                onChange={(e) => setPassword_repeat(e.target.value)}
                prefix={<LockOutlined className='site-form-item-icon' />}
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
                Зарегестрироваться
              </Button>
            </Form.Item>
          </Form>
        <AuthButton/>
    </Container>
  );
}