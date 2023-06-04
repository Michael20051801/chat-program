import { User } from '../../types';
import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called signupApi.
// It builds a mutation and by activating it in the client components, 
//    it will go to the server's controller that matches the specified 
//    url and method, with the body that it gets from the client components.
const signupApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    // The mutation returns a variable of the type User.
    // The mutation parameter is an object that consists of email
    //  (type:string), password (type:string) and userName (type:string).
    signup: build.mutation<User, {email: string, password: string, userName: string}>({
      // It goes to the 'auth/signup' url in the server, with the method POST and
      //  with the parameter I specified above, it finds the function in the server 
      //  that belongs to what I specified above.
      query: (body) => ({ url: 'auth/signup', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSignupMutation } = signupApi;