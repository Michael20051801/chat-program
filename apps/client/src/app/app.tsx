import React from 'react';
import style from './app.module.css';

import { CardContainer, LoginPage, SignupPage } from '../features';
import { PeopleContainer } from '../features';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../features';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.setLoggedIn);
  return (
    <div className={style.container}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage/> : <Navigate to="/signup"/>}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
