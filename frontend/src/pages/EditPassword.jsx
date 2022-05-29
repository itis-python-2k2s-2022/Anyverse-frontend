import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";


export default function EditPassword() {
     const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [password_repeat, setPassword_repeat] = useState("");

    const [formErrors, setFormErrors] = useState("");

    const save = () => {
        let block = document.getElementsByName('errorblock')
              block.innerHTML = 'pppp'

          axios
            .put("http://127.0.0.1:8000/profile/update_password_info", {


                password: password,
                password_check: password_repeat,
                token: localStorage.getItem('token')

            })
            .then(function (response) {
              console.log(response);
                navigate("/profile/get_profile_info/");
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
    <>
        <p className={'fs-3 text-center'}>Изменить пароль</p>
      <Form
        name={'registrationForm'}
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={save}
        autoComplete="off"
      >
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
                Проверить и сохранить пароль
              </Button>
            </Form.Item>
          </Form>
    </>
  );
}