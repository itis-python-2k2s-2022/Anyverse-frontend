import { message, Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios";
import React, {useState} from "react";
import {useParams} from "react-router-dom";


export default function ProfileEdit() {
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState("");

     axios.get(`${process.env.REACT_APP_API_URL}/profile/get_profile_info/`, {params:
            {token: localStorage.getItem('token')}
    })
        .then(response => {
            console.log(response.data.user)
            document.getElementById("profile_name").defaultValue = response.data.user.name
            document.getElementById("profile_surname").defaultValue = response.data.user.surname
            document.getElementById("profile_nickname").defaultValue = response.data.user.nickname
            document.getElementById("profile_email").defaultValue = response.data.user.email
        })
        .catch(function (error) {
            console.log(error, "error");
        });


    const save = () => {
        const form = document.forms.edit_form;
          axios
            .put(`${process.env.REACT_APP_API_URL}/profile/update_profile_info`, {
                name: form.elements.profile_name.value,
                surname: form.elements.profile_surname.value,
                nickname: form.elements.profile_nickname.value,
                email: form.elements.profile_email.value,
                token: localStorage.getItem('token')
            })
            .then(function (response) {
              console.log(response);
                navigate("/profile/get_profile_info/");
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
    <>
        <p className={'fs-3 text-center'}>Редактировать профиль</p>
      <Form
          id={"edit_form"}
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            id={"profile_name"}
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            id={"profile_surname"}
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            id={"profile_nickname"}
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            id={"profile_email"}
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
            Проверить и сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}