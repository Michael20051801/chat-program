import React, { KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import { RootState, saveMessage, useGetUserIdMutation, useSendMessageMutation } from '../../store';

// Created an functional component with the name of InputContainer
export const InputContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [sendMessage, result] = useSendMessageMutation();
  const [content, setContent] = useState('');
  const receiver = useSelector((state: RootState) => state.goToPrivateChat)
  const [getReceiverIdByEmail] = useGetUserIdMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleClick = () => {
    try {
      console.log({ sent: new Date().toISOString() });
      const receiverId = getReceiverIdByEmail(receiver)
      sendMessage({ content, receiverId })
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setContent('');
    } catch {
      throw new Error('Try Again!');
    }
    console.log({ result, content });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
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
