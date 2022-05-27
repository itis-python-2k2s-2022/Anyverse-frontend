import React, { Component } from 'react';
import StarRating from 'react-bootstrap-star-rating';
import { render } from 'react-dom';
import axios from "axios";
import { Col, Button, InputNumber, Row, Slider } from 'antd';
import { useState } from 'react';

const RatingElement = (props) => {
    const [inputValue, setInputValue] = useState(1);
   //  const form = document.querySelector("form");
   //
    const change = async e => {
        // const data = new FormData(form);
        // let output = "";
        // for (const entry of data) {
        //     output = entry[0] + "=" + entry[1] + "\r";
        //     console.log(output)
        // }

   axios
       .post("http://127.0.0.1:8000/category_app/rating/create_rating",
                {
                    thread: props.thread_id,
                    creator: localStorage.getItem('token'),
                    rating: inputValue
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }
   //
   //
   //
   //   function onChange()  {
   //       console.log("mark")

    const onChange = (newValue) => {
        setInputValue(newValue);
        console.log(newValue)
    };


    return (
        <div>

        <InputNumber
          min={0}
          max={5}
          style={{
            margin: '0 16px',
          }}
          value={inputValue}
          onChange={onChange}
        />
            <Button onClick={change}>Отправить оценку</Button>
            </div>
  );
};


export default RatingElement;