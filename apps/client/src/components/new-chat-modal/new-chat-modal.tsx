import React from 'react';
import style from './new-chat-modal.module.css';

import { CSSTransition } from 'react-transition-group';

interface Props {
  showProp: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

// Created an functional component with the name of NewChatModal
// It is getting some props (properties) from PeopleContainer component
export const NewChatModal: React.FC<Props> = ({
  showProp,
  onClose,
  title,
  children,
}: Props) => {
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
      <div className={style.modal} onClick={onClose}>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modalHeader}>
            {/* returning the modal title as recived from props. */}
            <h4 className={style.modalTitle}>{title}</h4>
          </div>
          {/* returning the modal chikdren (NewChatUserList component) as 
               recived from props. */}
          <div className={style.modalBody}>{children}</div>

          <div className={style.modalFooter}>
            {/* If you click on the 'close' button, the modal will be closed. */}
            <button className={style.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
