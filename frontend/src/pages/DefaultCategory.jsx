import React,  { useState }  from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import ReactDOM from "react-dom";
import CategoryElement from "../components/CategoryElement";
import TreadElement from "../components/TreadElement";
import {Avatar, Card, Space} from "antd";

const DefaultCategory = () => {

    const params = useParams();
    const category_id = params.category;

    const [mark, setMark] = useState(false)
    const [flags, setFlags] = useState(false)
    const [srcImage, setSrcImage] = useState(null)


    const navigate = useNavigate();

    const addThread = () => {
         navigate("/thread/create_thread/" + category_id);
    }

    const update = () => {
        navigate("/category/update_category/" + category_id);
    }

    const deleteCategory = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/category_app/category/delete_category/`, { data:{
            creator: localStorage.getItem('token'),
            id: category_id,
        }})
        .then(response => {
            console.log(response);
            navigate("/category/my_category");
        })
          .catch(function (error) {
                console.log(error, "error");
            });
    };


    const subscribe= () => {
        setMark(true);
        axios.post(`${process.env.REACT_APP_API_URL}/category_app/category/subscribe_to_category`,
        {
            id: category_id,
            subscriber: localStorage.getItem('token')
        })
        .then(response => {
            console.log(response);

        })
          .catch(function (error) {
                console.log(error, "error");
            });

    };

    const unsubscribe= () => {
        setMark(false);
        axios.delete(`${process.env.REACT_APP_API_URL}/category_app/category/unsubscribe_from_category`, { data:{
            id: category_id,
            unsub: localStorage.getItem('token')
        }})
        .then(response => {
            console.log(response);

        })
          .catch(function (error) {
                console.log(error, "error");
            });
    };


    axios.get(`${process.env.REACT_APP_API_URL}/category_app/category/get_category/`,
        {headers: { token: localStorage.getItem('token')}, params: {category: category_id}})

        .then(response => {
             setMark(response.data.is_subscriber);
             setFlags(response.data.is_creator);
            const category_info = {
                name: response.data.category.name,
                description: response.data.category.description,
                subscriptions: response.data.category.subscriptions
            }
            const block = document.getElementById("category_name")
            block.innerText = category_info.name
            const block1 = document.getElementById("category_description")
            block1.innerText = category_info.description
            const block2 = document.getElementById("category_subscriptions")
            block2.innerText = category_info.subscriptions
            setSrcImage(`${process.env.REACT_APP_API_URL}` + category_info.image);

        })
          .catch(function (error) {
                console.log(error, "error");
            });

        axios.get(`${process.env.REACT_APP_API_URL}/category_app/thread/get_category_threads`,
        {headers: { token: localStorage.getItem('token')}, params: {category_id: category_id}})
        .then(response => {
            console.log(response);
            // const thread_list = response.data.threads;
            const thread_list = response.data.threads.map((item) =>
                // console.log(item.is_creator+"llll")
                 <TreadElement
                     flag={item.is_creator}
                     item={item.thread}/>
             );
            ReactDOM.render(
                     thread_list,
                     document.getElementById("tread_")
                 )
        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
            <>
                <Card
                    id={"category_card"}
                    actions={[
                        <div>
                            {mark ? (
                              <div onClick={unsubscribe}>Отписаться</div>
                         ) : (
                             <div onClick={subscribe}>Подписаться</div>
                            )}
                        </div>,
                        <div onClick={addThread}>Создать новый пост</div>,
                        <div>
                        {flags && (<div onClick={update}>Изменить категорию</div>)}
                        </div>,
                        <div>
                        {flags && (<div onClick={deleteCategory}>Удалить категорию</div>)}
                        </div>,
                    ]}
                >
                    <div className={"row"}>
                        <div id="photo_category" className={"col-4"}>
                            <Avatar
                              size={300}
                              shape={"square"}
                              id={"category_photo"}
                              src={srcImage}
                            />
                        </div>
                        <div className={"col-8"}>
                            <p className={"fs-3 bold text-center"} id={"category_name"}/>
                            <div>
                                <Space>
                                    <p className={"fs-4 text-center bold"}>Описание: </p>
                                    <p className={"fs-5 text-center"} id={"category_description"}/>
                                </Space>
                            </div>
                            <div>
                                <Space>
                                    <p className={"fs-4 text-center bold"}>Подписчики: </p>
                                    <p className={"fs-5 text-center"} id={"category_subscriptions"}/>
                                </Space>
                            </div>
                        </div>
                    </div>
                </Card>
                <div id="tread_"> </div>
            </>
    );
};

export default DefaultCategory;