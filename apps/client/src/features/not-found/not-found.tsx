import React from 'react';
import style from './not-found.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate('/');
  };

  return (
    <div className={style.container}>
      <span className={style.notFound}>404</span>
      <span className={style.message}>
        Oops! The page you are looking for does not exist.
      </span>
      <button className={style.home} onClick={toHomePage}>
        Back to home page
      </button>
    </div>
  );
};
