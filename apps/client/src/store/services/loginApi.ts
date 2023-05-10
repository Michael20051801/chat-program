import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called loginApi.
// It builds a mutation and by activating it, it will go to the specified url,
//    method and body that it gets from the code in the client components.
const loginApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: 'auth/login/local', method: 'POST', body }),

      // transformErrorResponse: (
      //   response: { status: string | number },
      //   meta,
      //   arg
      // ) => response.status,
      // invalidatesTags: ['Post'],
    }),
    
  }),

  
  overrideExisting: false,

  
});

// Creates a new react hook so I can use the mutation in the client
export const { useLoginMutation } = loginApi;