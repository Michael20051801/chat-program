import React, { ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  useGetMessagesMutation,
  useGetUserIdMutation,
} from '../../store';
import style from './messages-container.module.css';
import { NameBar } from '../name-bar';

interface Props {
  message?: string;
}

export const MessagesContainer: React.FC<Props> = ({ message }: Props) => {
  const messageList = useSelector((state: RootState) => state.messages);
  const user = useSelector((state: RootState) => state.saveUser);
  console.log(user);
  // const [findUserId] = useGetUserIdMutation();
  // findUserId(user.email);
  // console.log(userId);
  // const [messages] = useGetMessagesMutation(userId);
  // console.log(messages);
  // console.log({messages: getMessagesQuery.data})

  const divRef = useRef<null | HTMLDivElement>(null);

  //scroll down on new msg
  useEffect(() => {
    divRef.current?.scrollIntoView({});
  });

  return messageList.length != 0 ? (
    <div className={style.container}>
      <NameBar />

      {/* {messageList.map((msg, index) => (
        <div className={style.msgCloud} key={index} ref={divRef}>
          <div className={style.actualMsg}>{msg}</div>
        </div>
      ))} */}

      {/* <div className={`${style.msgCloud} ${style.left}`}>
        <div className={style.actualMsg}>
          {messageList[messageList.length - 1]}
        </div>
      </div> */}
    </div>
  ) : (
    <div className={style.container}>
      <NameBar />
    </div>
  );
};
