import { configureStore } from '@reduxjs/toolkit';
import {
  usersListReducer,
  setLoggedInReducer,
  saveUserReducer,
  messagedPeopleReducer,
} from './slices';
import { serverApi } from './services';

// Configures the store of the project (the global state,
//  actually).
export const store = configureStore({
  // Specifies all the reducers that are in the store,
  //  including the slices and the api-s.
  reducer: {
    usersList: usersListReducer,
    setLoggedIn: setLoggedInReducer,
    saveUser: saveUserReducer,
    goToPrivateChat: messagedPeopleReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  // Getting a default middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
