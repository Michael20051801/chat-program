import { serverApi } from './serverApi';

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

export const { useLoginMutation } = loginApi;