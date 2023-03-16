import React from 'react';
import style from './new-chat-user-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToList, RootState } from '../../store';
import { UserWithKey } from '../../types';
import { NewChatUser } from '../new-chat-user/new-chat-user';

interface Props {
  onClose: () => void;
}

export const NewChatUserList: React.FC<Props> = ({ onClose }: Props) => {
  const users = useSelector((state: RootState) => state.users);
  const usersList = useSelector((state: RootState) => state.usersList);
  const dispatch = useDispatch();

  const checkExistingUser = (userToAdd: UserWithKey) => {
    for (let i = 0; i < usersList.length; i++) {
      if (userToAdd.key == usersList[i].key) {
        return alert('This user is already added to the list!');
      }
    }
    return dispatch(addUserToList(userToAdd)), onClose();
    // usersList.map((user) => {
    //   if (userToAddKey == user.key) {
    //     return alert("This user is already added to the list!")
    //   }
    // })
    // return (
    //   dispatch(addUserToList(userToAdd)),
    //   onClose()
    // )
  };

  return users.length == 0 ? (
    <div className={style.empty}>You have no contacts!</div>
  ) : (
    <div className={style.container}>
      {users.map((user, index) => (
        <div
          className={style.user}
          onClick={() => {
            const userWithKey = {
              user: user,
              key: index,
            };
            checkExistingUser(userWithKey);
          }}
        >
          <NewChatUser name={user.name} status={user.status} />
        </div>
      ))}
    </div>
  );
};
