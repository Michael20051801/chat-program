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

  // If the user clicks on the submit button ('Continue'), don't actually submit
  //  the form, but instead create an object of email, password and userName which 
  //  are the email and the password that were written by the user in the input 
  //  fields before the click.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password,
      userName,
    };

    // Activate the signup mutation, which is activating the signup function in the DB.
    signup(data)
      .unwrap()
      //  If the function succeeds to log in the user, save the user's details in 
      //   saveUser reducer and set the IsLoggedIn reducer to true (navigate 
      //   the user to the home page).
      .then((res) => {
        dispatch(saveUser(res));
        dispatch(setLoggedIn(true));
      })
      // If there is an error, log it and set the error state to the error message.
      .catch((err) => {
        console.log(err);
        setError(err.data.message);
      });
  };

  return (
    <div className={style.container}>
      {/* Creating a link to the login page. */}
      <span className={style.link}>
        Have an account?{' '}
        <Link className={style.u} to={'/login'}>
          Log In
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
            placeholder="Enter a password"
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

          {/* Created a required userName input field */}
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Choose a user name"
            maxLength={20}
            required
            // Set the userName state to the content of the input field, 
            //  whenever it changes.
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          {/* Created a submit type button. */}
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
