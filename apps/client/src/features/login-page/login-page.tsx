import React, { useState } from 'react';
import style from './login-page.module.css';
import { saveUser, setLoggedIn, useLoginMutation } from '../../store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Created an functional component with the name of LoginPage
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    login(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(setLoggedIn(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.container}>
      <span className={style.link}>
        Don't have an account?{' '}
        <Link className={style.u} to={'/signup'}>
          Sign Up
        </Link>
      </span>
      <div className={style.wrapper}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            minLength={8}
            maxLength={20}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input type="submit" className={style.loginSubmit} value="Continue" />
        </form>
      </div>
    </div>
  );
};
