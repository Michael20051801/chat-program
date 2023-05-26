import { Message } from '../../types';
import { serverApi } from './serverApi';


// Created a new endpoint in serverApi whics is called messageApi.
// It builds a mutation and by activating it in the client components,
//    it will go to the server's controller that matches the specified
//    url and method, with the body that he gets from the client components.
const messageApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation<void, {newMessage: Message}>({
      query: (body) => ({ url: 'message/post', method: 'POST', body }),
      // invalidatesTags: [],
    }),
    getMessages: build.mutation<Message[], {otherUserId: string, currentUserId: string}>({
      query: (body) => ({ url: 'message/get', method: 'POST', body }),
      // invalidatesTags: [],
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSendMessageMutation, useGetMessagesMutation } = messageApi;
