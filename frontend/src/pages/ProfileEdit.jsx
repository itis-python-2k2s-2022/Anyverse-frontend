import {  Upload, message, Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import {LockOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";
import {useParams} from "react-router-dom";


export default function ProfileEdit() {
    const params = useParams();
    const nick = params.nickname;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [nickname, setNick] = useState("");
    const [email, setEmail] = useState("");

    const [formErrors, setFormErrors] = useState("");
    const [file, setFile] = useState(null);

    const save = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file.fileList[0].originFileObj)
            console.log(nick + "lll")
         axios
            .put("http://localhost:8000/profile/update_image_info/" + nick, formData)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error, "error");
            });
        }

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
              if (error) {
                  setFormErrors(error.response.data.response_message);
              }
            });
      };

  return (
    <>
        <p className={'fs-3 text-center'}>Редактировать профиль</p>
      <Form
        name={'registrationForm'}
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={save}
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
          {formErrors && (
            <p className='pb-2' style={{ color: 'red' }}>
              {formErrors}
            </p>
          )}
          <Form.Item
            name={"fileinfo"}
            label={"Фото:"}
            valuePropName={"fileList"}
            getValueFromEvent={setFile}
          >
            <Upload
                id={"upload_file"}
                name="file"
                listType="picture"
                maxCount={1}
                accept="image/png, image/jpg, image/jpeg"
                beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>
                  Нажмите, чтобы загрузить файл
              </Button>
            </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='rounded-md bg-blue-300'
          >
            Проверить и сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}