import { configureStore } from '@reduxjs/toolkit';
import { usersListReducer, usersReducer, messagesReducer } from './slices';
import { serverApi } from './services';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    usersList: usersListReducer,
    messages: messagesReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
