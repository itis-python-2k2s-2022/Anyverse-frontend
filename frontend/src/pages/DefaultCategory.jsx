import React,  { useState }  from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

const DefaultCategory = () => {

    const params = useParams();
    const category_id = params.category;

    const [mark, setMark] = useState(false)
    const [flags, setFlags] = useState(false)

    const navigate = useNavigate();

    const addThread = () => {
         navigate("/thread/create_thread/" + category_id);
    }

    const update = () => {
        navigate("/category/update_category/" + category_id);
    }

    const deleteCategory = () => {
        axios.delete("http://127.0.0.1:8000/category_app/category/delete_category/", { data:{
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
        console.log(mark);
        axios.post("http://127.0.0.1:8000/category_app/category/subscribe_to_category",
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
        console.log(mark);
        axios.delete("http://127.0.0.1:8000/category_app/category/unsubscribe_from_category", { data:{
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


    axios.get("http://127.0.0.1:8000/category_app/category/get_category/",
        {headers: { token: localStorage.getItem('token')}, params: {category: category_id}})

        .then(response => {
            console.log(response.data.is_subscriber);
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


        })
          .catch(function (error) {
                console.log(error, "error");
            });

        axios.get("http://127.0.0.1:8000/category_app/thread/get_category_threads",
        {headers: { token: localStorage.getItem('token')}, params: {category_id: category_id}})
        .then(response => {
            console.log(response.data);
             // setMark(response.data.is_subscriber);
            //  setFlags(response.data.is_creator);
            // const category_info = {
            //     name: response.data.category.name,
            //     description: response.data.category.description,
            //     subscriptions: response.data.category.subscriptions
            // }
            // const block = document.getElementById("category_name")
            // block.innerText = category_info.name
            // const block1 = document.getElementById("category_description")
            // block1.innerText = category_info.description
            // const block2 = document.getElementById("category_subscriptions")
            // block2.innerText = category_info.subscriptions


        })
          .catch(function (error) {
                console.log(error, "error");
            });

    return (
            <>
                <h1>категория:</h1>
            <div id="category_name"></div>
          <h1>Описание:</h1>
             <div id="category_description"></div>
          <h1>Подписчики:</h1>
             <div id="category_subscriptions"></div>
             {mark ? (
                  <button onClick={unsubscribe}>Отписаться</button>
             ) : (
                 <button onClick={subscribe}>Подписаться</button>
                )}
             <button onClick={addThread}>Создать новый пост</button>
             {flags ? (
                 <div>
                    <button onClick={update}>Изменить категорию</button>
                    <button onClick={deleteCategory}>Удалить категорию</button>
                 </div>
             ):(
                 <></>
             )}
            </>
    );
};

export default DefaultCategory;