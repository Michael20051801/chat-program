import React from 'react';
import style from './name-bar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveUser, setLoggedIn } from '../../store';

// created an functional component with the name of NameBar
export const NameBar: React.FC = () => {
  const dispatch = useDispatch();

  const goToPrivateChat = useSelector(
    (state: RootState) => state.goToPrivateChat
  );

  const handleClick = () => {
    dispatch(setLoggedIn(false));
    dispatch(saveUser({
      id: '',
      email: '',
      userName: '',
      description: '',
    }));
  }

  return (
    <div className={style.container}>
      {/* Showing the name and the description of the user the current user
           clicked on in the user list. */}
      <div className={style.user}>
        <span className={style.name}>{goToPrivateChat.userName}</span>
        <span className={style.description}>{goToPrivateChat.description}</span>
      </div>
      <span className={style.logout} onClick={handleClick}><u>logout</u></span>
    </div>
  );
};
