import React, { useState } from 'react';
import style from './people-container.module.css';

import { ReactComponent as NewChatIcon } from '../../assets/whatsapp-new-chat.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NewChatModal, NewChatUser, NewChatUserList } from '../../components';

export const PeopleContainer: React.FC = () => {
  const [show, setShow] = useState(false);
  const usersList = useSelector((state: RootState) => state.usersList);

  return (
    <div className={style.container}>
      <div className={style.peopleContainer}>
        {/* This is the list where the clicked users will show */}
        {usersList.map((user, index) => (
          <div className={style.userChat} key={index}>
            <NewChatUser name={user.name} status={user.status} />
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
