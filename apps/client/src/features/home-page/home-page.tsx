import React from 'react';
import { CardContainer } from '../card-container';
import { PeopleContainer } from '../people-container';

// Created an functional component with the name of HomePage
// All the component does is reference to the PeopleContainer and CardContainer 
//  components simultaneously.
export const HomePage: React.FC = () => {
  return (
    <>
      <PeopleContainer />
      <CardContainer />
    </>
  );
};
