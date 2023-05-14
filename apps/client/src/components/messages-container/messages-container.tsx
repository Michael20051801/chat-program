import React, { ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  useGetMessagesMutation,
  useGetUserIdMutation,
} from '../../store';
import style from './messages-container.module.css';
import { NameBar } from '../name-bar';

// Created an functional component with the name of MessageContainer
export const MessagesContainer: React.FC = () => {
  const divRef = useRef<null | HTMLDivElement>(null);

  //scroll down on new msg
  useEffect(() => {
    divRef.current?.scrollIntoView({});
  });

  return <div className={style.container}>
    <NameBar/>
  </div>;
};
