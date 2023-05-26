import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  useGetMessagesMutation,
  useGetUserIdMutation,
  useSendMessageMutation,
} from '../../store';
import style from './messages-container.module.css';
import { NameBar } from '../name-bar';
import { Message } from '../../types';

// Created an functional component with the name of MessageContainer
export const MessagesContainer: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.saveUser);
  const otherUser = useSelector((state: RootState) => state.goToPrivateChat);
  const currentUserId = currentUser.id;
  const otherUserId = otherUser.id;
  console.log({currentUserId,});
  console.log({otherUserId,});
  const [getMessages, {data}] = useGetMessagesMutation();
  // const dispatch = useDispatch();
  // const messages = useSelector((state: RootState) => state.messages);
  const [messages, setMessages] = useState<Message[]>([]);
  // let messages: Message[] = [];
  console.log({messages,});
  useEffect(() => {
    console.log({otherUserId,})
    getMessages({otherUserId, currentUserId,})
      .unwrap()
      .then((res) => {
        console.log({res,});
        setMessages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [messages]);
  // const [getMessages] = useGetMessagesMutation();
  // const senderId = sender.id;
  // const receiverId = receiver.id;
  // getMessages({ senderId, receiverId })
  //   .unwrap()
  //   .then((res) => {
  //     messages = res;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const divRef = useRef<null | HTMLDivElement>(null);
  //scroll down on new message
  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages.length]);

  return otherUserId ? (
    <div className={style.container}>
      <NameBar />
      {messages.map((msg, index) => (
        msg.receiverId === otherUserId ? 
        (
        <div className={style.msgCloud} key={index} ref={divRef}>
          <div className={style.actualMsg}>{msg.content}</div>
        </div>
        ) : (
        <div className={`${style.msgCloud} ${style.left}`} key={index} ref={divRef}>
          <div className={style.actualMsg}>{msg.content}</div>
        </div>
        )
      ))}
    </div>
  ) : (
    <div className={style.container}>
      <NameBar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <span className={style.noOne}>Click on the blue button in the left side in order to start a conversation!</span>
    </div>
  );
};
