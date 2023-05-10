import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types';

const initialState: Person = {
    id: '',
    name: '',
    description: '',
}

const messagedPeopleSlice = createSlice({
    name: 'messagedPeopleSlice',
    initialState: initialState,
    reducers: {
      goToPrivateChat: (state, action: PayloadAction<Person>) => {
        return action.payload;
      },
    },
});

export const { goToPrivateChat } = messagedPeopleSlice.actions;

export const messagedPeopleReducer = messagedPeopleSlice.reducer;