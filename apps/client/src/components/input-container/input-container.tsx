import React, { KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useSelector } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import {
  RootState,
  useSendMessageMutation,
} from '../../store';

// Created an functional component with the name of InputContainer
export const InputContainer: React.FC = () => {
  const [sendMessage] = useSendMessageMutation();
  const [content, setContent] = useState('');
  const senderId = useSelector((state: RootState) => state.saveUser.id);
  const receiverId = useSelector((state: RootState) => state.goToPrivateChat.id);

  // If the user types something in the input field, it will set the state 
  //  'content' to the value in the input field.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // If the user clicks on the send button and he content inside of the input 
  //  field is not empty, it activates the send message mutation, which is actually 
  //  creating a new message in the database.
  const handleClick = () => {
    if(content !== '') {
      const newMessage = {content: content, receiverId: receiverId, senderId: senderId};
      sendMessage({
        newMessage,
      })
      .unwrap()
      // If it succeed, log the result.
      .then((res) => {
        console.log(res);
      })
      // If there is an error, log it.
      .catch((err) => {
        console.log(err);
      });
      // Setting the content in the input field to be empty after 
      //  the user clicks on the send button.
      setContent('');
    }
  };

  // If the user clicks on enter while focusing in the input field, it will
  //  trigger the handleClick function.
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className={style.container}>
      {/* Creating an input field for writing a message */}
      <input
        className={style.inputField}
        type="text"
        placeholder={'Write something...'}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      
      {/* Creating a send button with a paper plane icon on it */}
      <button className={style.sendButton} onClick={handleClick}>
        <PaperPlane className={style.paperPlane} />
      </button>
    </div>
  );
};
