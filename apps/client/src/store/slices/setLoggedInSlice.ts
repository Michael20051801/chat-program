import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: boolean = false;

const setLoggedInSlice = createSlice({
  name: 'setLoggedInSlice',
  initialState: initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      if (action.payload === true) return true;
      else return false;
    },
  },
});

export const { setLoggedIn } = setLoggedInSlice.actions;

export const setLoggedInReducer = setLoggedInSlice.reducer;
