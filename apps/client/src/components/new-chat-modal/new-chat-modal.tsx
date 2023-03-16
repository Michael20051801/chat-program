import React from 'react';
import style from './new-chat-modal.module.css';

import { CSSTransition } from 'react-transition-group';

interface Props {
  showProp: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const NewChatModal: React.FC<Props> = ({
  showProp,
  onClose,
  title,
  children,
}: Props) => {
  return (
    <CSSTransition
      in={showProp}
      unmountOnExit
      timeout={{ enter: 0, exit: 600 }}
      classNames={{
        // enterActive: style.MyClassEnterActive,
        enterDone: style.modalEnterDone,
        // enterDone: style.modalEnterDone .modalContent,
        exitActive: style.modalExit,
        // exitActive: style.modalExit .modalContent,
      }}
    >
      <div className={style.modal} onClick={onClose}>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modalHeader}>
            <h4 className={style.modalTitle}>{title}</h4>
          </div>

          <div className={style.modalBody}>
            {children}
          </div>

          <div className={style.modalFooter}>
            <button className={style.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
          {/* <span className="style.close">&times;</span> */}
        </div>
      </div>
    </CSSTransition>
  );
};
