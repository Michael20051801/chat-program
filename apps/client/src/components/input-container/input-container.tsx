import React, { MouseEvent, KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useDispatch } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import { saveMessage, useSendMessageMutation } from '../../store';
import { error } from 'console';

export const InputContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [sendMessage, result] = useSendMessageMutation();
  const [message, setMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value); 
  };

  const handleClick = () => {
    try {
      console.log({ sent: new Date().toISOString() });
      sendMessage({ message });
      setMessage('');
    } catch {
      throw new Error('Try Again!');
    }
    console.log({ result, message });
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
