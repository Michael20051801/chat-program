import React, { useState } from 'react';
import style from './people-container.module.css';

import { ReactComponent as NewChatIcon } from '../../assets/whatsapp-new-chat.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, goToPrivateChat } from '../../store';
import { NewChatModal, NewChatUser, NewChatUserList } from '../../components';
import { User } from '../../types';

// Created an functional component with the name of PeopleContainer
export const PeopleContainer: React.FC = () => {
  const [show, setShow] = useState(false);
  const usersList = useSelector((state: RootState) => state.usersList);
  const dispatch = useDispatch();

  // If the user clicks on one of the users in the user list 
  //  in the people container, it adds the user to the 
  //  messagedPeopleSlice - showing the name and description of the user in 
  //  the name bar and loading the messages between the current user and the
  //  other user.
  const handleClick = (person: User) => {
    dispatch(goToPrivateChat(person));
  };

  return (
    <div className={style.container}>
      <div className={style.peopleContainer}>
        {/* Returning all the users of the userList reducer, showing them. */}
        {usersList.map((user) => (
          <div
            className={style.userChat}
            key={user.id}
            // If the user clicks on one of the users, it triggers 
            //  the handleClick function above.
            onClick={() => handleClick(user)}
          >
          {/* Every user is shown in a component, NewChatUser, with
               his name and description as they are written in the DB. */}
            <NewChatUser name={user.userName} description={user.description} />
          </div>
        ))}
      </div>
      <div className={style.addPeopleDiv}>
        {/* Create a button of addding people to chat with. */}
        <button
          className={style.addPeopleButton}
          // If the user clicks on the button, it shows the modal,
          onClick={() => {
            setShow(true);
          }}
        >
          {/* The new-chat icon on top of the add people button. */}
          <NewChatIcon className={style.addChat} />
        </button>
        {/* Returning the new chat modal (that shows if the show 
             prop is true). */}
        <NewChatModal
          onClose={() => setShow(false)}
          showProp={show}
          title="Add new conversation"
        >
          {/* Passing the NewChatUserList inside the modal component.
               The list component will be passed as children props to
               the modal component. */}
          <NewChatUserList onClose={() => setShow(false)} />
        </NewChatModal>
      </div>
    </div>
  );
};
