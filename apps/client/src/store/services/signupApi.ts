import { User } from '../../types';
import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called signupApi.
// It builds a mutation and by activating it in the client components, 
//    it will go to the server's controller that matches the specified 
//    url and method, with the body that he gets from the client components.
const signupApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<{user: User, token: string}, {email: string, password: string, userName: string}>({
      query: (body) => ({ url: 'auth/signup', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSignupMutation } = signupApi;