import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User[] = [];

const usersListSlice = createSlice({
  name: 'usersListSlice',
  initialState: initialState,
  reducers: {
    addUserToList: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { addUserToList } = usersListSlice.actions;

export const usersListReducer = usersListSlice.reducer;
