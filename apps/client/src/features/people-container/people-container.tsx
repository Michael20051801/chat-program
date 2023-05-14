import React, { useState } from 'react';
import style from './people-container.module.css';

import { ReactComponent as NewChatIcon } from '../../assets/whatsapp-new-chat.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, goToPrivateChat } from '../../store';
import { NewChatModal, NewChatUser, NewChatUserList } from '../../components';
import { Person, PrismaUser } from '../../types';

// Created an functional component with the name of PeopleContainer
export const PeopleContainer: React.FC = () => {
  const [show, setShow] = useState(false);
  const usersList = useSelector((state: RootState) => state.usersList);
  const dispatch = useDispatch();

  const handleClick = (person: PrismaUser) => {
    dispatch(
      goToPrivateChat({
        email: person.email,
        name: person.userName,
        description: person.description,
      })
    );
  };

  return (
    <div className={style.container}>
      <div className={style.peopleContainer}>
        {usersList.map((user, index) => (
          <div
            className={style.userChat}
            key={user.email}
            onClick={() => handleClick(user)}
          >
            <NewChatUser name={user.userName} description={user.description} />
          </div>
        ))}
      </div>
      <div className={style.addPeopleDiv}>
        <button
          className={style.addPeopleButton}
          onClick={() => {
            setShow(true);
          }}
        >
          <NewChatIcon className={style.addChat} />
        </button>
        <NewChatModal
          onClose={() => setShow(false)}
          showProp={show}
          title="Add new conversation"
        >
          <NewChatUserList onClose={() => setShow(false)} />
        </NewChatModal>
      </div>
    </div>
  );
};
