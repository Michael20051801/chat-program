import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types';

const initialState: Person[] = [];

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Person>) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
