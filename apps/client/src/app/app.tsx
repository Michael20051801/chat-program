import React from 'react';
import style from './app.module.css';

import { CardContainer } from '../features';
import { PeopleContainer } from '../features';

export const App : React.FC = () => {
  return <div className={style.container}>
    <PeopleContainer/>
    <CardContainer />
  </div>;
};
