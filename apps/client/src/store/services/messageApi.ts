import { Message } from '../../types';
import { serverApi } from './serverApi';


// Created a new endpoint in serverApi whics is called messageApi.
// It builds 2 mutations and by activating them in the client components,
//    it will go to the server's controller that matches the specified
//    url and method, with the body that it gets from the client components.
const messageApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    // The mutation returns nothing.
    // The mutation parameter is an object that consists of newMessage
    //  with the type of Message.
    sendMessage: build.mutation<void, {newMessage: Message}>({
      // It goes to the 'message/post' url in the server, with the method POST and
      //  with the parameter I specified above, it finds the function in the server 
      //  that belongs to what I specified above.
      query: (body) => ({ url: 'message/post', method: 'POST', body }),
    }),
    // The mutation returns an array of the type Message.
    // The mutation parameter is an object that consists of otherUserId
    //  (type:string) and currentUserId (type:string).
    getMessages: build.mutation<Message[], {otherUserId: string, currentUserId: string}>({
      // It goes to the 'message/get' url in the server, with the method POST and
      //  with the parameter I specified above, it finds the function in the server 
      //  that belongs to what I specified above.
      query: (body) => ({ url: 'message/get', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client
export const { useSendMessageMutation, useGetMessagesMutation } = messageApi;
