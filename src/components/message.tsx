import React from 'react';
import { IUser } from "../redux/type/user";
import { IEvent} from "../redux/type/event";
import { IMessage } from "../redux/type/chat";

const Message = (message : IMessage , event: IEvent, user : IUser, attendee: [IUser]) => (
    <li className={`chat ${user.id === message.user_id ? "right" : "left"}`}>
   
        {message.content}
    </li>
);

export default Message;

/*
{user !== chat.username
    && <img src={chat.img} alt={`${chat.username}'s profile pic`} />
}*/