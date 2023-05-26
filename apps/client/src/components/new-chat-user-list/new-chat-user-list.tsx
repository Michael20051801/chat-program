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
import { Person, PrismaUser, User } from '../../types';

interface Props {
  onClose: () => void;
}

// Created an functional component with the name of NewChatUserList
// It is getting props from people component
export const NewChatUserList: React.FC<Props> = ({ onClose }: Props) => {
  // const users = useSelector((state: RootState) => state.users);
  const usersList = useSelector((state: RootState) => state.usersList);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.saveUser);
  const { data } = useGetContactsQuery();
  console.log(data);

  const onChooseUser = (newContact: User) => {
    if (usersList.find((user) => user.email === newContact.email)) {
      dispatch(
        goToPrivateChat(newContact)
      );
      return onClose();
    } else {
      dispatch(addUserToList(newContact));
      dispatch(
        goToPrivateChat(newContact)
      );
      return onClose();
    }
  };

  // usersList.map((user) => {
  //   if (userToAddKey == user.key) {
  //     return alert("This user is already added to the list!")
  //   }
  // })
  // return (
  //   dispatch(addUserToList(userToAdd)),
  //   onClose()
  // )

  return data?.length === 0 ? (
    <div className={style.empty}>You have no contacts!</div>
  ) : (
    <div className={style.container}>
      {/* {users.map((user, index) => (
        <div
          key={index}
          className={style.user}
          onClick={() => onChooseUser(user)}
        >
          <NewChatUser name={user.name} description={user.description} />
        </div>
      ))} */}
      {data?.map((contact, index) =>
        currentUser.email !== contact.email ? (
          
          <div
            key={index}
            className={style.user}
            onClick={() => onChooseUser(contact)}
          >
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
