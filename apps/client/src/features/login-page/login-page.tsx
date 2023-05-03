import React from 'react';
import style from './login-page.module.css';
import { BrowserRouter, Routes } from 'react-router-dom';

export const LoginPage: React.FC = () => {

  const handleSubmit = () => {

  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <form>
          <input type='email' id='email' name='email' placeholder='Enter your email' required/>
          <input type='password' id='password' name='password' placeholder='Enter password' autoComplete='off' minLength={8} maxLength={20} required/>
          <input type='text' id='userName' name='userName' placeholder='Enter userName' required/>

          <input type='submit' value='Continue' onSubmit={handleSubmit}/>
        </form>
      </div>
    </div>
  );
};
