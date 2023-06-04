import React from 'react';
import style from './app.module.css';

import { LoginPage, SignupPage } from '../features';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../features';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Created an functional component with the name of App
export const App: React.FC = () => {
  // importing the setLoggedIn reducer from the store, calling it user
  const user = useSelector((state: RootState) => state.setLoggedIn);
  return (
    <div className={style.container}>
      {/* defining a browser router for client routing*/}
      <BrowserRouter>
        <Routes>
          {/* defining the / route which is the home page */}
          <Route
            path="/"
            //if there is a user, go to the home page. if not, navigate to the signup page.
            element={user ? <HomePage /> : <Navigate to="/signup" />}
          />
          {/* defining the /signup route which is the signup page */}
          <Route
            path="/signup"
            //if there is a user, navigate to the home page. if not, go to signup page.
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />
          {/* defining the /login route which is the login page */}
          <Route
            path="/login"
            //if there is a user, navigate to the home page. if not, go to login page.
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
