import { serverApi } from './serverApi';

const getUserIdApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getUserId: build.mutation({
      query: (body) => ({ url: 'users/me', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserIdMutation } = getUserIdApi;