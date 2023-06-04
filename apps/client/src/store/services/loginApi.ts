import { User } from '../../types';
import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called loginApi.
// It builds a mutation and by activating it in the client components, 
//    it will go to the server's controller that matches the specified 
//    url and method, with the body that it gets from the client components.
const loginApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    // The mutation returns a variable of the type User.
    // The mutation parameter is an object that consists of email
    //  (type:string) and password (type:string).
    login: build.mutation<User, {email: string, password: string}>({
      // It goes to the 'auth/login' url in the server, with the method POST and
      //  with the parameter I specified above, it finds the function in the server 
      //  that belongs to what I specified above.
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
    }),
  }),

  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useLoginMutation } = loginApi;
