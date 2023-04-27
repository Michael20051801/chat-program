import React, { MouseEvent, KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useDispatch } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import { saveMessage, useSendMessageMutation } from '../../store';

export const InputContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [sendMessage, result] = useSendMessageMutation();
  const [message, setMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    sendMessage({ message, sent: new Date().toISOString() });
    console.log({result, message});
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
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={style.sendButton} onClick={handleClick}>
        <PaperPlane className={style.paperPlane} />
      </button>
    </div>
  );
};
