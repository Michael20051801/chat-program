import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserWithKey } from 'client/src/types';

const initialState: UserWithKey[] = [];

const usersListSlice = createSlice({
  name: 'usersListSlice',
  initialState: initialState,
  reducers: {
    addUserToList: (state, action: PayloadAction<UserWithKey>) => {
      state.push(action.payload);
    },
  },
});

export const { addUserToList } = usersListSlice.actions;

export const usersListReducer = usersListSlice.reducer;
