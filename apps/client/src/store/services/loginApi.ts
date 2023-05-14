import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called loginApi.
// It builds a mutation and by activating it in the client components, 
//    it will go to the server's controller that matches the specified 
//    url and method, with the body that he gets from the client components.
const loginApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: 'auth/login/local', method: 'POST', body }),
    }),
  }),

  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useLoginMutation } = loginApi;
