import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types';

const initialState: Person[] = [
  { name: 'Michael', description: `I'm doing a project`, id: '1' },
  { name: 'Daniel', description: 'At the beach', id: '2' },
];

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Person>) => {
      // state.map((user) => (

      // ))
      state.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
