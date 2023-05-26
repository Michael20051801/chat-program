import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';

const initialState: Message[] = [];

const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState: initialState,
    reducers: {
      saveMessage: (state, action: PayloadAction<Message>) => {
        state.push(action.payload);
      },
    },
});

export const { saveMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;