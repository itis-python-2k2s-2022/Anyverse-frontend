import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";


export default function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPassword_repeat] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");
    // const [image, setImage] = useState("");


    const login = () => {
        let block = document.getElementsByName('errorblock')
              block.innerHTML = 'pppp'

          axios
            .post("http://127.0.0.1:8000/auth/register", {

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

           {/*<Form.Item*/}
           {/*   name='image'*/}
           {/*   onChange={(e) => setImage(e.target.value)}*/}
           {/*   // rules={[makeRequiredFormFieldRule("Please enter password")]}*/}
           {/* >*/}
           {/*   <Input*/}
           {/*     prefix={<LockOutlined className='site-form-item-icon' />}*/}
           {/*     type='file'*/}
           {/*   />*/}
           {/* </Form.Item>*/}

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