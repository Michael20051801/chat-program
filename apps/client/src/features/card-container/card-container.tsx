import React from 'react';
import { InputContainer, MessagesContainer } from '../../components';
import style from './card-container.module.css';

// Created an functional component with the name of CardContainer.
export const CardContainer: React.FC = () => {
  return (
    // Return the MessageContainer component and the InputContainer
    //  component simultaneously.
    <div className={style.container}>
      <MessagesContainer />
      <InputContainer />
    </div>
  );
};
