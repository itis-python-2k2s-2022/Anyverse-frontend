import React, {useState} from 'react';
import {  Upload, message, Button, Form, Input } from "antd";
import {LockOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";


const EditImageProfile = () => {
    const params = useParams();
    const nick = params.nickname;
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

     const save = () => {
         if (file) {
             const formData = new FormData();
             formData.append('file', file.fileList[0].originFileObj)
             console.log(nick + "lll")
             axios
                 .put(`${process.env.REACT_APP_API_URL}/profile/update_image_info/` + nick, formData)
                 .then(function (response) {
                     console.log(response);
                     navigate("/profile/get_profile_info/");
                     message.success(response.data.response_message);
                 })
                 .catch(function (error) {
                     console.log(error, "error");
                 });
         }
     }
    return (
         <>
        <p className={'fs-3 text-center'}>Редактировать профиль</p>
      <Form
        name={'registrationForm'}
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={save}
        autoComplete="off"
      ><Form.Item
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
};

export default EditImageProfile;