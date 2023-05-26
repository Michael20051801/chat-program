import React, { KeyboardEvent, useState, ChangeEvent, useEffect } from 'react';
import style from './input-container.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import {
  RootState,
  saveMessage,
  useGetUserIdMutation,
  useSendMessageMutation,
} from '../../store';

// Created an functional component with the name of InputContainer
export const InputContainer: React.FC = () => {
  // const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();
  const [content, setContent] = useState('');
  let senderId: string = '';
  let receiverId: string = '';
  // useEffect(() => {
  //   senderId = useSelector((state: RootState) => state.saveUser.id);
  //   receiverId = useSelector((state: RootState) => state.goToPrivateChat.id);
  // }, [senderId || receiverId])
  senderId = useSelector((state: RootState) => state.saveUser.id);
  receiverId = useSelector((state: RootState) => state.goToPrivateChat.id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleClick = () => {
    console.log({receiverId,})
    const newMessage = {content: content, receiverId: receiverId, senderId: senderId};
    sendMessage({
      newMessage,
    })
    .unwrap()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
    setContent('');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.inputField}
        type="text"
        placeholder={'Write something...'}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      
      <button className={style.sendButton} onClick={handleClick}>
        <PaperPlane className={style.paperPlane} />
      </button>
    </div>
  );
};
