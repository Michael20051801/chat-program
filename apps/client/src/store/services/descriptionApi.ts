import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called contactsApi.
// It builds a query and by activating it, it will go to the server's
//    controller that matches the specified url and method.
export const descriptionApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    // The query returns an array of the type User.
    // The query doesn't have parameters.
    changeDesc: build.mutation<void, { userId: string, description: string }>({
      // It goes to the 'users/contacts' url in the server, with the method GET,
      //  it finds the function in the server that belongs to what I specified above.
      query: (body) => ({ url: 'users/desc', method: 'PATCH', body }),
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the query in the client components.
export const { useChangeDescMutation } = descriptionApi;
