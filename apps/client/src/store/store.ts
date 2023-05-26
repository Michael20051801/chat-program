import { configureStore } from '@reduxjs/toolkit';
import {
  usersListReducer,
  messagesReducer,
  setLoggedInReducer,
  saveUserReducer,
  messagedPeopleReducer,
} from './slices';
import { serverApi } from './services';

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    messages: messagesReducer,
    setLoggedIn: setLoggedInReducer,
    saveUser: saveUserReducer,
    goToPrivateChat: messagedPeopleReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
