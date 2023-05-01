import { serverApi } from './serverApi';

const messageApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (body) => ({ url: 'message', method: 'POST', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = messageApi;
