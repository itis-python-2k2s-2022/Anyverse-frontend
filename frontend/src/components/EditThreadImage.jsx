import React, {useState} from 'react';
import axios from "axios";
import {Button, Form, Space, Upload} from "antd";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {UploadOutlined} from "@ant-design/icons";

const EditThreadImage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const thread_id = params.thread;

    const [file, setFile] = useState(null);

        const updateThread = () => {
            if (file) {
                const formData = new FormData();
                formData.append('file', file.fileList[0].originFileObj)
                axios
                    .put(`${process.env.REACT_APP_API_URL}/category_app/thread/update_thread_image/` + thread_id, formData)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error, "error");
                    })}}

    return (

         <div>
             <Space>
                <p className={"fs-4 text-center"}>Изменить фото </p>
                <p className={"fs-4 text-center strong"} id={"name"}/>
            </Space>
            <Form
                id="fields"
                name="fields"
                layout={"vertical"}
                initialValues={{ remember: true }}
                onFinish={updateThread}
                autoComplete="off"
            >
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
                <Button
                    type='primary'
                    htmlType='submit'
                    className='rounded-md bg-blue-300'
                >
                    Сохранить Фото
                </Button>
            </Form>
        </div>

    );
};

export default EditThreadImage;