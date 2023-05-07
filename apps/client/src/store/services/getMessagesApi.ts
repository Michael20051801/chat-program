import { serverApi } from './serverApi';

const getMessagesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.mutation({
      query: (body) => ({ url: 'message', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesMutation } = getMessagesApi;