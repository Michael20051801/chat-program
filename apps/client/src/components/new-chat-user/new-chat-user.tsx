import React from 'react';
import style from './new-chat-user.module.css';

import { ReactComponent as ProfilePic } from '../../assets/default-user.svg';

interface Props {
  status: string;
  name: string;
}

export const NewChatUser: React.FC<Props> = ({ status, name }: Props) => {
  // const handleClick = () => {
  //   return openChat;
  // }

  return (
    <div className={style.container}>
      <div className={style.profilePicButton}>
        <ProfilePic className={style.profilePic} />
      </div>
      <div>
        <div className={style.title}>{name}</div>
        <div className={style.statusMsg}>{status}</div>
      </div>
    </div>
  );
};
