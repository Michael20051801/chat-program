import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  useGetMessagesMutation,
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
  const [getMessages] = useGetMessagesMutation();
  const [messages, setMessages] = useState<Message[]>([]);

  // Activating the getMessages mutation when there is a change 
  //  in the messages, which is actually getting the messages between 
  //  otherUser and currentUser from the database.
  useEffect(() => {
    getMessages({otherUserId, currentUserId,})
      .unwrap()
      // If it succeeds, set the messages state (which will be the messages
      //  that are shown on the screen) to the messages that are recived from the DB.
      .then((res) => {
        setMessages(res);
      })
      // If there is an error, log it.
      .catch((err) => {
        console.log(err);
      });
  }, [messages]);

  // Scroll down automatically on new message, only if there 
  //  there is a change in the number of messages.
  const divRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages.length]);

  // If there is other user (which means if the user clicked on 
  //  someone to chat with), get all the messages between him 
  //  and the other user. Else, return a message on the screen
  //  "Click on the blue button in the left side in order to start a conversation!".
  return otherUserId ? (
    <div className={style.container}>
      {/* Return the namebar component */}
      <NameBar />
      {/* If there are messages between the two users, return them.
           Else, return the message "Send a message to start a conversation!" */}
      {messages.length ? (
        messages.map((msg, index) => (
          // If the messages are sent, show them on the right side.
          // If the messages are received, show them on the left side.
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
        ))
      ) : (
        
        <span className={style.noMessages}>
          <br/>
          <br/>
          <br/>
          Send a message to start a conversation!
        </span>
      )}
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
