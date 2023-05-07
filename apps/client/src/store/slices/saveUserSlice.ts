import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User = {
  email: '',
  password: '',
  userName: '',
  description: '',
};

const saveUserSlice = createSlice({
  name: 'saveUserSlice',
  initialState: initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { saveUser } = saveUserSlice.actions;

export const saveUserReducer = saveUserSlice.reducer;
