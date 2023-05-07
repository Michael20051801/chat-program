import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types';

const initialState: Person[] = [];

const usersListSlice = createSlice({
  name: 'usersListSlice',
  initialState: initialState,
  reducers: {
    addUserToList: (state, action: PayloadAction<Person>) => {
      state.push(action.payload);
    },
  },
});

export const { addUserToList } = usersListSlice.actions;

export const usersListReducer = usersListSlice.reducer;
