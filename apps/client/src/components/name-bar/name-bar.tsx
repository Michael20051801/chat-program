import React from 'react';
import style from './name-bar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// created an functional component with the name of NameBar
export const NameBar: React.FC = () => {
  const goToPrivateChat = useSelector(
    (state: RootState) => state.goToPrivateChat
  );

  return (
    <div className={style.container}>
      <span className={style.name}>{goToPrivateChat.userName}</span>
      <span className={style.description}>{goToPrivateChat.description}</span>
      <span className={style.dropdown}>{goToPrivateChat.description}</span>
    </div>
  );
};
