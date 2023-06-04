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

  return (
    <div className={style.container}>
      {/* Defining the profile picture of the user (default user) */}
      <div className={style.profilePicDiv}>
        <ProfilePic className={style.profilePic} />
      </div>
      {/* Defining the title and the description of the user as recieved 
           from props. */}
      <div>
        <div>{name}</div>
        <div className={style.description}>{description}</div>
      </div>
    </div>
  );
};
