import React from 'react';
import { InputContainer, MessagesContainer } from '../../components';
import style from './card-container.module.css';

export const CardContainer: React.FC = () => {
  return (
    <div className={style.container}>
      <MessagesContainer />
      <InputContainer />
    </div>
  );
};
