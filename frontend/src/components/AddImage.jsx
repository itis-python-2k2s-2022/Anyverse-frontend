import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Form, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const AddImage = (props) => {
    return (
         <div>
                <Form.Item
                    name={"fileinfo"}
                    label={"Фото:"}
                    valuePropName={"fileList"}
                    getValueFromEvent={props.setFile}
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
        </div>
    );
};

export default AddImage;