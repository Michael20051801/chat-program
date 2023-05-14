import React from 'react';
import style from './new-chat-user.module.css';

import { ReactComponent as ProfilePic } from '../../assets/default-user.svg';

interface Props {
  description?: string;
  name: string;
}

// Created an functional component with the name of NewChatUser
// It is getting props from PeopleContainer or NewChatUserList components
export const NewChatUser: React.FC<Props> = ({ description, name }: Props) => {
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
        <div className={style.description}>{description}</div>
      </div>
    </div>
  );
};
