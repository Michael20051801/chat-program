import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called messageApi.
// It builds a mutation and by activating it in the client components, 
//    it will go to the server's controller that matches the specified 
//    url and method, with the body that he gets from the client components.
const messageApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (body) => ({ url: 'message/postMsg', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSendMessageMutation } = messageApi;
