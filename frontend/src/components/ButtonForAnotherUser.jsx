import React from 'react';
import {Button} from "antd";
import ButtonBeFriend from "./ButtonBeFriend";
import ButtonDeleteFriend from "./ButtonDeleteFriend";

const ButtonForAnotherUser = (props) => {
    return (
        <div>
            {props.status === 0 ? (
                <div>
                <p>Это мой аккаунт</p>
                <a href={"/profile/get_profile_info"}>
                        <Button>Перейти в профиль</Button>
                </a>
                </div>
            ) : props.status === 1 ? (
                <div>
                    <a href={"/chat/open_chat/" + props.user_nickname}>
                        <Button>Написать сообщение</Button>
                    </a>
                    <ButtonBeFriend
                        label={"Добавить в друзья"}
                        nickname={props.user_nickname}/>
                </div>
            ) : props.status === 2 ?(
                 <div>
                    <a href={"/chat/open_chat/" + props.user_nickname}>
                        <Button>Написать сообщение</Button>
                    </a>
                     <p>Запрос на дружбу отправлен, дождитесь ответа</p>
                </div>
            ) : props.status === 3 ? (
                 <div>
                    <a href={"/chat/open_chat/" + props.user_nickname}>
                        <Button>Написать сообщение</Button>
                    </a>
                     <ButtonDeleteFriend nickname={props.user_nickname}/>
                </div>
            ) : (
                <p>Что-то пошло не так</p>
            )}
        </div>
    );
};

export default ButtonForAnotherUser;