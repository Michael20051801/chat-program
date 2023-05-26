import { PrismaUser, User } from '../../types';
import { serverApi } from './serverApi';

// Created a new endpoint in serverApi whics is called getContactsApi.
// It builds a mutation and by activating it, it will go to the server's
//    controller that matches the specified url and method.
export const contactsApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query<User[], void>({
      query: () => ({ url: 'users/contacts', method: 'GET' }),
    }),
  }),
  overrideExisting: false,
});

// Creates a new react hook so I can use the mutation in the client components.
export const { useGetContactsQuery } = contactsApi;
