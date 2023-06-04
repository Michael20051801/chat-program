import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

// Setting an initial state to the saveUserSlice.
const initialState: User = {
  id: '',
  email: '',
  userName: '',
  description: '',
};

// Creating a new slice, with the initial state above,
//  with the name messagedPeopleSlice.
// In fact, the function saves the currentUser that was just
//  registered, in order to show the detailes of the user in the name bar
//  and loading the messages between the current user and the
//  other user.
const saveUserSlice = createSlice({
  name: 'saveUserSlice',
  initialState: initialState,
  reducers: {
    // Creating a function that I can use in the client components.
    // I can import there the current state using the useSelector
    //  function, or I can set the state using the useDispatch
    //  function. 
    saveUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { saveUser } = saveUserSlice.actions;

export const saveUserReducer = saveUserSlice.reducer;
