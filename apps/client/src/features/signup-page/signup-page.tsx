import React, { useState } from 'react';
import style from './signup-page.module.css';
import {
  saveUser,
  setLoggedIn,
  useSignupMutation,
} from '../../store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Created an functional component with the name of SignupPage
export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password,
      userName,
    };

    signup(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(
          saveUser(
            // id: res.id,
            // email: res.email,
            // userName: res.userName,
            res.user
          )
        );
        dispatch(setLoggedIn(true));
      })
      .catch((err) => {
        console.log(err);
        setError(err.data.message);
      });
  };

  return (
    <div className={style.container}>
      <span className={style.link}>
        Have an account?{' '}
        <Link className={style.u} to={'/login'}>
          Log In
        </Link>
      </span>
      <br/>
      <span className={style.error}>{error}</span>
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

          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Choose a user name"
            maxLength={20}
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <input
            type="submit"
            className={style.signupSubmit}
            value="Continue"
          />
        </form>
      </div>
    </div>
  );
};
