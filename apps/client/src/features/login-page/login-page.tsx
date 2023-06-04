import React, { useState } from 'react';
import style from './login-page.module.css';
import { RootState, saveUser, setLoggedIn, useLoginMutation, useSetStatusMutation } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Created an functional component with the name of LoginPage
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [setStatus] = useSetStatusMutation();
  const isLoggedIn = useSelector((state: RootState) => state.setLoggedIn);

  // If the user clicks on the submit button ('Continue'), don't actually submit
  //  the form, but instead create an object of email and password which are the
  //  email and the password that were written by the user in the input fields
  //  before the click.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    // Activate the login mutation, which is activating the login function in the DB.
    login(data)
      .unwrap()
      //  If the function succeeds to log in the user, save the user's details in 
      //   saveUser reducer and set the IsLoggedIn reducer to true (navigate 
      //   the user to the home page).
      .then((res) => {
          dispatch(setLoggedIn(true))
          dispatch(saveUser(res))
      })
      // If there is an error, log it and set the error state to the error message.
      .catch((err) => {
        console.log(err);
        setError(err.data.message);
      });
  };


  return (
    <div className={style.container}>
      {/* Creating a link to the signup page. */}
      <span className={style.link}>
        Don't have an account?{' '}
        <Link className={style.u} to={'/signup'}>
          Sign Up
        </Link>
      </span>
      <br/>
      {/* Returning the error state in case of an error. */}
      <span className={style.error}>{error}</span>
      <div className={style.wrapper}>
        {/* Created a form. */}
        <form onSubmit={handleSubmit}>
          {/* Created an required email input field */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            // Set the email state to the content of the input field, 
            //  whenever it changes.
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Created a required password input field */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="off"
            minLength={8}
            maxLength={20}
            required
            // Set the password state to the content of the input field, 
            //  whenever it changes.
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* Create a submit type button. */}
          <input type="submit" className={style.loginSubmit} value="Continue" />
        </form>
      </div>
    </div>
  );
};
