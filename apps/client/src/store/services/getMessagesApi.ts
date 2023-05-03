import { serverApi } from './serverApi';

const getMessagesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: (body) => ({ url: 'message', method: 'GET', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesQuery } = getMessagesApi;