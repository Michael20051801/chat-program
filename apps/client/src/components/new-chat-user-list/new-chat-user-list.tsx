import React from 'react';
import style from './new-chat-user-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserToList,
  goToPrivateChat,
  RootState,
  useGetContactsQuery,
} from '../../store';
import { NewChatUser } from '../new-chat-user/new-chat-user';
import { User } from '../../types';

interface Props {
  onClose: () => void;
}

// Created an functional component with the name of NewChatUserList
// It is getting props from peopleContainer component
export const NewChatUserList: React.FC<Props> = ({ onClose }: Props) => {
  const usersList = useSelector((state: RootState) => state.usersList);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.saveUser);
  const { data } = useGetContactsQuery();

  // If the user clicks on any of the users in the user list inside 
  //  the modal, it will search him in the userList slice (the list in
  //  PeopleContainer). If it finds it, it adds the user to the 
  //  messagedPeopleSlice - showing the name and description of the user in 
  //  the name bar, loading the messages between the current user and the
  //  other user and closing the modal. Else, it does the same plus
  //  adds the user to the UserLostSlice (to the list in PeopleContainer).
  const onChooseUser = (newContact: User) => {
    if (usersList.find((user) => user.email === newContact.email)) {
      dispatch(goToPrivateChat(newContact));
      return onClose();
    } else {
      dispatch(addUserToList(newContact));
      dispatch(goToPrivateChat(newContact));
      return onClose();
    }
  };

  // If there is no contacts (there is no other users except the current one
  //  that are registered to the system, that have instance in the database), 
  //  it will show the message 'You have no contacts!'.
  //  Else, map the contacts, show them in the modal.
  //  
  return data?.length === 1 ? (
    <div className={style.empty}>You have no contacts!</div>
  ) : (
    <div className={style.container}>
      {data?.map((contact, index) =>
      // Show all the contacts except the current one.
        currentUser.email !== contact.email ? (
          
          <div
            key={index}
            className={style.user}
            // If you click on any user, it will trigger the function 
            //  onChooseUser above.
            onClick={() => onChooseUser(contact)}
          >
            {/* Every user is shown in a component, NewChatUser, with
                 his name and description as they are written in the DB. */}
            <NewChatUser
              name={contact.userName}
              description={contact.description}
            />
          </div>
        ) : (
          ''
        )
      )}
    </div>
  );
};
