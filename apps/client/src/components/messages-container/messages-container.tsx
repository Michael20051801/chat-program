import React from 'react';
import { render } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import style from './messages-container.module.css';

interface Props {
  message?: string;
}

export const MessagesContainer: React.FC<Props> = ({ message }: Props) => {
  const messageList = useSelector((state: RootState) => state.messages);

  return messageList.length != 0 ? (
    <div className={style.container}>
      <div className={style.nameDiv}></div>
      <div className={`${style.msgCloud}`}>
        <div className={style.actualMsg}>
          {messageList[messageList.length - 1]}
        </div>
      </div>
      <div className={`${style.msgCloud} ${style.left}`}>
        <div className={style.actualMsg}>
          {messageList[messageList.length - 1]}
        </div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.nameDiv}></div>
    </div>
  );
};
