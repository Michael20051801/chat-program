import React, { useState } from 'react';
import style from './edit-user-modal.module.css';

import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveUser, useChangeDescMutation, useChangePasswordMutation } from '../../store';

interface Props {
  showProp: boolean;
  onClose: () => void;
  title: string;
}

// Created an functional component with the name of NewChatModal
// It is getting some props (properties) from PeopleContainer component
export const EditUserModal: React.FC<Props> = ({
  showProp,
  onClose,
  title,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.saveUser);
  const [error, setError] = useState('')
  const [changePw] = useChangePasswordMutation();
  const [changeDesc] = useChangeDescMutation();

  const handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let userId = user.id
    changePw({userId: user.id, currentPassword, newPassword,})
    .unwrap()
    .then((res) => {
      console.log(res)
      setShowPassword(false);
    })
    .catch((err) => {
      console.log(err)
      setError(err.data.message)
    })
    
  };

  const handleSubmitDesc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeDesc({userId: user.id, description: desc})
    .then((res) => {
      const data = {
        id: user.id,
        email: user.email,
        userName: user.userName,
        description: desc
      }
      dispatch(saveUser(data))
      setShowDesc(false);
    })
    .catch((err) => {
      console.log(err)
      setError(err.data.message)
    })
    
  };

  const handleClick = () => {
    onClose(), 
    setShowDesc(false), 
    setShowPassword(false),
    setError('')
  }

  return (
    // Doing a transition to the modal, if the showProp is true
    //   (if the user clicked on the blue button in the peopleContainer).
    <CSSTransition
      in={showProp}
      unmountOnExit
      timeout={{ enter: 0, exit: 600 }}
      classNames={{
        enterDone: style.modalEnterDone,
        exitActive: style.modalExit,
      }}
    >
      {/* If you click anywhere outside of the actual modal (outside of
           the modal content), the whole modal will be closed. */}
      <div className={style.modal} onClick={handleClick}>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modalHeader}>
            {/* returning the modal title as recived from props. */}
            <h4 className={style.modalTitle}>{title}</h4>
          </div>

          {!showPassword && !showDesc ? (
            <div className={style.modalBody}>
              <div
                className={style.password}
                onClick={() => setShowPassword(true)}
              >
                Change Password
              </div>
              <div
                className={style.description}
                onClick={() => setShowDesc(true)}
              >
                Change Description
              </div>
            </div>
          ) : showPassword && !showDesc ? (
            <div className={style.modalBody}>
              <form onSubmit={handleSubmitPassword} className={style.formPassword}>
                {/* Created an required email input field */}
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  autoComplete="off"
                  minLength={8}
                  maxLength={20}
                  required
                  // Set the email state to the content of the input field,
                  //  whenever it changes.
                  onChange={(e) => {
                    setcurrentPassword(e.target.value);
                  }}
                />

                {/* Created a required password input field */}
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  autoComplete="off"
                  minLength={8}
                  maxLength={20}
                  required
                  // Set the password state to the content of the input field,
                  //  whenever it changes.
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                />
                {/* Create a submit type button. */}
                <input
                  type="submit"
                  className={style.passwordSubmit}
                  value="Continue"
                />
                <span className={style.error}>{error}</span>
              </form>
            </div>
          ) : !showPassword && showDesc ? (
            <div className={style.modalBody}>
              <form onSubmit={handleSubmitDesc} className={style.formDesc}>
                {/* Created an required email input field */}
                <label>Your current description :</label>
                <input
                  type="text"
                  id="currentDesc"
                  name="currentDesc"
                  autoComplete="off"
                  disabled
                  value={user.description}
                />

                <input
                  type="text"
                  id="newDesc"
                  name="newDesc"
                  placeholder="Enter your new description"
                  autoComplete="off"
                  required
                  // Set the email state to the content of the input field,
                  //  whenever it changes.
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                {/* Create a submit type button. */}
                <input
                  type="submit"
                  className={style.descSubmit}
                  value="Continue"
                />
                <span className={style.error}>{error}</span>
              </form>
            </div>
          ) : (
            ''
          )}

          <div className={style.modalFooter}>
            {/* If you click on the 'close' button, the modal will be closed. */}
            <button className={style.closeButton} onClick={handleClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
