import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Created a new api with the name of serverApi, and it is
//    referring to the cpecified url, which is the url of the server.
// The enpoints will be specified later (code splitting).
export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: () => ({}),
});
