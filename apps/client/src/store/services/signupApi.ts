import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called signupApi.
// It builds a mutation and by activating it, it will go to the specified url,
//    method and body that it gets from the code in the client components.
const signupApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (body) => ({ url: 'auth/signup/local', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSignupMutation } = signupApi;