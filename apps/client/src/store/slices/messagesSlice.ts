import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState: initialState,
    reducers: {
      saveMessage: (state, action: PayloadAction<string>) => {
        state.push(action.payload);
      },
    },
});

export const { saveMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;