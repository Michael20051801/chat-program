import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called getUserIdApi.
// It builds a mutation and by activating it, it will go to the specified url,
//    method and body that it gets from the code in the client components.
const getUserIdApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getUserId: build.mutation({
      query: (body) => ({ url: 'users/me', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client components
export const { useGetUserIdMutation } = getUserIdApi;