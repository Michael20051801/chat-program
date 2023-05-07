import { serverApi } from './serverApi';

const signupApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (body) => ({ url: 'auth/signup/local', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation } = signupApi;