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



    const save = () => {
        let block = document.getElementsByName('errorblock')
              block.innerHTML = 'pppp'

          axios
            .post("http://127.0.0.1:8000/auth/register", {


                password: password,
                password_check: password_repeat,

            })
            .then(function (response) {
              console.log(response);
                navigate("profile/get_profile_info/");
              // }
            })
            .catch(function (error) {
              console.log(error, "error");
            });
      };

  return (
    <div style={{ minHeight: 800, marginTop: 30 }}>
      <Form>
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
                onClick={save}
              >
                Проверить и сохранить пароль
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
}