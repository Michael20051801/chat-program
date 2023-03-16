import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'client/src/types';

const initialState: User[] = [
  { name: 'Michael', status: `I'm doing a project` },
  { name: 'Daniel', status: 'At the beach' },
];
// const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      // state.map((user) => (

      // ))
      state.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
