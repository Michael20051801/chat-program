import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

// Setting an initial state to the messagedPeopleSlice.
const initialState: User = {
  id: '',
  email: '',
  userName: '',
  description: '',
}

// Creating a new slice, with the initial state above,
//  with the name messagedPeopleSlice.
// In fact, the function saves the contact that the current
//  user clicked on it (in the modal or people container),
//  in order to show the detailes of the user in the name bar
//  and loading the messages between the current user and the
//  other user.
const messagedPeopleSlice = createSlice({
    name: 'messagedPeopleSlice',
    initialState: initialState,
    reducers: {
      // Creating a function that I can use in the client components.
      // I can import there the current state using the useSelector
      //  function, or I can set the state using the useDispatch
      //  function. 
      goToPrivateChat: (state, action: PayloadAction<User>) => {
        return action.payload;
      },
    },
});

export const { goToPrivateChat } = messagedPeopleSlice.actions;

export const messagedPeopleReducer = messagedPeopleSlice.reducer;