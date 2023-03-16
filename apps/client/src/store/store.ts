import { configureStore } from '@reduxjs/toolkit';
import { usersListReducer, usersReducer, messagesReducer } from './slices';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    usersList: usersListReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
