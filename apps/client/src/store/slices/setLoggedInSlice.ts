import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Setting an initial state to the setLoggedInSlice.
const initialState: boolean = false;

// Creating a new slice, with the initial state above,
//  with the name messagedPeopleSlice.
// In fact, the function determines if the user is logged in
//  or not. If yes, then it navigates him to the home page.
//  If not, it maintains the user in the login/signup page.
const setLoggedInSlice = createSlice({
  name: 'setLoggedInSlice',
  initialState: initialState,
  reducers: {
    // Creating a function that I can use in the client components.
    // I can import there the current state using the useSelector
    //  function, or I can set the state using the useDispatch
    //  function. 
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      if (action.payload === true) return true;
      else return false;
    },
  },
});

export const { setLoggedIn } = setLoggedInSlice.actions;

export const setLoggedInReducer = setLoggedInSlice.reducer;
