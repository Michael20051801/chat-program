import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, PrismaUser } from '../../types';

const initialState: PrismaUser[] = [];

const usersListSlice = createSlice({
  name: 'usersListSlice',
  initialState: initialState,
  reducers: {
    addUserToList: (state, action: PayloadAction<PrismaUser>) => {
      state.push(action.payload);
    },
  },
});

export const { addUserToList } = usersListSlice.actions;

export const usersListReducer = usersListSlice.reducer;
