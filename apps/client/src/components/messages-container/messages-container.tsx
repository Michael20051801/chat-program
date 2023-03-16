import { RootState } from 'client/src/store';
import React from 'react';
import { useSelector } from 'react-redux';
import style from './messages-container.module.css';

interface Props {
  message?: string;
}

export const MessagesContainer :React.FC<Props> = ({message}: Props) => {
  const messageList = useSelector((state: RootState) => state.messages);

    return (
      <div className={style.container}>
        <div className={`${style.msgCloud}`}>
          <div className={style.actualMsg}>{messageList[messageList.length - 1]}</div>
        </div>
        <div className={`${style.msgCloud} ${style.left}`}>
          <div className={style.actualMsg}>{messageList[messageList.length - 1]}</div>
        </div>
      </div>
    )
}
