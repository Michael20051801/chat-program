import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, User } from '../../types';

const initialState: User = {
  id: '',
  email: '',
  userName: '',
  description: '',
}

const messagedPeopleSlice = createSlice({
    name: 'messagedPeopleSlice',
    initialState: initialState,
    reducers: {
      goToPrivateChat: (state, action: PayloadAction<User>) => {
        return action.payload;
      },
    },
});

export const { goToPrivateChat } = messagedPeopleSlice.actions;

export const messagedPeopleReducer = messagedPeopleSlice.reducer;