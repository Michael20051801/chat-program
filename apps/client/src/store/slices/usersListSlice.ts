import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

// Setting an initial state to the usersListSlice.
const initialState: User[] = [];

// Creating a new slice, with the initial state above,
//  with the name messagedPeopleSlice.
// In fact, the function saves the contacts that the user clicked
//  on them in the modal, in order to show the detailes of the user 
//  in the people container's user list.
const usersListSlice = createSlice({
  name: 'usersListSlice',
  initialState: initialState,
  reducers: {
    // Creating a function that I can use in the client components.
    // I can import there the current state using the useSelector
    //  function, or I can add an instance to the state using the
    //  useDispatch function.
    addUserToList: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { addUserToList } = usersListSlice.actions;

export const usersListReducer = usersListSlice.reducer;
