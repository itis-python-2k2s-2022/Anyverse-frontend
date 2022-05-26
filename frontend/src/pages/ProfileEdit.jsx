import {  Upload, message, Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "../index";

export default function ProfileEdit() {
    const params = useParams();
    const nick = params.nickname;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");


    const save = () => {
        const form_file = document.forms.namedItem("fileinfo");
        const someFile = document.getElementById("upload_file").files[0]
        console.log(someFile)
        const formData = new FormData();
        formData.append('file', someFile)
        console.log(nick + "lll")
         axios
            .put("http://localhost:8000/profile/update_image_info/" + nick, formData)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error, "error");
            });

          axios
            .put("http://localhost:8000/profile/update_profile_info", {
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
        <form id="fileinfo">
              <input type="file" id="upload_file" name="file" accept="image/png, image/jpg, image/jpeg" multiple />
              {/*<Button>Click to Upload</Button>*/}
        </form>
    </div>
  );
}